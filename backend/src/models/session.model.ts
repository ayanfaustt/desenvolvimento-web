import { DataTypes } from "sequelize";
import { db } from "../database/db";
import { DecksModel } from "./decks.model";
import { SummariesModel } from "./summaries.model";
import { UserModel } from "./user.models";

export const SessionModel = db.define("session", {
    web_session: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    mob_session: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
});