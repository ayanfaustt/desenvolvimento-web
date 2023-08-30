import bcrypt from "bcrypt";
import { Model } from "sequelize";
import UserRepository from "../database/repositories/UserRepository";
import MetricRepository from "../database/repositories/MetricRepository";
import MetricsService from "./MetricsService";
import { NotFoundError } from "../expcetions/NotFound";
import { AlreadyExistError } from "../expcetions/AlreadyExistError";
import { UserErrorMessages } from "../expcetions/messages";

class UserServices {
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (!hashedPassword) throw new Error(UserErrorMessages.USER_PASSWORD);
    return hashedPassword as string;
  }

  private async userCheck(username?: string, email?: string): Promise<boolean>{

    if(username){
      const isAlreadyExistByUsername = await UserRepository.getAllUserInfoByUserName(username);
	
      if (isAlreadyExistByUsername) 
        throw new AlreadyExistError(UserErrorMessages.USER_USERNAME_USED);
    }

    if(email){
      const isAlreadyExistByEmail = await UserRepository.getAllUserInfoByUserEmail(email);

      if(isAlreadyExistByEmail)
        throw new AlreadyExistError(UserErrorMessages.USER_EMAIL_USED);
    }

    return true;

  }

  async comparePassword(input: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(input, hash);
    return isValid;
  }

  async createUser(
    username: string,
    email: string,
    password: string,
    image?: string
  ): Promise<void> {

    await this.userCheck(username, email);

    const hash = await this.hashPassword(password);
    const isUserCreated = await UserRepository.createUser(
      username,
      email,
      hash,
      image
    );

    const date = new Date();
    await MetricRepository.createMetrics(
      isUserCreated.getDataValue("id"),
      0,
      0,
      0,
      date.toDateString(),
    );
  }

  async updateUser(
    userId: string,
    username?: string,
    email?: string,
    password?: string,
    image?: string
  ): Promise<void> {
		
    if(username  || email)
      await this.userCheck(username, email);

    let hash;

    if(password)
    	hash = await this.hashPassword(password);

    await UserRepository.updateUser(
      userId,
      username,
      email,
      hash,
      image
    );

  }

  async getUserAndMetrics(username: string): Promise<Model> {
    const userInfo = await UserRepository.getUserAndMetrics(username);
    if (!userInfo)
      throw new NotFoundError(UserErrorMessages.USER_NOT_FOUND);
    
    const metrics = userInfo.getDataValue("metrics") as Model[];
    const result = MetricsService.getCurrentMetrics(metrics);

    userInfo.setDataValue("metrics", result);


    return userInfo;
  }

  async getUserById(userId: string): Promise<Model>{
    
    const user = await UserRepository.getUserById(userId);

    if(!user) 
      throw new NotFoundError(UserErrorMessages.USER_NOT_FOUND);

    return user;
  }

  async getAllUserInfoByUserName (username: string): Promise<Model> {
    const userInfo = await UserRepository.getAllUserInfoByUserName(
      username,
    );

    if (!userInfo) throw new Error(UserErrorMessages.USER_NOT_FOUND);

    return userInfo;
  };

  async getAllUserInfoByUserEmail(email: string): Promise<Model> {
    const userInfo = await UserRepository.getAllUserInfoByUserEmail(
      email,
    );

    if (!userInfo) throw new Error(UserErrorMessages.USER_NOT_FOUND);

    return userInfo;
  }

  async getOnlyUsersByUsername(username: string): Promise<Model[]> {
    const users = await UserRepository.getOnlyUserByUsername(username);

    return users;
  }

  async getOnlyUsers(): Promise<Model[]> {
    const users = await UserRepository.getOnlyUser();

    return users;
  }

  async deleteUser(username: string): Promise<void> {
    await UserRepository.deleteUser(username);
  }
}

export default new UserServices();
