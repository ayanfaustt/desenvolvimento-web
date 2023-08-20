import { Model } from "sequelize";
import { DecksModel } from "../../models/decks.model";
import { MetricsModel } from "../../models/metrics.model";
import { SessionModel } from "../../models/session.model";
import { SummariesModel } from "../../models/summaries.model";
import { UserModel } from "../../models/user.models";

class UserRepository {
  async createUser (username: string, email: string, password: string, image?: string): Promise<Model> {
    const isUserCreated = await UserModel.create({
      username: username,
      email: email,
      password: password,
      image: image
    });

    return isUserCreated;
  };
    
  async updateUser (username: string, email: string, password: string, image?: string): Promise<void> {
    await UserModel.create({
      username: username,
      email: email,
      password: password,
      image: image
    });

  };

  async getUserAndMetrics (username: string): Promise<Model | null> {
    const userInfo = await UserModel.findOne({
      where: {
        username: username
      },
      include: [MetricsModel]
    });
     
    return userInfo;
  }

  async getAllUserInfoByUserName (username: string): Promise<Model | null> {
    const userInfo = await UserModel.findOne({
      where: {
        username: username
      },
      include: [SessionModel, MetricsModel, DecksModel, SummariesModel]
    });
     
    return userInfo;
  };

  async getAllUserInfoByUserEmail (email: string): Promise<Model | null> {
    const userInfo = await UserModel.findOne({
      where: {
        email: email
      },
      include: [SessionModel, MetricsModel, DecksModel, SummariesModel]
    });
        
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
}

export default new UserRepository;
