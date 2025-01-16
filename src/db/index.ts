/* import pg from "pg"; */
import "dotenv/config";
import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user.model";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL not found");
}

export const db = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  models: [User],
  logging: true,
});
