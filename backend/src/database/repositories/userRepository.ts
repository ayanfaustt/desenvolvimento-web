import { db } from "../db";
import { UserModel } from "../../models/user.models";
import { MetricsModel } from "../../models/metrics.model";
import { DecksModel } from "../../models/decks.model";
import { Model } from "sequelize";
import { SummariesModel } from "../../models/summaries.model";
import { SessionModel } from "../../models/session.model";

export const hashPassword = async (password: string): Promise<string> => {
    const bcrypt = require('bcrypt');
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    if (!hashedPassword) throw new Error("Internal error")
    return hashedPassword as string;
}

export const comparePassword = async (input: string, hash: string): Promise<boolean> => {
    const bcrypt = require('bcrypt');
    const isValid = await bcrypt.compare(input, hash);
    return isValid;
}


export const createUser = async (username: string, email: string, password: string): Promise<void> => {

    const isAlreadyExist = await UserModel.findOne({
        where: {
            username: username
        }
    });

    if (isAlreadyExist) throw new Error("User already exist !");
    const hash = await hashPassword(password);
    const isUserCreated = await UserModel.create({
        username: username,
        email: email,
        password: hash
    });

    if (!isUserCreated) throw new Error("User not created !");
};

export const getUserAndMetrics = async (username: string): Promise<Model> => {
    const userInfo = await UserModel.findOne({
        where: {
            username: username
        },
        include: [MetricsModel]
    });

    if (!userInfo) throw new Error("User not found !");

    return userInfo;
}


export const getAllUserInfoByUserName = async (username: string): Promise<Model> => {
    const userInfo = await UserModel.findOne({
        where: {
            username: username
        },
        include: [SessionModel, MetricsModel, DecksModel, SummariesModel]
    });

    if (!userInfo) throw new Error("User not found !");

    return userInfo;
};

export const getAllUserInfoByUserEmail = async (email: string): Promise<Model> => {
    const userInfo = await UserModel.findOne({
        where: {
            email: email
        },
        include: [SessionModel, MetricsModel, DecksModel, SummariesModel]
    });

    if (!userInfo) throw new Error("User not found !");

    return userInfo;
};

export const getOnlyUser = async (): Promise<Model[]> => {
    const users = await UserModel.findAll();

    return users;
}

export const deleteUser = async (username: string): Promise<void> => {
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