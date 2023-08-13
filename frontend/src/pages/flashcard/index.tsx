import React, { useEffect, useState } from "react";
import "./styles.css";
import { useUser } from "../../hooks/useContextUserId";
import { ListDecks } from "../../hooks/useFlashcard";
import PageFlashcardContent from "../../components/pageFlashcardContent";

export default function FlashcardPage() {
	const [listFlashcards, setListFlashcards] = useState([]);
	const { userId } = useUser();

	useEffect(() => {
		const fetchListDecks = async () => {
			if (14) {
				await ListDecks(14).then((res) => setListFlashcards(res.data));
			};
		};
		fetchListDecks();
	}, []);

	const fetchUpdatedListDecks = async () => {
		if (userId) {
			await ListDecks(userId).then((res) => setListFlashcards(res.data));
		};
	};

	return (
		<PageFlashcardContent pageName='Decks' cardsContent={listFlashcards} onItemChanged={fetchUpdatedListDecks}/>
	);
}