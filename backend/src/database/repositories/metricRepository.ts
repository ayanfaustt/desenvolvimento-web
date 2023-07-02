import { db } from "../db";
import { UserModel } from "../../models/user.models";
import { MetricsModel } from "../../models/metrics.model";
import { DecksModel } from "../../models/decks.model";
import { Model } from "sequelize";


export const createMetrics =async (user_id: string, reviews: number, last_login: Date): Promise<void> => {
    
    const newDate = new Date(last_login)
    console.log(newDate)

    const metric = await MetricsModel.create({
        user_id: user_id,
        reviews: reviews,
        last_login: newDate
    });

    if(!metric) throw new Error("Can not update the user metrics");
};

