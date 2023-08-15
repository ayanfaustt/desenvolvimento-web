import { DataTypes } from "sequelize";
import { db } from "../database/db";

export const TagsModel = db.define("tags", {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  tag_name:{
    type: DataTypes.STRING(50),
    allowNull: false
  }

});
