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
} from "../database/repositories/summarieRepository"
import {
    createMetrics as createMetricsRepository 
} from "../database/repositories/metricRepository"


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

};

export default new UserController;