import { Request, Response } from "express";
import { Model } from "sequelize";
import UserServices from "../services/UserServices";

import { createSession } from "../database/repositories/sessionRepository";
import {
  IGetUser
} from "./types";


class UserController {
    
  //user
  //TODO: do not return the user password
  /**
    * @description Get all user info.
    * @param {string} username - req.params (string) the username;
    * @returns A user object with status code.
    */
  async getAllUserInfo (req: Request<IGetUser, unknown, IGetUser>, res: Response): Promise<Response<Model>> {
    try{
      const { username } = req.params;
        
      const user = await UserServices.getAllUserInfoByUserName(username);
            
      return res.status(200).send(user); 
    } catch(error){
      if (error instanceof Error) return res.status(400).send({message: error.message});
            
      return res.status(400).send({message: error});
    }
       
  };

  /**
    * @description Get all user info with metrics.
    * @param {string} username - req.params (string) the username;
    * @returns A user object with status code.
    */
  async getUserWithMetrics (req: Request<IGetUser, unknown, IGetUser>, res: Response): Promise<Response<Model>> {
    try{
      const { username } = req.params;
        
      const user = await UserServices.getUserAndMetrics(username);
            
      return res.status(200).send(user); 
    } catch(error){
      if (error instanceof Error) return res.status(400).send({message: error.message});
            
      return res.status(400).send({message: error});
    }
       
  };

  /**
    * @description Create a new user.
    * @param {string} username - req.params (string) the username;
    * @param {string} email - req.body (string) the user's email;
    * @param {string} password - req.params (string) the user's password;
    * @returns A message with status code.
    */
  async createUser (req: Request<IGetUser, unknown, IGetUser>, res: Response): Promise<Response>{
    try{
      const { username } = req.params;
      const { email, password }  = req.body;
      await UserServices.createUser(username, email, password);

      const userId = (await UserServices.getAllUserInfoByUserName(username)).get("id");
      await createSession(userId as string);

      return res.status(200).send({message: "User created !"});
    }catch(error ){
      if (error instanceof Error) return res.status(400).send({message: error.message});
            
      return res.status(400).send({message: error});
    }
  }

  /**
    * @description Update an user.
    * @param {string} username - req.params (string) the username;
    * @param {string} email - req.body (string) the user's email;
    * @param {string} password - req.params (string) the user's password;
    * @returns A message with status code.
    */
  async updateUser (req: Request<IGetUser, unknown, IGetUser>, res: Response): Promise<Response> {
    try {
      const { username } = req.params;
      const { email, password }  = req.body;

      await UserServices.updateUser(username, email, password);

      return res.status(200).send({message: "User updated !"});
    } catch (error) {
      if (error instanceof Error) return res.status(400).send({message: error.message});
            
      return res.status(400).send({message: error});
    }

  }

  /**
    * @description Delete an user.
    * @param {string} username - req.params (string) the username;
    * @returns A message with status code.
    */
  async deleteUser (req: Request<IGetUser, unknown, IGetUser>, res: Response): Promise<Response> {
    try {
      const { username } = req.body;

      await UserServices.deleteUser(username);

      return res.status(200).send({message: "User deleted !"});
    } catch (error) {
      if (error instanceof Error) return res.status(400).send({message: error.message});
            
      return res.status(400).send({message: error});
    }
  }
};

export default new UserController;