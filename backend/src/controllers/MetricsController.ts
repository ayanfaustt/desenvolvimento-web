import { Response, Request } from "express";
import { Model } from "sequelize";

import {
    createMetrics as createMetricsRepository,
    imcrementDeckReview as imcrementDeckReviewMetricsRepository,
    imcrementSummariesReview as imcrementSummariesReviewRepository
} from "../database/repositories/metricRepository";



class MetricsController {
        //metrics
    //TODO implement some verify on date field
    //TODO implement a method for the system create a new record when the date changes (0 for reviews date for last login) 
    //TODO create a method for update ONLY the reviews field
    //TODO create a controller to metrics ?
    async updateDecksMetrics (req: Request, res: Response): Promise<Response>{
        try{
            const { userId: id } = req.params;

            await imcrementDeckReviewMetricsRepository(id);

            return res.status(200).send({message: "User metrics updated !"})
        }catch(error){
            if (error instanceof Error) return res.status(400).send({message: error.message});
            
            return res.status(400).send({message: error});
        }
    }

    async updatedSummariesMetrics (req: Request, res: Response): Promise<Response>{
        try{
            const { userId: id } = req.params;

            await imcrementSummariesReviewRepository(id);

            return res.status(200).send({message: "User metrics updated !"})
        }catch(error){
            if (error instanceof Error) return res.status(400).send({message: error.message});
            
            return res.status(400).send({message: error});
        }
    }
}

export default new MetricsController;