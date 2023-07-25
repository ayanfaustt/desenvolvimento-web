import { Response, Request } from "express";
import { Model } from "sequelize";
import {
    createSession as createTagRepository,
    refreshSession as deleteTagRepository,
    refreshSession,
} from "../database/repositories/sessionRepository";

import { 
    getAllUserInfoByUserName,
    getAllUserInfoByUserEmail,
    comparePassword
} from "../database/repositories/userRepository";

class SessionController {

    

    async login (req: Request, res: Response): Promise<Response<Model>> {
        const emailregex = /^\S+@\S+\.\S+$/;
        try {
            const { username: un , password: pw, session_type: st} = req.body;
            let user;
            if(emailregex.test(un)){
                user =  await getAllUserInfoByUserEmail(un as string);
            }
            else{
                user = await getAllUserInfoByUserName(un as string);
            }

            const id  = user.get('id') as string;
            if(await comparePassword(pw, user.get('password') as string)){
                const loctoken = await refreshSession(id,+st)
                return res.status(200).send({token: loctoken});
            }

            return res.status(401).send({message: "invalid credentials"})

        } catch (error) {
            if(error instanceof Error ) return res.status(400).send({message: error.message});

            return res.status(400).send({message: error});
        }
    }
};

export default new SessionController;