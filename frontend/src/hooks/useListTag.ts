import axios from "axios";

export const TagList = (userId: number) => {
    
  const url = `http://localhost:8000/tags/list/${userId}`;
  return axios.get(url);
    
};