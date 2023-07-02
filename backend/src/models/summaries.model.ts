import { DataTypes } from "sequelize";
import { db } from "../database/db";


export const SummariesModel = db.define("summaries", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    summarie_name:{
        type: DataTypes.STRING(200),
        allowNull: false
    },
    summarie_content:{
        type: DataTypes.TEXT,
        allowNull: true
    }
});