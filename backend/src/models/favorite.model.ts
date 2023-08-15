import { DataTypes } from "sequelize";
import { db } from "../database/db";

export const FavoriteModel = db.define("favorites", {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name:{
    type: DataTypes.STRING(255),
    allowNull: false
  },
  type:{
    type: DataTypes.STRING(50),
    allowNull: false
  },
  author:{
    type: DataTypes.STRING(50),
    allowNull: false
  },
  description:{
    type: DataTypes.STRING(500),
    allowNull: false
  }

});




