import { Response, Request } from "express";
import { Model } from "sequelize";
//repositories
import { 
    getUser as getUserRepository, 
    createUser as createUserRepository,
    deleteUser as deleteUserRepository
} from "../database/repositories/userRepository";

import {
    createSummarie as createSummarieRepository,
    getSummarie as getSummarieRepository,
    deleteSummarie as deleteSummarieRepository
} from "../database/repositories/summarieRepository";
import {
    createMetrics as createMetricsRepository 
} from "../database/repositories/metricRepository";

import {
    createCard as createCardRepository,
    deleteCard as deleteCardRepository,
    getCard as getCardRepository,
    getCard as getCardsRepository,
    listCards as listCardsRepository
} from "../database/repositories/cardRepository";

import {
    createDeck as createDeckRepository,
    deleteDeck as deleteDeckRepository,
    getDeck as getDeckRepository
} from "../database/repositories/deckRepository";

import {
    createTag as createTagRepository,
    deleteTag as deleteTagRepository,
    listTags as listTagsRepository
} from "../database/repositories/tagRepository";

import { 
    IGetUser,
    IMetricsParams,
    IMetricsVBody
 } from "./types";
import { MetricsModel } from "../models/metrics.model";



class UserController {
    
    //user
    async getUser (req: Request<IGetUser, unknown, IGetUser>, res: Response): Promise<Response<Model>> {
        try{
            const { username } = req.params
        
            const user = await getUserRepository(username);
            
            return res.status(200).send(user); 
        } catch(error){
            if (error instanceof Error) return res.status(400).send({message: error.message});
            
            return res.status(400).send({message: error});
        }
       
    };

    async createUser (req: Request<IGetUser, unknown, IGetUser>, res: Response): Promise<Response>{
        try{
            const { username } = req.params;

            await createUserRepository(username)

            return res.status(200).send({message: "User created !"})
        }catch(error ){
            if (error instanceof Error) return res.status(400).send({message: error.message});
            
            return res.status(400).send({message: error});
        }
    }

    async deleteUser (req: Request<IGetUser, unknown, IGetUser>, res: Response): Promise<Response> {
        try {
            const { username } = req.body;

            await deleteUserRepository(username);

            return res.status(200).send({message: "User deleted !"})
        } catch (error) {
            if (error instanceof Error) return res.status(400).send({message: error.message});
            
            return res.status(400).send({message: error});
        }
    }

    //metrics
    //TODO implement some verify on date field
    //TODO implement a method for the system create a new record when the date changes (0 for reviews date for last login) 
    //TODO create a method for update ONLY the reviews field
    async updateMetrics (req: Request, res: Response): Promise<Response>{
        try{
            const { userId: id } = req.params;
            console.log(req.body, req.params);
            const { reviews, lastLogin } = req.body;

            await createMetricsRepository(id, reviews, lastLogin);

            return res.status(200).send({message: "User metrics updated !"})
        }catch(error){
            if (error instanceof Error) return res.status(400).send({message: error.message});
            
            return res.status(400).send({message: error});
        }
    }

    //summaries
    async getSummaries (req: Request, res: Response): Promise<Response> {
        try {
            const { userId: id } = req.params;

            const summarie = await getSummarieRepository(id);

            return res.status(200).send(summarie);
        } catch (error) {
            if(error instanceof Error ) return res.status(400).send({message: error.message});

            return res.status(400).send({message: error});
        }
    }

    async createSummarie (req: Request, res: Response): Promise<Response> {
        try {
            const { userId: id } = req.params;

            const { summarie_title, summarie_content } = req.body;

            await createSummarieRepository(id, summarie_title, summarie_content); 

            return res.status(200).send({message: "Summarie created !"})
        } catch (error) {
            if (error instanceof Error) return res.status(400).send({messege: error.message});

            return res.status(400).send({message: error});
            
        }
    }

    async deleteSummarie (req: Request, res: Response): Promise<Response> {
        try {
            const { summarieId: id } = req.params;

            await deleteSummarieRepository(id);

            return res.status(200).send({message: "summarie deleted !"})
        } catch (error) {
            if (error instanceof Error) return res.status(400).send({message: error.message});
            
            return res.status(400).send({message: error});
        }
    }

    //decks

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

    //cards
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

    async createCard (req: Request, res: Response): Promise<Response> {
        try {
            const { deckId: id } = req.params;
            const { cardName, cardContent } = req.body;

            await createCardRepository(id, cardName, cardContent); 

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

    //tags
    async listTags (req: Request, res: Response): Promise<Response<Model[]>> {
        try {
            const { userId: id } = req.params;

            const deck = await listTagsRepository(id);

            return res.status(200).send(deck);
        } catch (error) {
            if(error instanceof Error ) return res.status(400).send({message: error.message});

            return res.status(400).send({message: error});
        }
    }

    async createTag (req: Request, res: Response): Promise<Response> {
        try {
            const { userId: id } = req.params;
            const { tagName } = req.body;

            await createTagRepository(id, tagName); 

            return res.status(200).send({message: "Tag created !"});
        } catch (error) {
            if (error instanceof Error) return res.status(400).send({messege: error.message});

            return res.status(400).send({message: error});
            
        }
    }

    async deleteTag (req: Request, res: Response): Promise<Response> {
        try {
            const { deckId: id } = req.params;

            await deleteTagRepository(id);

            return res.status(200).send({message: "Tag deleted !"})
        } catch (error) {
            if (error instanceof Error) return res.status(400).send({message: error.message});
            
            return res.status(400).send({message: error});
        }
    }
};

export default new UserController;