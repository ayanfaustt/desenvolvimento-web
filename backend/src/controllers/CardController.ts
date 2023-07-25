import {
    createCard as createCardRepository,
    deleteCard as deleteCardRepository,
    getCard as getCardRepository,
    listCards as listCardsRepository,
    updateCard as updateCardRepository
    
} from "../services/cardService";
import { Response, Request } from "express";
import { Model } from "sequelize";

class CardController {
    
    async getCard (req: Request, res: Response): Promise<Response<Model>> {
        try {
            const { deckId: id } = req.params;

            const card = await getCardRepository(id);

            return res.status(200).send(card);
        } catch (error) {
            if(error instanceof Error ) return res.status(400).send({message: error.message});

            return res.status(400).send({message: error});
        }
    }

    async listCards (req: Request, res: Response): Promise<Response<Model[]>> {
        try {
            const { deckId: id } = req.params;

            const cards = await listCardsRepository(id);

            return res.status(200).send(cards);
        } catch (error) {
            if(error instanceof Error ) return res.status(400).send({message: error.message});

            return res.status(400).send({message: error});
        }
    }

    async updateCard (req: Request, res: Response): Promise<Response> {
        try {
            const { deckId: id } = req.params;
            const { cardName: name, cardContent: content } = req.body;

            await updateCardRepository(id, name, content);

            return res.status(200).send({message: "Card updated"});
        } catch (error) {
            if(error instanceof Error ) return res.status(400).send({message: error.message});

            return res.status(400).send({message: error});
        }
    }

    async createCard (req: Request, res: Response): Promise<Response> {
        try {
            const { deckId: id } = req.params;
            const { cardName, cardContent, isGpt } = req.body;

            await createCardRepository(id, cardName, cardContent, isGpt); 

            return res.status(200).send({message: "Card created !"});
        } catch (error) {
            if (error instanceof Error) return res.status(400).send({messege: error.message});

            return res.status(400).send({message: error});
            
        }
    }

    async deleteCard (req: Request, res: Response): Promise<Response> {
        try {
            const { cardId: id } = req.params;

            await deleteCardRepository(id);

            return res.status(200).send({message: "Card deleted !"})
        } catch (error) {
            if (error instanceof Error) return res.status(400).send({message: error.message});
            
            return res.status(400).send({message: error});
        }
    }
}

export default new CardController;