import { Response, Request } from "express";
import { Model } from "sequelize";
//repositories
import { 
    getAllUserInfo as getAllUserInfoRepository, 
    createUser as createUserRepository,
    deleteUser as deleteUserRepository,
    getOnlyUser as getOnlyUserRepository,
    getUserAndMetrics as getUserAndMetricsRepository
} from "../database/repositories/userRepository";

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
    //TODO: do not return the user password
    async getAllUserInfo (req: Request<IGetUser, unknown, IGetUser>, res: Response): Promise<Response<Model>> {
        try{
            const { username } = req.params;
        
            const user = await getAllUserInfoRepository(username);
            
            return res.status(200).send(user); 
        } catch(error){
            if (error instanceof Error) return res.status(400).send({message: error.message});
            
            return res.status(400).send({message: error});
        }
       
    };

    async getUserWithMetrics (req: Request<IGetUser, unknown, IGetUser>, res: Response): Promise<Response<Model>> {
        try{
            const { username } = req.params;
        
            const user = await getUserAndMetricsRepository(username);
            
            return res.status(200).send(user); 
        } catch(error){
            if (error instanceof Error) return res.status(400).send({message: error.message});
            
            return res.status(400).send({message: error});
        }
       
    };

    

    async createUser (req: Request<IGetUser, unknown, IGetUser>, res: Response): Promise<Response>{
        try{
            const { username } = req.params;
            const { email, password }  = req.body;
            await createUserRepository(username, email, password);

            const userId = (await getAllUserInfoRepository(username)).get("id");
            await createSession(userId as string);

            return res.status(200).send({message: "User created !"});
        }catch(error ){
            if (error instanceof Error) return res.status(400).send({message: error.message});
            
            return res.status(400).send({message: error});
        }
    }

    async deleteUser (req: Request<IGetUser, unknown, IGetUser>, res: Response): Promise<Response> {
        try {
            const { username } = req.body;

            await deleteUserRepository(username);

            return res.status(200).send({message: "User deleted !"});
        } catch (error) {
            if (error instanceof Error) return res.status(400).send({message: error.message});
            
            return res.status(400).send({message: error});
        }
    }
};

export default new UserController;