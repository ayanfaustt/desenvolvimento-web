import {DataTypes} from "sequelize";
import { db } from "../database/db";
import { MetricsModel } from "./metrics.model";
import { DecksModel } from "./decks.model";
import { SummariesModel } from "./summaries.model";

export const UserModel = db.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    } 
});

UserModel.hasMany(DecksModel, {
    foreignKey: "user_id",
    constraints: true
});

UserModel.hasMany(SummariesModel, {
    foreignKey: "user_id",
    constraints: true,
});

UserModel.hasMany(MetricsModel, {
    foreignKey: "user_id",
    sourceKey: "id"
});