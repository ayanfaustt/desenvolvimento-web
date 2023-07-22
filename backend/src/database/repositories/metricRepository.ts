import { db } from "../db";
import { UserModel } from "../../models/user.models";
import { MetricsModel } from "../../models/metrics.model";
import { DecksModel } from "../../models/decks.model";
import { Model } from "sequelize";


export const createMetrics = async (user_id: string, reviews: number, decks_reviews: number, summaries_reviews: number, metrics_date: string): Promise<void> => {
    
    const newDate = new Date(metrics_date)
    console.log(newDate)

    const metric = await MetricsModel.create({
        userId: user_id,
        reviews: reviews,
        decks_reviews: decks_reviews,
        summaries_reviews: summaries_reviews,
        metrics_date: newDate
    });

    if(!metric) throw new Error("Can not update the user metrics");
};

