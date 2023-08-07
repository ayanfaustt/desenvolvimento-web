import { Model } from "sequelize/types/model";
import DeckRepository from "../database/repositories/DeckRepository";


class DeckService {
  
  async create(userId: string, deckName: string, tagId?: string): Promise<void> {
    try {

      await DeckRepository.create(userId, deckName, tagId);

    } catch (error) {
      throw new Error();
    }
    
  };

  async get(deckId: string): Promise<Model> {
    try {

      const deck = await DeckRepository.get(deckId);
		
      return deck;
    } catch (error) {
      throw new Error();
    }
  }
	
  async list (userId: string): Promise<Model[]> {
    try{

		  const decks = await DeckRepository.list(userId);
		
		  return decks;
    } catch (error) {
		  throw new Error();
    }
  };
	
  async listByTag (userId: string, tagId: string): Promise<Model[]> {
    try {

		  const decks = await DeckRepository.listByTag(userId, tagId);
		
		  return decks;
    } catch (error) {
		  throw new Error();
    }
  };
		
  async update (deckId: string, deckName: string, tagId?: string): Promise<void> {
    try {

		  await DeckRepository.update(deckId, deckName, tagId);
    
    } catch (error) {
		  throw new Error();
    }
  };
		
	  async delete (deckId: string): Promise<void> {
    try {

      await DeckRepository.delete(deckId);
		  
    } catch (error) {
		  throw new Error("The operation can not be completed !");
    }
  };
}

export default new DeckService;