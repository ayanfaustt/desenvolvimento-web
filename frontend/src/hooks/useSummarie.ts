import axios from "axios";

export const ListSummaries = (userId: number) => {
	const url = `http://localhost:8000/summaries/list/${userId}`;
	return axios.get(url);
};

export const ListSummarie = (summarieId: number) => {
	const url = `http://localhost:8000/summaries/${summarieId}`;
	return axios.get(url);
};

export const CreateSummarie = (userId: number, data: object) => {
	const url = `http://localhost:8000/summaries/create/${userId}`;
	return axios.post(url, data);
};

export const DeleteSummarie = (summarieId: number) => {
	const url = `http://localhost:8000/summaries/delete/${summarieId}`;
	return axios.delete(url);
};

export const UpdateSummarie = (summarieId: number, data: object) => {
	const url = `http://localhost:8000/summaries/update/${summarieId}`;
	return axios.put(url, data);
};

export const FilterTagSummaries = (userId: number, tagId: number) => {
	const url = `http://localhost:8000/summaries/listByTag/${userId}?tagId=${tagId}`;
	return axios.get(url);
};