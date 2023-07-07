import { DataTypes } from "sequelize";
import { db } from "../database/db";
import { TagsModel } from "./tags.model";
import { UserModel } from "./user.models";


export const SummariesModel = db.define("summaries", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    summarie_name:{
        type: DataTypes.STRING(200),
        allowNull: false
    },
    summarie_content:{
        type: DataTypes.TEXT,
        allowNull: true
    }
},{
    timestamps: false,
});

TagsModel.hasMany(SummariesModel);
