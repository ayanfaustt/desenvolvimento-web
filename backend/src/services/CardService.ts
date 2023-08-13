import { Model } from "sequelize";
import CardRepository from "../database/repositories/CardRepository";
import DeckService from "./DeckService";
import { NotFoundError } from "../expcetions/NotFound";

class CardServices{

  async create(
    deckId: string,
    cardName: string,
    cardContent: string,
  ): Promise<void> {

    await DeckService.get(deckId);
			
    await CardRepository.create(deckId, cardName, cardContent);

  };

  async get (cardId: string): Promise<Model> {

    const card = await CardRepository.get(cardId);

    if(!card)
      throw new NotFoundError("Card not found !");
  
    return card;

  };

  async list (deckId: string): Promise<Model[]> {

    const cards = await CardRepository.list(deckId);
  
    return cards;
  };

  async update (
    cardId: string,
    cardName: string,
    cardContent: string,
  ): Promise<void> {

    await this.get(cardId);

    await CardRepository.update(cardId, cardName, cardContent);

  };

  async delete (cardId: string): Promise<void> {

    await CardRepository.delete(cardId);

  };

}


export default new CardServices;
