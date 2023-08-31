import axios from "axios";

export const ListDecks = (userId: number, token: string) => {
	const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
	const url = `http://localhost:8000/decks/list/${userId}`;
	return axios.get(url, authorization);
};

export const CreateDeck = (userId: number, data: object, token: string) => {
	const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
	const url = `http://localhost:8000/decks/create/${userId}`;
	return axios.post(url, data);
};

export const DeleteDeck = (deckId: number, token: string) => {
	const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
	const url = `http://localhost:8000/decks/delete/${deckId}`;
	return axios.delete(url);
};

export const UpdateDeck = (deckId: number, data: object, token: string) => {
	const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
	const url = `http://localhost:8000/decks/update/${deckId}`;
	return axios.post(url, data);
};

export const FilterTagDecks = (userId: number, tagId: number, token: string) => {
	const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
	const url = `http://localhost:8000/decks/listByTag/${userId}?tagId=${tagId}`;
	return axios.get(url);
};

export const ListCards = (deckId: number, token: string) => {
	const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
	const url = `http://localhost:8000/cards/list/${deckId}`;
	return axios.get(url);
};

export const CreateCard = (deckId: string, data: object, token: string) => {
	const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
	const url = `http://localhost:8000/cards/create/${deckId}`;
	return axios.post(url, data);
};
