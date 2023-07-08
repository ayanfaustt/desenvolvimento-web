import { DataTypes } from "sequelize";
import { db } from "../database/db";
import { CardsModel } from "./cards.model";
import { UserModel } from "./user.models";
import { TagsModel } from "./tags.model";

export const DecksModel = db.define("decks", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    deck_name:{
        type: DataTypes.STRING(200),
        allowNull: false
    }
},{
    timestamps: false,
});

DecksModel.hasMany(CardsModel);

TagsModel.hasMany(DecksModel);
DecksModel.belongsTo(TagsModel)

CardsModel.belongsTo(DecksModel);
