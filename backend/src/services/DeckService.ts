import { Model } from "sequelize/types/model";
import DeckRepository from "../database/repositories/DeckRepository";
import { NotFoundError } from "../expcetions/NotFound";
import UserServices from "./UserServices";


class DeckService {
  
  async create(userId: string, deckName: string, tagId?: string): Promise<void> {
    await UserServices.getUserById(userId);
    await DeckRepository.create(userId, deckName, tagId);
  };

  async get(deckId: string): Promise<Model> {

    const deck = await DeckRepository.get(deckId);

    if(!deck)
      throw new NotFoundError("Deck not Found !");
		
    return deck;
  }
	
  async list (userId: string): Promise<Model[]> {
		
    await UserServices.getUserById(userId);
    
    const decks = await DeckRepository.list(userId);
		
    return decks;
  };
	
  async listByTag (userId: string, tagId: string): Promise<Model[]> {

    const decks = await DeckRepository.listByTag(userId, tagId);
		
    return decks;
  };
		
  async update (deckId: string, deckName: string, tagId?: string): Promise<void> {

    await DeckRepository.update(deckId, deckName, tagId);    
  };
		
  async delete (deckId: string): Promise<void> {

    await DeckRepository.delete(deckId);
  };
}

export default new DeckService;