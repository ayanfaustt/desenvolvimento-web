import axios from "axios";

export const GenerateSummarie = (summarieTitle: object) => {
	const url = `http://localhost:8000/openai/create/summarie`;
	return axios.post(url, summarieTitle);
};

export const GenerateCard = (cardTitle: object) => {
	const url = `http://localhost:8000/openai/create/card`;
	return axios.post(url, cardTitle);
};