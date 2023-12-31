import { Request, Response } from "express";
import { Model } from "sequelize";
import MetricsService, { MetricComparationModel } from "../services/MetricsService";
import UserServices from "../services/UserServices";
import errorHandler from "../expcetions/returnError";
import { UserErrorMessages } from "../expcetions/messages";

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

      if(!username)
        throw new Error(UserErrorMessages.USER_USERNAME_NULL);

      const user = await UserServices.getAllUserInfoByUserName(username);
            
      return res.status(200).send(user); 
    } catch(error){
      return errorHandler(error, res);
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

      if(!username)
        throw new Error(UserErrorMessages.USER_USERNAME_NULL);
        
      const user = await UserServices.getUserAndMetrics(username);
      const metricComparation = await MetricsService.metricsHistory(user.getDataValue("id"));

      const result = {} as IUserWithMetrics;
      result.user = user;
      result.metricsInfo = metricComparation;
      
      return res.status(200).send(result);
    } catch(error){
      return errorHandler(error, res);
    }
       
  };

  /**
    * @description Create a new user.
    * @param {string} username - req.params (string) the username;
    * @param {string} email - req.body (string) the user's email;
    * @param {string} password - req.params (string) the user's password;
		* @param {string} image - req.body (string) user image reference;
    * @returns A message with status code.
    */
  async createUser (req: Request, res: Response): Promise<Response>{
    try{
      const { username } = req.params;
      const { email, password, image }  = req.body;

      if(!username)
        throw new Error(UserErrorMessages.USER_USERNAME_NULL);

      if(!email)
        throw new Error(UserErrorMessages.USER_EMAIL_NULL);
			
      if(!password)
        throw new Error(UserErrorMessages.USER_PASSWORD_NULL);

      await UserServices.createUser(username, email, password, image);

      return res.status(200).send({message: "User created !"});
    }catch(error ){
      return errorHandler(error, res);
    }
  }

  /**
    * @description Update an user.
		* @param {string} userId - req.params (string) user Id;
    * @param {string} username - req.body (string) the username;
    * @param {string} email - req.body (string) the user's email;
    * @param {string} password - req.body (string) the user's password;
		* @param {string} image - req.body (string) user image reference;
    * @returns A message with status code.
    */
  async updateUser (req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const { username, email, password, image }  = req.body;

      if(!userId)
        throw new Error(UserErrorMessages.USER_ID_NULL);

      await UserServices.updateUser(userId, username, email, password, image);

      return res.status(200).send({message: "User updated !"});
    } catch (error) {
      return errorHandler(error, res);
    }

  }

    /**
   * @description Update the username of a user.
   * @param {string} userId - req.params (string) user Id;
   * @param {string} newUsername - req.body (string) the new username;
   * @returns A message with status code.
   */
  async updateUsername(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const { newUsername } = req.body;

      if (!userId)
        throw new Error(UserErrorMessages.USER_ID_NULL);

      if (!newUsername)
        throw new Error("New username cannot be empty.");

      await UserServices.updateUsername(userId, newUsername);

      return res.status(200).send({ message: "Username updated !" });
    } catch (error) {
      return errorHandler(error, res);
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

      if(!username)
        throw new Error(UserErrorMessages.USER_USERNAME_NULL);

      await UserServices.deleteUser(username);

      return res.status(200).send({message: "User deleted !"});
    } catch (error) {
      return errorHandler(error, res);
    }
  }
};

export default new UserController;
