import axios from "axios";

export const CreateTag = (userId: number, data: object) => {

  const url = `http://localhost:8000/tags/create/${userId}`;
  return axios.post(url, data);
    
};