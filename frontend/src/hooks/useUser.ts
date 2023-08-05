import axios from "axios";

export const UserId = (username: string) => {
    
  const url = `http://localhost:8000/user/${username}`;
  return axios.get(url);
    
};