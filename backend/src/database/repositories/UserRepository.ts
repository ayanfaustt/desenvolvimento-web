import { Model } from "sequelize";
import { DecksModel } from "../../models/decks.model";
import { MetricsModel } from "../../models/metrics.model";
import { SummariesModel } from "../../models/summaries.model";
import { UserModel } from "../../models/user.models";
import bcrypt from "bcrypt";

class UserRepository {
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (!hashedPassword) {
      throw new Error("Failed to hash password.");
    }
    return hashedPassword as string;
  };

  async createUser (username: string, email: string, password: string, image?: string): Promise<Model> {
    const isUserCreated = await UserModel.create({
      username: username,
      email: email,
      password: password,
      image: image
    });

    return isUserCreated;
  };
    
  async updateUser (userId: string, username?: string, email?: string, password?: string, image?: string): Promise<void> {
    await UserModel.update({
      username: username,
      email: email,
      password: password,
      image: image
    },{
      where: {
        id: userId
      }
    });

  };
  
  async username(userId: string, newUsername: string): Promise<void> {

    await UserModel.update(
      {
        username: newUsername
      },{
        where: {
          id: userId
        }
      });
  };

  async updatePassword(userId: string, newPassword: string): Promise<void> {

    const hashPassword = await this.hashPassword(newPassword); // Assuming you have a hashPassword method similar to your UserServices class

    await UserModel.update(
      {
        password: hashPassword,
      },
      {
        where: {
          id: userId,
        },
      }
    );
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
      include: [ MetricsModel, DecksModel, SummariesModel]
    });
     
    return userInfo;
  };

  async getAllUserInfoByUserEmail (email: string): Promise<Model | null> {
    const userInfo = await UserModel.findOne({
      where: {
        email: email
      },
      include: [ MetricsModel, DecksModel, SummariesModel]
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