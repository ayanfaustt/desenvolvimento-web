import axios from "axios";

export const ListSummaries = (userId: number, token: number) => {
	const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
	const url = `http://localhost:8000/summaries/list/${userId}`;
	return axios.get(url, authorization);
};

export const ListSummarie = (summarieId: number, token: number) => {
	const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
	const url = `http://localhost:8000/summaries/${summarieId}`;
	return axios.get(url, authorization);
};

export const CreateSummarie = (userId: number, data: object, token: number) => {
	const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
	const url = `http://localhost:8000/summaries/create/${userId}`;
	return axios.post(url, data, authorization);
};

export const DeleteSummarie = (summarieId: number, token: number) => {
	const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
	const url = `http://localhost:8000/summaries/delete/${summarieId}`;
	return axios.delete(url, authorization);
};

export const UpdateSummarie = (summarieId: number, data: object, token: number) => {
	const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
	const url = `http://localhost:8000/summaries/update/${summarieId}`;
	return axios.put(url, data, authorization);
};

export const FilterTagSummaries = (userId: number, tagId: number, token: number) => {
	const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
	const url = `http://localhost:8000/summaries/listByTag/${userId}?tagId=${tagId}`;
	return axios.get(url, authorization);
};