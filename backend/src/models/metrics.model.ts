import { DataTypes } from "sequelize";
import { db } from "../database/db";
import { UserModel } from "./user.models";

export const MetricsModel = db.define("metrics", {
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
    reviews:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    decks_reviews:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    summaries_reviews:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    metrics_date:{
        type: DataTypes.DATE,
    }
});