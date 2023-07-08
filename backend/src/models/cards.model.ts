import { DataTypes } from "sequelize";
import { db } from "../database/db";
import { DecksModel } from "./decks.model";

export const CardsModel = db.define("cards", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    card_name:{
        type: DataTypes.STRING(200),
        allowNull: false
    },
    card_content:{
        type: DataTypes.TEXT,
        allowNull: true
    }
},{
    timestamps: false,
});
