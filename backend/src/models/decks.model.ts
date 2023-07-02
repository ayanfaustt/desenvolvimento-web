import { DataTypes } from "sequelize";
import { db } from "../database/db";

export const DecksModel = db.define("decks", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deck_name:{
        type: DataTypes.STRING(200),
        allowNull: false
    }
});

