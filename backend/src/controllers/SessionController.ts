import { Response, Request } from "express";
import { Model } from "sequelize";
import SessionRepository from "../database/repositories/SessionRepository";

import UserServices from "../services/UserServices";

class SessionController {

    
  /**
    * @description User's login.
    * @param {string} username - req.body (string) the username;
    * @param {string} password - req.body (string) the user password;
    * @param {string} session_type - req.body (string) the type of login session (web or mobile);
    * @returns A message with status code.
    */
  async login (req: Request, res: Response): Promise<Response<Model>> {
    const emailregex = /^\S+@\S+\.\S+$/;
    try {
      const { username: un , password: pw, session_type: st} = req.body;
      let user;
      if(emailregex.test(un)){
        user =  await UserServices.getAllUserInfoByUserEmail(un as string);
      }
      else{
        user = await UserServices.getAllUserInfoByUserName(un as string);
      }

      const id  = user.get("id") as string;
      if(await UserServices.comparePassword(pw, user.get("password") as string)){
        const loctoken = await SessionRepository.refreshSession(id,+st);
        return res.status(200).send({userId: id, token: loctoken});
      }

      return res.status(401).send({message: "invalid credentials"});

    } catch (error) {
      if(error instanceof Error ) return res.status(400).send({message: error.message});

      return res.status(400).send({message: error});
    }
  }
};

export default new SessionController;