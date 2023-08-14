import { UserModel } from "../../models/user.models";
import { MetricsModel } from "../../models/metrics.model";
import { DecksModel } from "../../models/decks.model";
import { DatabaseError, ForeignKeyConstraintError, Model, UniqueConstraintError, ValidationError } from "sequelize";
import { SummariesModel } from "../../models/summaries.model";
import { SessionModel } from "../../models/session.model";

class UserRepository {

  rand(): string{
    return Math.random().toString(32).substring(2); // remove `0.`
  }
  genPassword(): string{
      return this.rand() + this.rand() as string;
  }

  async createUser (username: string, email: string, password: string): Promise<Model> {
    try {
      const isUserCreated = await UserModel.create({
        username: username,
        email: email,
        password: password
      });

      if (!isUserCreated) throw new Error("User not created !");

      return isUserCreated;
    } catch (error) {
      if (error instanceof ValidationError){
        console.log(error.message);
        throw new Error(`Validation Error: ${error.errors[0].message}`);
      } else if (error instanceof UniqueConstraintError){
        throw new Error(error.errors[0].message);
      } else if (error instanceof ForeignKeyConstraintError){
        throw new Error(`Foreing Key Error: ${error.message}`);
      } else if (error instanceof DatabaseError) {
        throw new Error(`Internal Error: ${error.message}`);
      } else {

        throw new Error(`Internal Error: ${error}`);
      }
    }
  };
    
  async updateUser (username: string, email: string, password: string): Promise<void> {

    const isUserUpdated = await UserModel.create({
      username: username,
      email: email,
      password: password
    });
        
    if (!isUserUpdated) throw new Error("User not created !");

  };

  async getUserAndMetrics (username: string): Promise<Model> {
    const userInfo = await UserModel.findOne({
      where: {
        username: username
      },
      include: [MetricsModel]
    });
     
    if (!userInfo) throw new Error("User not found !");
     
    return userInfo;
  }

  async getAllUserInfoByUserName (username: string): Promise<Model> {
    const userInfo = await UserModel.findOne({
      where: {
        username: username
      },
      include: [SessionModel, MetricsModel, DecksModel, SummariesModel]
    });
     
    if (!userInfo) throw new Error("User not found !");
     
    return userInfo;
  };

  async getAllUserInfoByUserEmail (email: string): Promise<Model> {
    const userInfo = await UserModel.findOne({
      where: {
        email: email
      },
      include: [SessionModel, MetricsModel, DecksModel, SummariesModel]
    });
        
    if (!userInfo) throw new Error("User not found !");
        
    return userInfo;
  };

  async getOnlyUserByUsername (username: string): Promise<Model[]> {
    const user = await UserModel.findAll({
      where:{
        username: username
      }
    });
        
    return user;
  }

  async getOnlyUser (): Promise<Model[]> {
    const user = await UserModel.findAll();
          
    return user;
  }

  async getUserById (userId: string): Promise<Model | null> {
    const user = await UserModel.findByPk(userId);

    return user;
  }

  async deleteUser (username: string): Promise<void> {
    await UserModel.destroy({
      where: {
        username: username
      },
      cascade: true
    });
    
  };


  async resetPassword(email: string): Promise<void> {
    const user = await UserModel.findOne({
        where: {
            email: email
        }
    });
    

    if(user){
        const newPass = this.genPassword()
        //const hashPass = await hashPassword(newPass)
        user.set({password: newPass})
        await user.save()

        const SibApiV3Sdk = require('sib-api-v3-sdk');
        let defaultClient = SibApiV3Sdk.ApiClient.instance;

        let apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = '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';

        let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

        sendSmtpEmail.subject = "Password Recover Study.io";
        sendSmtpEmail.htmlContent = "<html><body><h1>Hi! You sent a request to recover your password.\n This is your new passowrd: "+newPass+"</h1></body></html>";
        sendSmtpEmail.sender = {"name":"Study IO","email":"no-reply@study.io"};
        sendSmtpEmail.to = [{"email":user.get("email"),"name":user.get("name")}];

        apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data: any) {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        }, function(error: any) {
        console.error(error);
        })
    }
}

}

export default new UserRepository;
