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
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deck_name:{
        type: DataTypes.STRING(200),
        allowNull: false
    }
});

DecksModel.hasMany(CardsModel, {
    foreignKey: "deck_id",
    sourceKey: "id"
});

DecksModel.belongsToMany(TagsModel, {
    through: "deckTags"
});
CardsModel.belongsTo(DecksModel);

TagsModel.belongsToMany(DecksModel,{
    through: "deckTags"
});
