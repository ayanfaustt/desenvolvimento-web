import { Request, Response } from "express";
import { Model } from "sequelize";
import UserServices from "../services/UserServices";
import { MetricComparationModel} from "../services/MetricsService";
import SessionRepository from "../database/repositories/SessionRepository";
import MetricsService from "../services/MetricsService";

interface IUserWithMetrics{
	user: Model;
	metricsInfo: MetricComparationModel
}

class UserController {
    
  //user
  //TODO: do not return the user password
  /**
    * @description Get all user info.
    * @param {string} username - req.params (string) the username;
    * @returns A user object with status code.
    */
  async getAllUserInfo (req: Request, res: Response): Promise<Response<Model>> {
    try{
      const { username } = req.params;
      const { userID , token, sessionType} = req.body;
      if(await SessionRepository.checkSession(userID, token, sessionType)){

        const user = await UserServices.getAllUserInfoByUserName(username);
            
        return res.status(200).send(user); }
      else{
        return res.status(489).send();
      }
    } catch(error){
      if (error instanceof Error) return res.status(400).send({message: error.message});
            
      return res.status(400).send({message: error});
    }
       
  };

  /**
    * @description Get all user info with metrics.
    * @param {string} username - req.params (string) the username;
    * @returns A user object with metric status and status code.
    */
  //TODO: Refactor
  async getUserWithMetrics (req: Request, res: Response): Promise<Response<IUserWithMetrics>> {
    try{
      const { username } = req.params;
      const { userID , token, sessionType} = req.body;
      if(await SessionRepository.checkSession(userID, token, sessionType)){  
        const user = await UserServices.getUserAndMetrics(username);
        const metricComparation = await MetricsService.metricsHistory(user.getDataValue("id"));

        const result = {} as IUserWithMetrics;
        result.user = user;
        result.metricsInfo = metricComparation;
      
        return res.status(200).send(result);}
      else{
        return res.status(489).send();
      }
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
  async createUser (req: Request, res: Response): Promise<Response>{
    try{
      const { username } = req.params;
      const { email, password} = req.body;
      await UserServices.createUser(username, email, password);

      const userId = (await UserServices.getAllUserInfoByUserName(username)).get("id");
      await SessionRepository.createSession(userId as string);

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
  async updateUser (req: Request, res: Response): Promise<Response> {
    try {
      const { username } = req.params;
      const { userID , token, sessionType, email, password} = req.body;
      if(await SessionRepository.checkSession(userID, token, sessionType)){

        await UserServices.updateUser(username, email, password);

        return res.status(200).send({message: "User updated !"});}
      else{
        return res.status(489).send();
      }
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
  async deleteUser (req: Request, res: Response): Promise<Response> {
    try {
      const { userID , token, sessionType, username } = req.body;
      if(await SessionRepository.checkSession(userID, token, sessionType)){  
        await UserServices.deleteUser(username);

        return res.status(200).send({message: "User deleted !"});}
      else{
        return res.status(489).send();
      }
    } catch (error) {
      if (error instanceof Error) return res.status(400).send({message: error.message});
            
      return res.status(400).send({message: error});
    }
  }

  async resetPassword (req: Request, res: Response): Promise<Response> {
    try{
      const {email} = req.params;
      const { userID , token, sessionType } = req.body;
      if(await SessionRepository.checkSession(userID, token, sessionType)){  
        await UserServices.resetPass(email);

        return res.status(200).send({message: "User deleted !"});}
      else{
        return res.status(489).send();
      }
    }  catch (error) {
      if (error instanceof Error) return res.status(400).send({message: error.message});
            
      return res.status(400).send({message: error});
    }
  }
};

export default new UserController;
