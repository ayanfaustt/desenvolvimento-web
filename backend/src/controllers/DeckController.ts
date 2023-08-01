import {
    createDeck as createDeckRepository,
    deleteDeck as deleteDeckRepository,
    getDeck as getDeckRepository,
    updateDeck as updateDeckRepository,
    listDecks as listDecksRepository,
    listDecksByTag as listDecksByTagRepository
} from "../database/repositories/deckRepository";
import { Response, Request } from "express";
import { Model } from "sequelize";

class DeckController {
    
    /**
    * @description Get a specific user's deck with all your cards and tag.
    * @param {string} deckId - req.params (string) the deck id;
    * @returns A deck object with status code.
    */
    async getDeck (req: Request, res: Response): Promise<Response<Model>> {
        try {
            const { deckId: id } = req.params;

            const deck = await getDeckRepository(id);

            return res.status(200).send(deck);
        } catch (error) {
            if(error instanceof Error ) return res.status(400).send({message: error.message});

            return res.status(400).send({message: error});
        }
    }

    /**
    * @description List all user's decks without cards.
    * @param {string} userId - req.params (string) the user id;
    * @returns A list of deck objects with status code.
    */
    async listDeck (req: Request, res: Response): Promise<Response<Model[]>> {
        try {
            const { userId: id } = req.params;

            const deck = await listDecksRepository(id);

            return res.status(200).send(deck);
        } catch (error) {
            if(error instanceof Error ) return res.status(400).send({message: error.message});

            return res.status(400).send({message: error});
        }
    }

    /**
    * @description List all user's decks filltering by a tag.
    * @param {string} userId - req.params (string) the user id;
    * @param {string} tagId - req.body (string) the tag id;
    * @returns A list of deck objects with status code.
    */
    async listDecksByTag (req: Request, res: Response): Promise<Response<Model[]>> {
        try {
            const { userId } = req.params;
            const { tagId } = req.body;

            const decks = await listDecksByTagRepository(userId, tagId);

            return res.status(200).send(decks);
        } catch (error) {
            if(error instanceof Error ) return res.status(400).send({message: error.message});

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
    async updateDeck (req: Request, res: Response): Promise<Response> {
        try {
            const { deckId: id } = req.params;
            const { deckName, tagId } = req.body;

            await updateDeckRepository(id, deckName, tagId);

            return res.status(200).send({message: "Deck updated !"})
        } catch (error) {
            if (error instanceof Error) return res.status(400).send({messege: error.message});

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
    async createDeck (req: Request, res: Response): Promise<Response> {
        try {
            const { userId: id } = req.params;
            const { deckName, tagId } = req.body;

            await createDeckRepository(id, deckName, tagId); 

            return res.status(200).send({message: "Deck created !"});
        } catch (error) {
            if (error instanceof Error) return res.status(400).send({messege: error.message});

            return res.status(400).send({message: error});
            
        }
    }

    /**
    * @description Delete an user's deck.
    * @param {string} deckId - req.params (string) the deck id;
    * @returns A message with status code.
    */
    async deleteDeck (req: Request, res: Response): Promise<Response> {
        try {
            const { deckId: id } = req.params;

            await deleteDeckRepository(id);

            return res.status(200).send({message: "Deck deleted !"})
        } catch (error) {
            if (error instanceof Error) return res.status(400).send({message: error.message});
            
            return res.status(400).send({message: error});
        }
    }

}

export default new DeckController;