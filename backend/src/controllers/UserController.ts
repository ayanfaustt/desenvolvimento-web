import { Request, Response } from "express";
import { DatabaseError, Model } from "sequelize";
import UserServices from "../services/UserServices";
import { MetricComparationModel} from "../services/MetricsService";
import MetricsService from "../services/MetricsService";
import { NotFoundError } from "../expcetions/NotFound";
import { AlreadyExistError } from "../expcetions/AlreadyExistError";

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
        
      const user = await UserServices.getAllUserInfoByUserName(username);
            
      return res.status(200).send(user); 
    } catch(error){
      if (error instanceof DatabaseError) return res.status(500).send({message: error.message});
            
      if(error instanceof NotFoundError ) 
        return res.status(404).send({message: error.message});

      if(error instanceof AlreadyExistError ) 
        return res.status(409).send({message: error.message});

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
        
      const user = await UserServices.getUserAndMetrics(username);
      const metricComparation = await MetricsService.metricsHistory(user.getDataValue("id"));

      const result = {} as IUserWithMetrics;
      result.user = user;
      result.metricsInfo = metricComparation;
      
      return res.status(200).send(result);
    } catch(error){
      if (error instanceof DatabaseError) return res.status(500).send({message: error.message});
            
      if(error instanceof NotFoundError ) 
        return res.status(404).send({message: error.message});

      if(error instanceof AlreadyExistError ) 
        return res.status(409).send({message: error.message});

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
      const { email, password }  = req.body;
      await UserServices.createUser(username, email, password);

      if(!username)
        throw new Error("Username can not be null");

      if(!email)
        throw new Error("Email can not be null");
			
      if(!password)
        throw new Error("Password can not be null");

      return res.status(200).send({message: "User created !"});
    }catch(error ){
      if (error instanceof DatabaseError) return res.status(500).send({message: error.message});
            
      if(error instanceof NotFoundError ) 
        return res.status(404).send({message: error.message});

      if(error instanceof AlreadyExistError ) 
        return res.status(409).send({message: error.message});

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
      const { email, password }  = req.body;

      await UserServices.updateUser(username, email, password);

      return res.status(200).send({message: "User updated !"});
    } catch (error) {
      if (error instanceof DatabaseError) return res.status(500).send({message: error.message});
            
      if(error instanceof NotFoundError ) 
        return res.status(404).send({message: error.message});

      if(error instanceof AlreadyExistError ) 
        return res.status(409).send({message: error.message});

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
      const { username } = req.body;

      await UserServices.deleteUser(username);

      return res.status(200).send({message: "User deleted !"});
    } catch (error) {
      if (error instanceof DatabaseError) return res.status(500).send({message: error.message});
            
      if(error instanceof NotFoundError ) 
        return res.status(404).send({message: error.message});

      if(error instanceof AlreadyExistError ) 
        return res.status(409).send({message: error.message});

      return res.status(400).send({message: error});
    }
  }
};

export default new UserController;
