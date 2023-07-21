import { DataTypes } from "sequelize";
import { db } from "../database/db";

export const FavoriteModel = db.define("favorites", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    favorite_name:{
        type: DataTypes.STRING(255),
        allowNull: false
    }

});




