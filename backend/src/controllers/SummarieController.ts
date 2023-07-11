import {
    createSummarie as createSummarieRepository,
    getSummarie as getSummarieRepository,
    deleteSummarie as deleteSummarieRepository,
    updateSummarie as updateSummarieRepository,
    listSummaries as listSummarieRepository

} from "../database/repositories/summarieRepository";
import { Response, Request } from "express";
import { Model } from "sequelize";


class SummarieController {
    
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

    async listSummaries (req: Request, res: Response): Promise<Response<Model[]>> {
        try {
            const { userId: id } = req.params;

            const summaries = await listSummarieRepository(id);

            return res.status(200).send(summaries);
        } catch (error) {
            if (error instanceof Error) return res.status(400).send({messege: error.message});

            return res.status(400).send({message: error});
        }
    }

    async updateSummarie (req: Request, res: Response): Promise<Response> {
        try {
            const {deckId: id} = req.params;
            const {userId, summarieName, summarieContent, tagId } = req.body;

            await updateSummarieRepository(id, userId, summarieName, summarieContent, tagId);

            return res.status(200).send({message: "Summarie updated !"});
        } catch (error) {
            if (error instanceof Error) return res.status(400).send({messege: error.message});

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

}

export default new SummarieController;