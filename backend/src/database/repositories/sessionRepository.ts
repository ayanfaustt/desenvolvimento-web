import { Model } from "sequelize";
import { SessionModel } from "../../models/session.model";

function rand(): string{
    return Math.random().toString(32).substring(2); // remove `0.`
}
function token(): string{
    return rand() + rand() + rand() + rand() as string;
}

export const createSession = async (userId: string): Promise<void> => {
    const isSessionCreated = await SessionModel.create({
        userId: userId,
        web_session: token(),
        mob_session: token()
    })
    if (!isSessionCreated) throw new Error("The session can not be created !")
};

export const refreshSession = async (userId: string, session_type: number): Promise<string> => {
    const session = await SessionModel.findOne({
        where: {
            userId: userId
        }
    });
    let loctoken = token();
    if (session) {
        if (session_type === 0) {
            session.update({ web_session: loctoken })
        }
        if (session_type === 1) {
            session.update({ mob_session: loctoken })
        }
        return loctoken;
    }
    else { throw new Error("The token can not be refreshed!") };
}

export const checkSession =async (userId: string, token: string, session_type: number) : Promise<boolean> => {
    const session = await SessionModel.findOne({
        where: {
            userId: userId
        }
    });
    if(session){
        if(session_type == 0 && token === session.get("web_session")){
            return true;
        }
        else if(session_type == 1 && token === session.get("mob_session")){
            return true;
        }
    }
    return false;
}