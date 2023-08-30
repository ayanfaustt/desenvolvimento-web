import axios from "axios";

export const CreateTag = (userId: number, data: object, token: string) => {
	const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
  const url = `http://localhost:8000/tags/create/${userId}`;
  return axios.post(url, data, authorization);
    
};

export const TagList = (userId: number, token: string) => {
	const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
	const url = `http://localhost:8000/tags/list/${userId}`;
	return axios.get(url, authorization);
};