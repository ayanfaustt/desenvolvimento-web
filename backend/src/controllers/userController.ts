import { Response, Request } from "express";
import { Model } from "sequelize";
//repositories
import { 
    getUser as getUserRepository, 
    createUser as createUserRepository,
    deleteUser as deleteUserRepository
} from "../database/repositories/userRepository";

import {
    createMetrics as createMetricsRepository 
} from "../database/repositories/metricRepository";

import { gpt }  from "../services/external/openai";

import { 
    IGetUser,
    IMetricsParams,
    IMetricsVBody
 } from "./types";
import { MetricsModel } from "../models/metrics.model";
import { createSession } from "../database/repositories/sessionRepository";


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
            const { password }  = req.body;
            await createUserRepository(username, password)

            const userId = (await getUserRepository(username)).get("id");
            await createSession(userId as string);

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
    //TODO create a controller to metrics ?
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
};

export default new UserController;