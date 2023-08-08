import React, { useState, ChangeEvent } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faFilter } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Modal, Button, Row, Col, FormLabel, Alert, Form } from "react-bootstrap";
import { CreateSummarie } from "../../hooks/useSummarie";
import { CreateTag } from "../../hooks/useTag";
import AsyncSelect from "react-select/async";
import { TagList } from "../../hooks/useListTag";
import { useUser } from "../../hooks/useContextUserId";

interface PageNameAndButtonsProps {
	name: string;
	onItemUpdated: () => void;
};

interface TagOption {
	value: string;
	label: string;
};

interface Tag {
	id: string;
	tag_name: string;
};


export default function PageNameAndButtons(props: PageNameAndButtonsProps) {
	const { userId } = useUser();
	const [summariesVisible, setSummariesVisible] = useState(false);
	const [tagVisible, setTagVisible] = useState(false);
	const [cardsVisible, setCardsVisible] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [resumeData, setResumeData] = useState({ summarieName: "", tagId: "", summarieContent: "" });
	const [tagData, setTagData] = useState({ tagName: "" });

	const handleVisible = (cards: boolean, summaries: boolean, tag: boolean) => {
		if (cards) {
			setCardsVisible(true);
		};
		if (summaries) {
			setSummariesVisible(true);
		};
		if (tag) {
			setTagVisible(true);
		};
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		if (name === "tagName") {
			setTagData((prevData) => ({
				...prevData,
				[name]: value
			}));
		} else {
			setResumeData((prevData) => ({
				...prevData,
				[name]: value
			}));
		};
	};

	const handleSubmitSummarie = async () => {
		try {
			if (userId) {

				await CreateSummarie(userId, resumeData).then((response) => {
					if (response.status === 200) {
						setShowAlert(true);
						setResumeData({ summarieName: "", tagId: "", summarieContent: "" });
						if (props.onItemUpdated) {
							props.onItemUpdated();
						}
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

	const handleSubmitTag = async () => {
		try {
			if (userId) {
				await CreateTag(userId, tagData).then(() => {
					setShowAlert(true);
					setTagData({ tagName: "" });
					setTimeout(() => {
						setShowAlert(false);
						setTagVisible(false);
					}, 2000);
				});
				await TagList(userId);
			}
		} catch (error) {
			console.error("Erro:", error);
		}
	};

	const handleItemClick = (eventKey: string | null) => {
		if (typeof eventKey === "string") {
			if (eventKey === "summarie") {
				handleVisible(false, true, false);
			} else if (eventKey === "tag") {
				handleVisible(false, false, true);
			} else if (eventKey === "deck") {
				handleVisible(true, false, false);
			}
		}
	};


	const loadOptions = async (inputValue: string) => {
		if (userId) {
			try {
				const response = await TagList(userId);
				const options: TagOption[] = response.data.map((tag: Tag) => ({
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
		}
		return [];
	};

	const handleAsyncSelection = (option: TagOption | null) => {
		if (option) {
			setResumeData((prevData) => ({
				...prevData,
				"tagId": option.value
			}));
		}
	};

	return (
		<div className='deckName'>

			<Modal show={summariesVisible} onHide={() => {
				setResumeData({ summarieName: "", tagId: "", summarieContent: "" });
				setSummariesVisible(false);
			}
			}
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
						<Row>
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
						<Row className='mb-4'>
							<Col >
								<FormLabel>Resume</FormLabel>
								<Form.Control as="textarea" rows={4} name='summarieContent' type="text" value={resumeData.summarieContent} onChange={handleInputChange} className='inputField resume-text' ></Form.Control>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Group className="mb-3" controlId="formBasicCheckbox">
									<Form.Check type="checkbox" label="Generate by chat GPT" />
								</Form.Group>
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

			<Modal show={cardsVisible} onHide={() => setCardsVisible(false)} >
				card
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
				<button className='filter-button' >
					<FontAwesomeIcon icon={faFilter} />
				</button>

				<Dropdown hidden={false} onSelect={handleItemClick}>
					<Dropdown.Toggle as={Button} variant="primary" id="dropdown-basic" className='add-button'>
						<FontAwesomeIcon icon={faCirclePlus} />
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item eventKey="summarie" >Add a summarie</Dropdown.Item>
						<Dropdown.Item eventKey="tag" >Add a tag</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>

				<Dropdown hidden={true}>
					<Dropdown.Toggle as={Button} variant="primary" id="dropdown-basic">
						<FontAwesomeIcon icon={faCirclePlus} />
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item eventKey="deck" >Adicionar deck</Dropdown.Item>
						<Dropdown.Item eventKey="tag" >Adicionar card</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</div>
	);
}

