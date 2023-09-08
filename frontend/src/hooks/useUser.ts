import axios from "axios";

export const LoginUser = (data: object) => {
	const url = "http://localhost:8000/session/login";
	return axios.post(url, data);
};

export const CreateUser = (username: string, data: object) => {
	const url = `http://localhost:8000/user/create/${username}`;
	return axios.post(url, data);
};

export const UpdateUser = (userid: number, data: object, token: string) => {
	const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
	const url = `http://localhost:8000/user/update/${userid}`;
	return axios.put(url, data, authorization);
};

export const UserInfo = (username: string, token: string) => {
	const authorization = {
		headers: {
			'Authorization': `Bearer ${token}`,
		}
	};
	const url = `http://localhost:8000/user/${username}`;
	return axios.get(url, authorization);
};