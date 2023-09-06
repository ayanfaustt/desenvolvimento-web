import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { ListCards } from "../../hooks/useFlashcard";
import FlashcardList from "../../components/flashcard";
import { useUser } from "../../hooks/useContextUserId";

interface Card {
	card_content: string;
	card_name: string;
}

export default function CardsInsidePage() {
	const location = useLocation();
	const { token } = useUser();
	const { itemId } = location.state;
	const [cardContent, setCardContent] = useState([]);
	const [activeCardIndex, setActiveCardIndex] = useState(0);

	useEffect(() => {
		const fetchResumeContent = async () => {
			try {
				if (token) await ListCards(itemId, token).then((res) => {
					console.log(res.data)
					setCardContent(res.data)
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
			return newIndex < cardContent.length ? newIndex : 0;
		});
	};

	const prevCard = () => {
		setActiveCardIndex((prevIndex) => {
			const newIndex = prevIndex - 1;
			return newIndex >= 0 ? newIndex : cardContent.length - 1;
		});
	};

	return (
		<main className="flashcard-main">
			<SideBar />
			<div className="card-grid">
				{cardContent.map((flashcard: Card, index: number) => {
					return <FlashcardList card_name={flashcard.card_name} card_content={flashcard.card_content} className={`${index === activeCardIndex ? "active" : ""}`} />
				})}
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