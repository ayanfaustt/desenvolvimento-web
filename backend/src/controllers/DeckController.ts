import {
    createDeck as createDeckRepository,
    deleteDeck as deleteDeckRepository,
    getDeck as getDeckRepository,
    updateDeck as updateDeckRepository,
    listDecks as listDecksRepository
} from "../database/repositories/deckRepository";
import { Response, Request } from "express";
import { Model } from "sequelize";

class DeckController {
    
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

    async updateDeck (req: Request, res: Response): Promise<Response> {
        try {
            const { userId: id } = req.params;
            const { deckName, tagId } = req.body;

            await updateDeckRepository(id, deckName, tagId);

            return res.status(200).send({message: "Deck updated !"})
        } catch (error) {
            if (error instanceof Error) return res.status(400).send({messege: error.message});

            return res.status(400).send({message: error});
        }
    }

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