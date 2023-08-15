import { DataTypes } from "sequelize";
import { db } from "../database/db";

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