import axios from "axios";

export const UserId = (username: string) => {
	const url = `http://localhost:8000/user/${username}`;
	return axios.get(url);
};

export const LoginUser = (data: object) => {
	const url = "http://localhost:8000/session/login";
	return axios.post(url, data);
};

export const CreateUser = (username: string, data: object) => {
	const url = `http://localhost:8000/user/create/${username}`;
	return axios.post(url, data);
};