import bcrypt from "bcrypt";
import { Model } from "sequelize";
import UserRepository from "../database/repositories/UserRepository";
import MetricRepository from "../database/repositories/MetricRepository";
import MetricsService from "./MetricsService";
import { NotFoundError } from "../expcetions/NotFound";
import { AlreadyExistError } from "../expcetions/AlreadyExistError";

class UserServices {
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (!hashedPassword) throw new Error("Internal error");
    return hashedPassword as string;
  }

  private async userCheck(username?: string, email?: string): Promise<boolean>{

    if(username){
      const isAlreadyExistByUsername = await UserRepository
        .getOnlyUserByUsername(username);
	
      if (isAlreadyExistByUsername) 
        throw new AlreadyExistError("There are an user with this username");
    }

    if(email){
      const isAlreadyExistByEmail = await UserRepository
        .getAllUserInfoByUserEmail(email);

      if(isAlreadyExistByEmail)
        throw new AlreadyExistError("There are an user with this email");
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
  ): Promise<void> {

    this.userCheck(username, email);

    const hash = await this.hashPassword(password);
    const isUserCreated = await UserRepository.createUser(
      username,
      email,
      hash,
    );

    if (!isUserCreated) throw new Error("User not created !");

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
    username: string,
    email: string,
    password: string,
  ): Promise<void> {
	
    this.userCheck(username, email);

    const hash = await this.hashPassword(password);
    const isUserUpdated = UserRepository.createUser(
      username,
      email,
      hash,
    );

    if (!isUserUpdated) throw new Error("User not created !");

  }

  async getUserAndMetrics(username: string): Promise<Model> {
    const userInfo = await UserRepository.getUserAndMetrics(username);
    const metrics = userInfo.getDataValue("metrics") as Model[];
    const result = MetricsService.getCurrentMetrics(metrics);

    userInfo.setDataValue("metrics", result);

    if (!userInfo) throw new Error("User not found !");

    return userInfo;
  }

  async getUserById(userId: string): Promise<Model>{
    
    const user = await UserRepository.getUserById(userId);

    if(!user) 
      throw new NotFoundError("User not found");

    return user;
  }

  async getAllUserInfoByUserName (username: string): Promise<Model> {
    const userInfo = await UserRepository.getAllUserInfoByUserName(
      username,
    );

    if (!userInfo) throw new Error("User not found !");

    return userInfo;
  };

  async getAllUserInfoByUserEmail(email: string): Promise<Model> {
    const userInfo = await UserRepository.getAllUserInfoByUserEmail(
      email,
    );

    if (!userInfo) throw new Error("User not found !");

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
