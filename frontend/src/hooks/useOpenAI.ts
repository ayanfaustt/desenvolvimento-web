import axios from "axios";

export const GenerateSummarie = (summarieTitle: object, token: number) => {
	const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
	const url = `http://localhost:8000/openai/create/summarie`;
	return axios.post(url, summarieTitle, authorization);
};

export const GenerateCard = (cardTitle: object, token: number) => {
	const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
	const url = `http://localhost:8000/openai/create/card`;
	return axios.post(url, cardTitle, authorization);
};