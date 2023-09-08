import React, { useEffect, useState, ChangeEvent } from "react";
import SideBar from "../../components/sidebar";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { ListCards, UpdateCard } from "../../hooks/useFlashcard";
import FlashcardList from "../../components/flashcard";
import { useUser } from "../../hooks/useContextUserId";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { Alert, Button, Col, Form, FormLabel, Modal, Row } from "react-bootstrap";

interface Card {
	card_content: string;
	card_name: string;
	id: string;
}

export default function CardsInsidePage() {
	const location = useLocation();
	const { token } = useUser();
	const { itemId } = location.state;
	const [cardData, setCardData] = useState<Card[]>([]);
	const [updatedCard, setupdatedCard] = useState({ id: "", cardContent: "", cardName: "" });
	const [activeCardIndex, setActiveCardIndex] = useState(0);
	const [cardVisible, setCardVisible] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	useEffect(() => {
		const fetchResumeContent = async () => {
			try {
				if (token) await ListCards(itemId, token).then((res) => {
					setCardData(res.data)
				});
			} catch (err) {
				console.log(err);
			};
		};
		fetchResumeContent();
	}, []);

	const nextCard = () => {
		setActiveCardIndex((prevIndex) => {
			const newIndex = prevIndex + 1;
			return newIndex < cardData.length ? newIndex : 0;
		});
	};

	const prevCard = () => {
		setActiveCardIndex((prevIndex) => {
			const newIndex = prevIndex - 1;
			return newIndex >= 0 ? newIndex : cardData.length - 1;
		});
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;

		if (name === "cardName") {
			setupdatedCard((prevData) => ({
				...prevData,
				[name]: value
			}));
		} else if (name === "cardContent") {
			setupdatedCard((prevData) => ({
				...prevData,
				[name]: value
			}));
		};
	};

	useEffect(() => console.log(updatedCard), [updatedCard]);
	useEffect(() => console.log(cardData), [cardData]);

	const handleUpdateCard = async () => {
		try {
			if (token) await UpdateCard(cardData[activeCardIndex].id, updatedCard, token).then((response) => {
				if (response.status === 200) {
					setShowAlert(true);
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

	const handleEditClick = () => {
		setCardVisible(true);
		if(cardData.length > 0 && activeCardIndex >= 0 && activeCardIndex < cardData.length){

			setupdatedCard((prevData) => ({
				...prevData,
				"id": cardData[activeCardIndex].id,
				"cardName": cardData[activeCardIndex].card_name,
				"cardContent": cardData[activeCardIndex].card_content,
			}));
		}
	};

	return (
		<main className="flashcard-main">

			<Modal show={cardVisible} onHide={() => {
				setCardVisible(false);
			}}
				size='lg' centered>
				<Modal.Header style={{ backgroundColor: "#DAE9F1", height: "50px" }} closeButton />
				<Modal.Body style={{ backgroundColor: "#DAE9F1", paddingTop: "10px", paddingBottom: "30px", paddingRight: "150px", paddingLeft: "150px" }}>
					<Row className='mb-2'>
						<Col>
							<h1 className="text-center">Update card</h1>
						</Col>
					</Row>
					<Row className="justify-content-center align-items-center">

						<Row className="mb-4">
							<Col >
								<FormLabel>Front card</FormLabel>
								<Form.Control name='cardName' type="text" value={updatedCard.cardName} onChange={handleInputChange} className='inputField'></Form.Control>
							</Col>
						</Row>

						<Row>
							<Col >
								<FormLabel>Back card</FormLabel>
								<Form.Control name='cardContent' type="text" as="textarea" rows={4} value={updatedCard.cardContent} onChange={handleInputChange} className='inputField resume-text'></Form.Control>
							</Col>
						</Row>
						<Row >
							<Col className="text-center" >
								<Button onClick={handleUpdateCard}>
									Update
								</Button>
								{showAlert && (
									<Alert variant="success" className="mt-3" onClose={() => setShowAlert(false)} dismissible>
										Updated successfully!
									</Alert>
								)}
							</Col>
						</Row>
					</Row>
				</Modal.Body>
			</Modal>

			<SideBar />
			<div className="card-grid">
				{cardData.map((flashcard: Card, index: number) => {
					return <FlashcardList card_name={flashcard.card_name} card_content={flashcard.card_content} className={`${index === activeCardIndex ? "active" : ""}`} />
				})}
				<div className="carousel-icons">
					<FontAwesomeIcon icon={faTrash} className="icons"/>
					<h1 className="carousel-list">{activeCardIndex + 1}/{cardData.length}</h1>
					<FontAwesomeIcon icon={faPen} className="icons" onClick={handleEditClick} />
				</div>
				<div className="prevNextButtons">
					<button className="prev-button" onClick={prevCard}>
						&#8249; Previus
					</button>
					<button className="next-button" onClick={nextCard}>
						Next &#8250;
					</button>
				</div>
			</div>
		</main>
	);
}