import React, { useState, ChangeEvent } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faFilter, faPen } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Modal, Button, Row, Col, FormLabel, Alert, Form } from "react-bootstrap";
import { CreateSummarie } from "../../hooks/useSummarie";
import { CreateTag, TagList } from "../../hooks/useTag";
import AsyncSelect from "react-select/async";
import { useUser } from "../../hooks/useContextUserId";
import { CreateCard, CreateDeck, ListDecks } from "../../hooks/useFlashcard";
import { GenerateCard, GenerateSummarie } from "../../hooks/useOpenAI";

interface PageNameAndButtonsProps {
	summarie: boolean;
	deck: boolean;
	name: string;
	onItemUpdated: () => void;
	onFilter: (tagId: number | null) => void;
};

interface Options {
	value: string;
	label: string;
};

interface Tag {
	id: string;
	tag_name: string;
};


interface Deck {
	id: string;
	deck_name: string;
};


export default function PageNameAndButtons(props: PageNameAndButtonsProps) {
	const { userId, token } = useUser();
	const [summariesVisible, setSummariesVisible] = useState(false);
	const [tagVisible, setTagVisible] = useState(false);
	const [deckVisible, setDeckVisible] = useState(false);
	const [cardVisible, setCardVisible] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [resumeData, setResumeData] = useState({ summarieName: "", tagId: "", summarieContent: "" });
	const [deckData, setDeckData] = useState({ deckName: "", tagId: "" });
	const [cardData, setCardData] = useState({ cardName: "", deckId: "", cardContent: "" });
	const [tagData, setTagData] = useState({ tagName: "" });
	const [loading, setLoading] = useState(false);

	const handleVisible = (decks: boolean, cards: boolean, summaries: boolean, tag: boolean) => {
		if (decks) {
			setDeckVisible(true);
		} else if (summaries) {
			setSummariesVisible(true);
		} else if (tag) {
			setTagVisible(true);
		} else if (cards) {
			setCardVisible(true);
		};
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		if (name === "tagName") {
			setTagData((prevData) => ({
				...prevData,
				[name]: value
			}));
		} else if (name === "summarieName" || name === "summarieContent") {
			setResumeData((prevData) => ({
				...prevData,
				[name]: value
			}));
		} else if (name === "deckName") {
			setDeckData((prevData) => ({
				...prevData,
				[name]: value
			}));
		} else if (name === "cardName") {
			setCardData((prevData) => ({
				...prevData,
				[name]: value
			}));
		} else if (name === "cardContent") {
			setCardData((prevData) => ({
				...prevData,
				[name]: value
			}));
		};
	};

	const handleSubmitSummarie = async () => {
		try {
			if (userId && token) {
				await CreateSummarie(userId, resumeData, token).then((response) => {
					if (response.status === 200) {
						setShowAlert(true);
						setResumeData({ summarieName: "", tagId: "", summarieContent: "" });
						if (props.onItemUpdated) {
							props.onItemUpdated();
						};
						setTimeout(() => {
							setShowAlert(false);
							setSummariesVisible(false);
						}, 2000);
					}
				});
			}
		} catch (error) {
			console.error("Erro:", error);
		}
	};

	const handleSubmitDeck = async () => {
		try {
			if (userId && token) {
				await CreateDeck(userId, deckData, token).then((response) => {
					if (response.status === 200) {
						setShowAlert(true);
						setDeckData({ deckName: "", tagId: "" });
						if (props.onItemUpdated) {
							props.onItemUpdated();
						};
						setTimeout(() => {
							setShowAlert(false);
							setDeckVisible(false);
						}, 2000);
					}
				});
			};
		} catch (error) {
			console.error("Erro:", error);
		};
	};

	const handleSubmitCard = async () => {
		try {
			if (token) await CreateCard(cardData.deckId, cardData, token).then((response) => {
				if (response.status === 200) {
					setShowAlert(true);
					setCardData({ cardName: "", deckId: "", cardContent: "" });
					if (props.onItemUpdated) {
						props.onItemUpdated();
					};
					setTimeout(() => {
						setShowAlert(false);
						setCardVisible(false);
					}, 2000);
				};
			});
		} catch (error) {
			console.error("Erro:", error);
		};
	};

	const handleSubmitTag = async () => {
		try {
			if (userId && token) {
				await CreateTag(userId, tagData, token).then(() => {
					setShowAlert(true);
					setTagData({ tagName: "" });
					setTimeout(() => {
						setShowAlert(false);
						setTagVisible(false);
					}, 2000);
				});
				await TagList(userId, token);
			}
		} catch (error) {
			console.error("Erro:", error);
		}
	};

	const handleItemClick = (eventKey: string | null) => {
		if (typeof eventKey === "string") {
			if (eventKey === "summarie") {
				handleVisible(false, false, true, false);
			} else if (eventKey === "tag") {
				handleVisible(false, false, false, true);
			} else if (eventKey === "deck") {
				handleVisible(true, false, false, false);
			} else if (eventKey === "card") {
				handleVisible(false, true, false, false);
			};
		};
	};

	const loadOptions = async (inputValue: string) => {
		if (userId && !cardVisible && token) {
			try {
				const response = await TagList(userId, token)
				const options: Options[] = response.data.map((tag: Tag) => ({
					value: tag.id,
					label: tag.tag_name,
				}));
				return options.filter((option) =>
					option.label.toLowerCase().includes(inputValue.toLowerCase())
				);
			} catch (error) {
				console.error("Erro:", error);
				return [];
			}
		} else if (userId && cardVisible && token) {
			try {
				const response = await ListDecks(userId, token)
				const options: Options[] = response.data.map((deck: Deck) => ({
					value: deck.id,
					label: deck.deck_name,
				}));
				return options.filter((option) =>
					option.label.toLowerCase().includes(inputValue.toLowerCase())
				);
			} catch (error) {
				console.error("Erro:", error);
				return [];
			}
		}
		return [];
	};

	const handleAsyncSelection = (option: Options | null) => {
		if (option) {
			if (deckVisible) {
				setDeckData((prevData) => ({
					...prevData,
					"tagId": option.value
				}));
			} else if (summariesVisible) {
				setResumeData((prevData) => ({
					...prevData,
					"tagId": option.value
				}));
			} else if (cardVisible) {
				setCardData((prevData) => ({
					...prevData,
					"deckId": option.value
				}));
			};
		};
	};

	const handleFilterSelection = (option: Options | null) => {
		if (userId && option) {
			props.onFilter(parseInt(option.value));
		} else if (option === null) {
			props.onFilter(null);
		};
	};

	const generateResume = async () => {
		try {
			setLoading(true);
			const summarieTitle = { "summarieTitle": resumeData.summarieName }
			if (token) await GenerateSummarie(summarieTitle, token).then((res) => {
				setResumeData((prevData) => ({
					...prevData,
					"summarieContent": res.data.content
				}));
			})
			setLoading(false);
		} catch (error) {
			console.log(error)
		}
	};

	const generateCard = async () => {
		try {
			setLoading(true);
			const cardTitle = { "cardTitle": cardData.cardName }
			if (token) await GenerateCard(cardTitle, token).then((res) => {
				setCardData((prevData) => ({
					...prevData,
					"cardContent": res.data.response
				}));
			})
			setLoading(false);
		} catch (error) {
			console.log(error)
		}
	};

	return (
		<div className='deckName'>

			<Modal show={summariesVisible} onHide={() => {
				setResumeData({ summarieName: "", tagId: "", summarieContent: "" });
				setSummariesVisible(false);
			}}
				size='lg' centered>
				<Modal.Header style={{ backgroundColor: "#DAE9F1", height: "50px" }} closeButton />
				<Modal.Body style={{ backgroundColor: "#DAE9F1", paddingTop: "10px", paddingBottom: "30px", paddingRight: "150px", paddingLeft: "150px" }}>
					<Row className='mb-2'>
						<Col>
							<h1 className="text-center">Create summarie</h1>
						</Col>
					</Row>
					<Row className="justify-content-center align-items-center">
						<Row>
							<Col >
								<FormLabel>Resume name</FormLabel>
								<Form.Control name='summarieName' type="text" value={resumeData.summarieName} onChange={handleInputChange} className='inputField'></Form.Control>
							</Col>
						</Row>
						<Row className="mb-4">
							<Col >
								<FormLabel>Tags</FormLabel>
								<AsyncSelect
									loadOptions={loadOptions}
									onChange={handleAsyncSelection}
									defaultOptions
									placeholder="Digite para buscar..."
									isSearchable
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Group className="mb-3" controlId="formBasicCheckbox">
									<Button onClick={generateResume}>
										Generate resume by chat GPT
									</Button>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col>
								{loading ?
									<div className="loading-spinner">
										<div className="spinner"></div>
									</div>
									: null
								}
							</Col>
						</Row>
						<Row className='mb-4'>
							<Col >
								<FormLabel>Resume</FormLabel>
								<Form.Control as="textarea" rows={4} name='summarieContent' type="text" value={resumeData.summarieContent} onChange={handleInputChange} className='inputField resume-text' ></Form.Control>
							</Col>
						</Row>

						<Row >
							<Col className="text-center" >
								<Button onClick={handleSubmitSummarie}>
									Criar
								</Button>
								{showAlert && (
									<Alert variant="success" className="mt-3" onClose={() => setShowAlert(false)} dismissible>
										Created successfully!
									</Alert>
								)}
							</Col>
						</Row>
					</Row>
				</Modal.Body>
			</Modal>

			<Modal show={deckVisible} onHide={() => {
				setDeckData({ deckName: "", tagId: "" });
				setDeckVisible(false);
			}}
				size='lg' centered>
				<Modal.Header style={{ backgroundColor: "#DAE9F1", height: "50px" }} closeButton />
				<Modal.Body style={{ backgroundColor: "#DAE9F1", paddingTop: "10px", paddingBottom: "30px", paddingRight: "150px", paddingLeft: "150px" }}>
					<Row className='mb-2'>
						<Col>
							<h1 className="text-center">Create deck</h1>
						</Col>
					</Row>
					<Row className="justify-content-center align-items-center">
						<Row>
							<Col >
								<FormLabel>Deck name</FormLabel>
								<Form.Control name='deckName' type="text" value={deckData.deckName} onChange={handleInputChange} className='inputField'></Form.Control>
							</Col>
						</Row>
						<Row className="mb-4">
							<Col>
								<FormLabel>Tags</FormLabel>
								<AsyncSelect
									loadOptions={loadOptions}
									onChange={handleAsyncSelection}
									defaultOptions
									placeholder="Digite para buscar..."
									isSearchable
								/>
							</Col>
						</Row>
						<Row >
							<Col className="text-center" >
								<Button onClick={handleSubmitDeck}>
									Criar
								</Button>
								{showAlert && (
									<Alert variant="success" className="mt-3" onClose={() => setShowAlert(false)} dismissible>
										Created successfully!
									</Alert>
								)}
							</Col>
						</Row>
					</Row>
				</Modal.Body>
			</Modal>

			<Modal show={cardVisible} onHide={() => {
				setCardData({ cardName: "", deckId: "", cardContent: "" });
				setCardVisible(false);
			}}
				size='lg' centered>
				<Modal.Header style={{ backgroundColor: "#DAE9F1", height: "50px" }} closeButton />
				<Modal.Body style={{ backgroundColor: "#DAE9F1", paddingTop: "10px", paddingBottom: "30px", paddingRight: "150px", paddingLeft: "150px" }}>
					<Row className='mb-2'>
						<Col>
							<h1 className="text-center">Create card</h1>
						</Col>
					</Row>
					<Row className="justify-content-center align-items-center">

						<Row className="mb-4">
							<Col>
								<FormLabel>Deck name</FormLabel>
								<AsyncSelect
									loadOptions={loadOptions}
									onChange={handleAsyncSelection}
									defaultOptions
									placeholder="Digite para buscar..."
									isSearchable
								/>
							</Col>
						</Row>
						<Row className="mb-4">
							<Col >
								<FormLabel>Front card</FormLabel>
								<Form.Control name='cardName' type="text" value={cardData.cardName} onChange={handleInputChange} className='inputField'></Form.Control>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Group className="mb-3" controlId="formBasicCheckbox">
									<Button onClick={generateCard}>
										Generate back card by chat GPT
									</Button>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col>
								{loading ?
									<div className="loading-spinner">
										<div className="spinner"></div>
									</div>
									: null
								}
							</Col>
						</Row>
						<Row>
							<Col >
								<FormLabel>Back card</FormLabel>
								<Form.Control name='cardContent' type="text" as="textarea" rows={4} value={cardData.cardContent} onChange={handleInputChange} className='inputField resume-text'></Form.Control>
							</Col>
						</Row>
						<Row >
							<Col className="text-center" >
								<Button onClick={handleSubmitCard}>
									Criar
								</Button>
								{showAlert && (
									<Alert variant="success" className="mt-3" onClose={() => setShowAlert(false)} dismissible>
										Created successfully!
									</Alert>
								)}
							</Col>
						</Row>
					</Row>
				</Modal.Body>
			</Modal>

			<Modal show={tagVisible} onHide={() => setTagVisible(false)} centered>
				<Modal.Header style={{ backgroundColor: "#DAE9F1", height: "50px" }} closeButton />
				<Modal.Body style={{ backgroundColor: "#DAE9F1", paddingTop: "10px", paddingBottom: "30px", paddingRight: "100px", paddingLeft: "100px" }}>
					<Row className='mb-2'>
						<Col>
							<h1 className="text-center">Create tag</h1>
						</Col>
					</Row>
					<Row className="justify-content-center align-items-center">
						<Row className='mb-4'>
							<Col >
								<FormLabel>Tag name</FormLabel>
								<Form.Control name='tagName' type="text" value={tagData.tagName} onChange={handleInputChange} className='inputField'></Form.Control>
							</Col>
						</Row>

						<Row >
							<Col className="text-center" >
								<Button onClick={handleSubmitTag}>
									Salvar
								</Button>
								{showAlert && (
									<Alert variant="success" className="mt-3" onClose={() => setShowAlert(false)} dismissible>
										Created successfully!
									</Alert>
								)}
							</Col>
						</Row>
					</Row>
				</Modal.Body>
			</Modal>

			<h1>{props.name}</h1>
			<div className="icons2">
				<Dropdown hidden={!props.summarie} className='filter-button' >
					<Dropdown.Toggle as={Button} variant="primary" id="dropdown-basic" className='add-button'>
						<FontAwesomeIcon icon={faFilter} />
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<FormLabel>Tags</FormLabel>
						<AsyncSelect
							loadOptions={loadOptions}
							onChange={handleFilterSelection}
							defaultOptions
							placeholder="Digite para buscar..."
							isSearchable
							isClearable
						/>
					</Dropdown.Menu>
				</Dropdown>

				<Dropdown hidden={!props.deck} className='filter-button' >
					<Dropdown.Toggle as={Button} variant="primary" id="dropdown-basic" className='add-button'>
						<FontAwesomeIcon icon={faFilter} />
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<FormLabel>Tags</FormLabel>
						<AsyncSelect
							loadOptions={loadOptions}
							onChange={handleFilterSelection}
							defaultOptions
							placeholder="Digite para buscar..."
							isSearchable
							isClearable={true}
						/>
					</Dropdown.Menu>
				</Dropdown>

				<Dropdown hidden={!props.summarie} onSelect={handleItemClick}>
					<Dropdown.Toggle as={Button} variant="primary" id="dropdown-basic" className='add-button'>
						<FontAwesomeIcon icon={faCirclePlus} />
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item eventKey="summarie" >Add a summarie</Dropdown.Item>
						<Dropdown.Item eventKey="tag" >Add a tag</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>

				<Dropdown hidden={!props.deck} onSelect={handleItemClick}>
					<Dropdown.Toggle as={Button} variant="primary" id="dropdown-basic">
						<FontAwesomeIcon icon={faCirclePlus} />
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item eventKey="deck" >Adicionar deck</Dropdown.Item>
						<Dropdown.Item eventKey="card" >Adicionar card</Dropdown.Item>
						<Dropdown.Item eventKey="tag" >Add a tag</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</div>
	);
}

