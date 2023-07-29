import { db } from "../db";
import { UserModel } from "../../models/user.models";
import { MetricsModel } from "../../models/metrics.model";
import { DecksModel } from "../../models/decks.model";
import { Model } from "sequelize";
import { SummariesModel } from "../../models/summaries.model";
import { SessionModel } from "../../models/session.model";

class UserRepository {
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
            throw new Error();
       }
    };
    
    async updateUser (username: string, email: string, password: string): Promise<void> {
        try {
            const isUserUpdated = await UserModel.create({
                username: username,
                email: email,
                password: password
            });
        
            if (!isUserUpdated) throw new Error("User not created !");
        } catch (error) {
            throw new Error();
        }
    };

    async getUserAndMetrics (username: string): Promise<Model> {
       try {
         const userInfo = await UserModel.findOne({
             where: {
                 username: username
             },
             include: [MetricsModel]
         });
     
         if (!userInfo) throw new Error("User not found !");
     
         return userInfo;
       } catch (error) {
            throw new Error();
       }
    }

    async getAllUserInfoByUserName (username: string): Promise<Model> {
       try {
         const userInfo = await UserModel.findOne({
             where: {
                 username: username
             },
             include: [SessionModel, MetricsModel, DecksModel, SummariesModel]
         });
     
         if (!userInfo) throw new Error("User not found !");
     
         return userInfo;
       } catch (error) {
            throw new Error();
       }
    };

    async getAllUserInfoByUserEmail (email: string): Promise<Model> {
        try {
            const userInfo = await UserModel.findOne({
                where: {
                    email: email
                },
                include: [SessionModel, MetricsModel, DecksModel, SummariesModel]
            });
        
            if (!userInfo) throw new Error("User not found !");
        
            return userInfo;
        } catch (error) {
            throw new Error();
        }
    };

    async getOnlyUserByUsername (username: string): Promise<Model[]> {
      try {
            const user = await UserModel.findAll({
                where:{
                    username: username
                }
            });
        
            return user;
      } catch (error) {
            throw new Error();
      }
    }

    async getOnlyUser (): Promise<Model[]> {
        try {
              const user = await UserModel.findAll();
          
              return user;
        } catch (error) {
              throw new Error();
        }
      }

    async deleteUser (username: string): Promise<void> {
        try {
            await UserModel.destroy({
                where: {
                    username: username
                },
                cascade: true
            });
        } catch (error) {
            throw new Error("The operation can not be completed !");
        }
    
    };
}

export default new UserRepository;