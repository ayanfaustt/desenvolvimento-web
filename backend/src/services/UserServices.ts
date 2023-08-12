import bcrypt from "bcrypt";
import { Model } from "sequelize";
import UserRepository from "../database/repositories/UserRepository";
import MetricRepository from "../database/repositories/MetricRepository";
import MetricsService from "./MetricsService";

class UserServices {
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (!hashedPassword) throw new Error("Internal error");
    return hashedPassword as string;
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
    const isAlreadyExist = await UserRepository.getOnlyUserByUsername(
      username,
    );

    if (!isAlreadyExist) throw new Error("User already exist !");

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
    try {
      const isAlreadyExist = await UserRepository.getOnlyUserByUsername(
        username,
      );

      if (!isAlreadyExist) throw new Error("User not found !");

      const hash = await this.hashPassword(password);
      const isUserUpdated = UserRepository.createUser(
        username,
        email,
        hash,
      );

      if (!isUserUpdated) throw new Error("User not created !");
    } catch (error) {
      throw new Error();
    }
  }

  async getUserAndMetrics(username: string): Promise<Model> {
    try {
      const userInfo = await UserRepository.getUserAndMetrics(username);
      const metrics = userInfo.getDataValue("metrics") as Model[];
      const result = MetricsService.getCurrentMetrics(metrics);

      userInfo.setDataValue("metrics", result);

      if (!userInfo) throw new Error("User not found !");

      return userInfo;
    } catch (error) {
      throw new Error();
    }
  }

  getAllUserInfoByUserName = async (username: string): Promise<Model> => {
    try {
      const userInfo = await UserRepository.getAllUserInfoByUserName(
        username,
      );

      if (!userInfo) throw new Error("User not found !");

      return userInfo;
    } catch (error) {
      throw new Error();
    }
  };

  async getAllUserInfoByUserEmail(email: string): Promise<Model> {
    try {
      const userInfo = await UserRepository.getAllUserInfoByUserEmail(
        email,
      );

      if (!userInfo) throw new Error("User not found !");

      return userInfo;
    } catch (error) {
      throw new Error();
    }
  }

  async getOnlyUsersByUsername(username: string): Promise<Model[]> {
    try {
      const users = await UserRepository.getOnlyUserByUsername(username);

      return users;
    } catch (error) {
      throw new Error();
    }
  }

  async getOnlyUsers(): Promise<Model[]> {
    try {
      const users = await UserRepository.getOnlyUser();

      return users;
    } catch (error) {
      throw new Error();
    }
  }

  async deleteUser(username: string): Promise<void> {
    try {
      await UserRepository.deleteUser(username);
    } catch (error) {
      throw new Error("The operation can not be completed !");
    }
  }
}

export default new UserServices();
