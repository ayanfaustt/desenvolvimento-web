import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { ListSummarie } from "../../hooks/useSummarie";
import { ListCards } from "../../hooks/useFlashcard";
import FlashcardList from "../../components/flashcard";

interface Card {
	card_content: string;
	card_name: string;
}

export default function CardsInsidePage() {
	const location = useLocation();
	const { itemId } = location.state;
	const [cardContent, setCardContent] = useState([]);

	useEffect(() => {
		const fetchResumeContent = async () => {
			try {
				await ListCards(itemId).then((res) => {
					console.log(res.data)
					setCardContent(res.data)
				});
			} catch (err) {
				console.log(err);
			};
		};
		fetchResumeContent();
	}, []);

	return (
		<main className="flashcard-main">
			<SideBar />
			<div className="card-grid">
				{cardContent.map((flashcard: Card) => {
					return <FlashcardList card_name={flashcard.card_name} card_content={flashcard.card_content}  />
				})}
			</div>
		</main>
	);
}