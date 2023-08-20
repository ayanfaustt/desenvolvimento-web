import { Request, Response } from "express";
import { Model } from "sequelize";
import { CardErrorMessages, DeckErrorMessages } from "../expcetions/messages";
import CardService from "../services/CardService";
import errorHandler from "../expcetions/returnError";

class CardController {
    
  /**
    * @description Get a specific card of a deck.
    * @param {string} cardId - req.params (string) the card id;
    * @returns A card object with status code.
    */
  async get (req: Request, res: Response): Promise<Response<Model>> {
    try {
			
      const { cardId } = req.params;

      if(!cardId)
        throw new Error(CardErrorMessages.CARD_ID_NULL);
				
      const card = await CardService.get(cardId);

      return res.status(200).send(card);
    
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  /**
    * @description List all cards of a  specific deck.
    * @param {string} deckId - req.params (string) the deck id;
    * @returns A list of card objects with status code.
    */
  async list (req: Request, res: Response): Promise<Response<Model[]>> {
    try {
      const { deckId } = req.params;

      if(!deckId)
        throw new Error(DeckErrorMessages.DECK_ID_NULL);

      const cards = await CardService.list(deckId);

      return res.status(200).send(cards);
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  /**
    * @description Uptade a deck's card.
    * @param {string} cardId - req.params (string) the card id;
    * @param {string} cardName - req.body (string) the card name;
    * @param {string} cardContent - req.body (string) the card content;
    * @returns A message with status code.
    */
  async update (req: Request, res: Response): Promise<Response> {
    try {
      const { cardId } = req.params;
      const { cardName, cardContent } = req.body;

      if(!cardId)
        throw new Error(CardErrorMessages.CARD_ID_NULL);
		
      if(!cardName)
        throw new Error(CardErrorMessages.CARD_NAME_NULL);
			
			
      await CardService.update(cardId, cardName, cardContent);

      return res.status(200).send({message: "Card updated"});
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  /**
    * @description Create a deck's card.
    * @param {string} deckId - req.params (string) the deck id;
    * @param {string} cardName - req.body (string) the card name;
    * @param {string} cardContent - req.body (string) the card content;
    * @returns A message with status code.
    */
  async create (req: Request, res: Response): Promise<Response> {
    try {
      const { deckId } = req.params;
      const { cardName, cardContent } = req.body;

      if(!deckId)
        throw new Error(DeckErrorMessages.DECK_ID_NULL);
	
      if(!cardName)
        throw new Error(CardErrorMessages.CARD_NAME_NULL);

      await CardService.create(deckId, cardName, cardContent); 

      return res.status(200).send({message: "Card created !"});
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  /**
    * @description Delete a deck's card.
    * @param {string} cardId - req.params (string) the card id;
    * @returns A message with status code.
    */
  async delete (req: Request, res: Response): Promise<Response> {
    try {
      const { cardId } = req.params;

      if(!cardId)
        throw new Error(CardErrorMessages.CARD_ID_NULL);

      await CardService.delete(cardId);

      return res.status(204).send({message: "Card deleted !"});
    } catch (error) {
      return errorHandler(error, res);
    }
  }
}

export default new CardController;