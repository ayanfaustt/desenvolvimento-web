import React, { useEffect, useState } from "react";
import "./styles.css";
import { useUser } from "../../hooks/useContextUserId";
import { FilterTagDecks, ListDecks } from "../../hooks/useFlashcard";
import PageFlashcardContent from "../../components/pageFlashcardContent";

export default function FlashcardPage() {
	const [listFlashcards, setListFlashcards] = useState([]);
	const { userId, token } = useUser();

	useEffect(() => {
		const fetchListDecks = async () => {
			if (userId && token) {
				await ListDecks(userId, token).then((res) => setListFlashcards(res.data));
			};
		};
		fetchListDecks();
	}, []);

	const fetchUpdatedListDecks = async () => {
		if (userId && token) {
			await ListDecks(userId, token).then((res) => setListFlashcards(res.data));
		};
	};

	const fetchFilteredDecks = async (tagId: number | null) => {
		console.log(tagId)
		if (userId && token) {
			if (tagId) {
				await FilterTagDecks(userId, tagId, token).then((res) => setListFlashcards(res.data)).catch((err) => console.log(err));
			}
		};
	};

	return (
		<PageFlashcardContent pageName='Decks' cardsContent={listFlashcards} onItemChanged={fetchUpdatedListDecks} onFilter={fetchFilteredDecks} />
	);
}