import {DataTypes} from "sequelize";
import { db } from "../database/db";
import { MetricsModel } from "./metrics.model";
import { DecksModel } from "./decks.model";
import { SummariesModel } from "./summaries.model";
import { TagsModel } from "./tags.model";
import { FavoriteModel } from "./favorite.model";

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

UserModel.hasMany(DecksModel);
DecksModel.belongsTo(UserModel);

UserModel.hasMany(SummariesModel);

UserModel.hasMany(MetricsModel);

UserModel.hasMany(FavoriteModel);
FavoriteModel.belongsTo(UserModel);

UserModel.hasMany(TagsModel);
TagsModel.belongsTo(UserModel);

SummariesModel.belongsTo(UserModel);
