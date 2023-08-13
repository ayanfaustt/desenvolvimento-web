import axios from "axios";

export const ListDecks = (userId: number) => {
    
  const url = `http://localhost:8000/decks/list/${userId}`;
  return axios.get(url);
    
};

export const CreateDeck = (userId: number, data: object) => {
    
  const url = `http://localhost:8000/decks/create/${userId}`;
  return axios.post(url, data);
    
};

export const DeleteDeck = (deckId: number) => {
    
  const url = `http://localhost:8000/decks/delete/${deckId}`;
  return axios.delete(url);
    
};

export const UpdateDeck = (deckId: number, data: object) => {
    
  const url = `http://localhost:8000/decks/update/${deckId}`;
  return axios.post(url, data);
    
};