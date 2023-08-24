import { Response, Request, NextFunction } from "express";
import { Model } from "sequelize";
import UserServices from "../services/UserServices";
import TokenRepository from "../database/repositories/TokenRepository";

class SessionController {
  /**
    * @description User's login.
    * @param {string} username - req.body (string) the username;
    * @param {string} password - req.body (string) the user password;
    * @returns A message with status code.
    */
  async login (req: Request, res: Response): Promise<Response<Model>> {
    const emailregex = /^\S+@\S+\.\S+$/;
    try {
      const { username: un , password: pw } = req.body;
      let user;
      if(emailregex.test(un)){
        user =  await UserServices.getAllUserInfoByUserEmail(un as string);
      }
      else{
        user = await UserServices.getAllUserInfoByUserName(un as string);
      }

      const id  = user.get("id") as string;
      if(await UserServices.comparePassword(pw, user.get("password") as string)){
        const loctoken = TokenRepository.generateToken(user.get("username") as string);
        return res.status(200).send({userId: id, token: loctoken});
      }
      return res.status(401).send({message: "invalid credentials"});

    } catch (error) {
      if(error instanceof Error ) return res.status(400).send({message: error.message});

      return res.status(400).send({message: error});
    }
  }

  verifySession(req: Request, res: Response, next: NextFunction){
    return TokenRepository.verifyToken(req,res,next);
  }
};

export default new SessionController;