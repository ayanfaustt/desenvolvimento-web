import DeckService from "../services/DeckService";
import { Response, Request } from "express";
import { DatabaseError, Model } from "sequelize";
import { NotFoundError } from "../expcetions/NotFound";
import { AlreadyExistError } from "../expcetions/AlreadyExistError";

class DeckController {
    
  /**
    * @description Get a specific user's deck with all your cards and tag.
    * @param {string} deckId - req.params (string) the deck id;
    * @returns A deck object with status code.
    */
  async get (req: Request, res: Response): Promise<Response<Model>> {
    try {
      const { deckId } = req.params;

      if(!deckId)
        throw new Error("Deck ID can not be null");

      const deck = await DeckService.get(deckId);

      return res.status(200).send(deck);
    } catch (error) {
      if(error instanceof DatabaseError ) 
        return res.status(500).send({message: error.message});

      if(error instanceof NotFoundError ) 
        return res.status(404).send({message: error.message});

      if(error instanceof AlreadyExistError ) 
        return res.status(409).send({message: error.message});

      return res.status(400).send({message: error});
    }
  }

  /**
    * @description List all user's decks without cards.
    * @param {string} userId - req.params (string) the user id;
    * @returns A list of deck objects with status code.
    */
  async list (req: Request, res: Response): Promise<Response<Model[]>> {
    try {
      const { userId } = req.params;

      if(!userId)
        throw new Error("User ID can not be null");

      const deck = await DeckService.list(userId);

      return res.status(200).send(deck);
    } catch (error) {
      if(error instanceof DatabaseError ) 
        return res.status(500).send({message: error.message});

      if(error instanceof NotFoundError ) 
        return res.status(404).send({message: error.message});

      if(error instanceof AlreadyExistError ) 
        return res.status(409).send({message: error.message});

      return res.status(400).send({message: error});
    }
  }

  /**
    * @description List all user's decks filltering by a tag.
    * @param {string} userId - req.params (string) the user id;
    * @param {string} tagId - req.query (string) :userId?TagId=...  the tag id;
    * @returns A list of deck objects with status code.
    */
  async listByTag (req: Request, res: Response): Promise<Response<Model[]>> {
    try {
      const { userId } = req.params;
      const { tagId } = req.query;

      if(!userId)
        throw new Error("User ID can not be null");

      if(!tagId)
        throw new Error("Tag ID can not be null");

      const decks = await DeckService.listByTag(userId, tagId.toString());

      return res.status(200).send(decks);
    } catch (error) {
      if(error instanceof DatabaseError ) 
        return res.status(500).send({message: error.message});

      if(error instanceof NotFoundError ) 
        return res.status(404).send({message: error.message});

      if(error instanceof AlreadyExistError ) 
        return res.status(409).send({message: error.message});

      return res.status(400).send({message: error});
    }
  }

  /**
    * @description Update an user's deck.
    * @param {string} deckId - req.params (string) the deck id;
    * @param {string} deckname - req.body (string) the deck name;
    * @param {string} tagId - req.body (string) the tag id (optional);
    * @returns A message with status code.
    */
  async update (req: Request, res: Response): Promise<Response> {
    try {
      const { deckId} = req.params;
      const { deckName, tagId } = req.body;

      if(!deckId)
        throw new Error("Deck ID can not be null");

      if(!deckName)
        throw new Error("Deck name can not be null");

      await DeckService.update(deckId, deckName, tagId);

      return res.status(200).send({message: "Deck updated !"});
    } catch (error) {
      if(error instanceof DatabaseError ) 
        return res.status(500).send({message: error.message});

      if(error instanceof NotFoundError ) 
        return res.status(404).send({message: error.message});

      if(error instanceof AlreadyExistError ) 
        return res.status(409).send({message: error.message});

      return res.status(400).send({message: error});
    }
  }

  /**
    * @description Create an user's deck.
    * @param {string} userId - req.params (string) the user id;
    * @param {string} deckname - req.body (string) the deck name;
    * @param {string} tagId - req.body (string) the tag id (optional);
    * @returns A message with status code.
    */
  async create (req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const { deckName, tagId } = req.body;

      if(!userId)
        throw new Error("User ID can not be null");

      if(!deckName)
        throw new Error("Deck name can not be null");

      await DeckService.create(userId, deckName, tagId); 

      return res.status(200).send({message: "Deck created !"});
    } catch (error) {
      if(error instanceof DatabaseError ) 
        return res.status(500).send({message: error.message});

      if(error instanceof NotFoundError ) 
        return res.status(404).send({message: error.message});

      if(error instanceof AlreadyExistError ) 
        return res.status(409).send({message: error.message});

      return res.status(400).send({message: error});
            
    }
  }

  /**
    * @description Delete an user's deck.
    * @param {string} deckId - req.params (string) the deck id;
    * @returns A message with status code.
    */
  async delete (req: Request, res: Response): Promise<Response> {
    try {
      const { deckId } = req.params;

      if(!deckId)
        throw new Error("Deck ID can not be null");

      await DeckService.delete(deckId);

      return res.status(204).send({message: "Deck deleted !"});
    } catch (error) {
      if(error instanceof DatabaseError ) 
        return res.status(500).send({message: error.message});

      if(error instanceof NotFoundError ) 
        return res.status(404).send({message: error.message});

      if(error instanceof AlreadyExistError ) 
        return res.status(409).send({message: error.message});

      return res.status(400).send({message: error});
    }
  }

}

export default new DeckController;