import CardService from "../services/CardService";
import { Response, Request } from "express";
import { DatabaseError } from "sequelize";
import { Model } from "sequelize";
import { NotFoundError } from "../expcetions/NotFound";

class CardController {
    
  /**
    * @description Get a specific card of a deck.
    * @param {string} cardId - req.params (string) the card id;
    * @returns A card object with status code.
    */
  async get (req: Request, res: Response): Promise<Response<Model>> {
    try {
			
      const { cardId: id } = req.params;

      if(!id)
        throw new Error("The card ID can not be null");
				
      const card = await CardService.get(id);

      return res.status(200).send(card);
    
    } catch (error) {
      if(error instanceof DatabaseError ) return res.status(500).send({message: error.message});
      
      return res.status(404).send({message: error});
    }
  }

  /**
    * @description List all cards of a  specific deck.
    * @param {string} deckId - req.params (string) the deck id;
    * @returns A list of card objects with status code.
    */
  async list (req: Request, res: Response): Promise<Response<Model[]>> {
    try {
      const { deckId: id } = req.params;

      if(!id)
        throw new Error("The deck ID can not be null");

      const cards = await CardService.list(id);

      return res.status(200).send(cards);
    } catch (error) {
      if(error instanceof DatabaseError ) return res.status(500).send({message: error.message});
			
      if(error instanceof NotFoundError) return res.status(404).send({message: error.message});

      return res.status(400).send({message: error});
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
        throw new Error("The deck ID can not be null");
		
      if(!cardName)
        throw new Error("The card name can not be null");
			
			
      await CardService.update(cardId, cardName, cardContent);

      return res.status(200).send({message: "Card updated"});
    } catch (error) {
      if(error instanceof DatabaseError ) return res.status(500).send({message: error.message});

      if(error instanceof NotFoundError) return res.status(404).send({message: error.message});

      return res.status(400).send({message: error});
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
        throw new Error("The deck ID can not be null");
	
      if(!cardName)
        throw new Error("The card name can not be null");

      await CardService.create(deckId, cardName, cardContent); 

      return res.status(200).send({message: "Card created !"});
    } catch (error) {
      if (error instanceof DatabaseError) return res.status(500).send({messege: error.message});

      if(error instanceof NotFoundError) return res.status(404).send({message: error.message});

      return res.status(400).send({message: error});
            
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
        throw new Error("The card ID can not be null");

      await CardService.delete(cardId);

      return res.status(200).send({message: "Card deleted !"});
    } catch (error) {
      if (error instanceof DatabaseError) return res.status(500).send({message: error.message});
            
      return res.status(400).send({message: error});
    }
  }
}

export default new CardController;