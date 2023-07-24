import { Response, Request } from "express";
import { Model } from "sequelize";
import {
    createSession as createTagRepository,
    refreshSession as deleteTagRepository,
    refreshSession,
} from "../database/repositories/sessionRepository";

import { 
    getAllUserInfo as getAllUserInfoRepository
} from "../database/repositories/userRepository";

class SessionController {

    async login (req: Request, res: Response): Promise<Response<Model>> {
        try {
            const { username: un , password: pw, session_type: st} = req.body;
            const user = await getAllUserInfoRepository(un as string);

            const id  = user.get('id') as string;
            if(user.get('password') === pw){
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