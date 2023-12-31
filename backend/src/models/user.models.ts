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
  email:{
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  } ,
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  image:{
    type: DataTypes.STRING(255),
    allowNull: true
  }
});

UserModel.hasMany(DecksModel);
DecksModel.belongsTo(UserModel);

UserModel.hasMany(SummariesModel);
SummariesModel.belongsTo(UserModel);

UserModel.hasMany(FavoriteModel);
FavoriteModel.belongsTo(UserModel);

UserModel.hasMany(TagsModel);
TagsModel.belongsTo(UserModel);

UserModel.hasMany(MetricsModel);
MetricsModel.belongsTo(UserModel);