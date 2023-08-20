import { Request, Response } from "express";
import { Model } from "sequelize";
import { DeckErrorMessages, TagErrorMessages, UserErrorMessages } from "../expcetions/messages";
import errorHandler from "../expcetions/returnError";
import DeckService from "../services/DeckService";

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
        throw new Error(DeckErrorMessages.DECK_ID_NULL);

      const deck = await DeckService.get(deckId);

      return res.status(200).send(deck);
    } catch (error) {
      return errorHandler(error, res);

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
        throw new Error(UserErrorMessages.USER_ID_NULL);

      const deck = await DeckService.list(userId);

      return res.status(200).send(deck);
    } catch (error) {
      return errorHandler(error, res);
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
        throw new Error(UserErrorMessages.USER_ID_NULL);

      if(!tagId)
        throw new Error(TagErrorMessages.TAG_ID_NULL);

      const decks = await DeckService.listByTag(userId, tagId.toString());

      return res.status(200).send(decks);
    } catch (error) {
      return errorHandler(error, res);
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
        throw new Error(DeckErrorMessages.DECK_ID_NULL);

      if(!deckName)
        throw new Error(DeckErrorMessages.DECK_NAME_NUll);

      await DeckService.update(deckId, deckName, tagId);

      return res.status(200).send({message: "Deck updated !"});
    } catch (error) {
      return errorHandler(error, res);
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
        throw new Error(UserErrorMessages.USER_ID_NULL);

      if(!deckName)
        throw new Error(DeckErrorMessages.DECK_NAME_NUll);

      await DeckService.create(userId, deckName, tagId); 

      return res.status(200).send({message: "Deck created !"});
    } catch (error) {
      return errorHandler(error, res);
            
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
        throw new Error(DeckErrorMessages.DECK_ID_NULL);

      await DeckService.delete(deckId);

      return res.status(204).send({message: "Deck deleted !"});
    } catch (error) {
      return errorHandler(error, res);
    }
  }

}

export default new DeckController;