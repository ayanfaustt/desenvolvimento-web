import { db } from "../db";
import { UserModel } from "../../models/user.models";
import { MetricsModel } from "../../models/metrics.model";
import { DecksModel } from "../../models/decks.model";
import { Model } from "sequelize";


export const createUser = async (username: string): Promise<void> => {
    
    const isAlreadyExist = await UserModel.findOne({
        where: {
            username: username
        }
    });

    if(isAlreadyExist)  throw new Error("User already exist !");
    
    const isUserCreated = await UserModel.create({
        username: username
    });

    if(!isUserCreated) throw new Error("User not created !");
};


export const getUser = async (username: string): Promise<Model> => {
    const userInfo = await UserModel.findOne({
        where:{
            username : username
        },
        include: [MetricsModel]
    });

    if(!userInfo) throw new Error("User not found !");
    
    return userInfo;
};

export const deleteUser = async (username: string): Promise<void> => {
    try{
        await UserModel.destroy({
            where: {
                username: username
            },
            cascade: true
        });
    }catch(error){
        throw new Error();
    }

};