import { SessionModel } from "../../models/session.model";

class SessionRepository{
  rand(): string{
    return Math.random().toString(32).substring(2); // remove `0.`
  }
  token(): string{
    return this.rand() + this.rand() + this.rand() + this.rand() as string;
  }
	
  async createSession(userId: string): Promise<void> {
    const isSessionCreated = await SessionModel.create({
      userId: userId,
      web_session: this.token(),
      mob_session: this.token()
    });
    if (!isSessionCreated) throw new Error("The session can not be created !");
  };
	
  async refreshSession(userId: string, session_type: number): Promise<string>{
    const session = await SessionModel.findOne({
      where: {
        userId: userId
      }
    });
    const loctoken = this.token();
    if (session) {
      if (session_type === 0) {
        session.update({ web_session: loctoken });
      }
      if (session_type === 1) {
        session.update({ mob_session: loctoken });
      }
      return loctoken;
    }
    else { throw new Error("The token can not be refreshed!"); };
  };
	
  async checkSession(userId: string, token: string, sessionType: number) : Promise<boolean>{
    const session = await SessionModel.findOne({
      where: {
        userId: userId
      }
    });
    if(session){
      if(sessionType == 0 && token === session.get("web_session")){
        return true;
      }
      else if(sessionType == 1 && token === session.get("mob_session")){
        return true;
      }
    }
    return false;
  };
}

export default new SessionRepository;;
