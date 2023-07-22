import express from "express";
import { db } from "./database/db";
import cors from "cors";
import 'dotenv/config';
import { router } from "./router";
import DateObserver from "./system/DataObserver";

const server = express()
const { SERVER_PORT } = process.env;
const dateObserver = new DateObserver();
  
server.use(express.json());
server.use(cors({
    origin: "*",
    optionsSuccessStatus: 200
}));
server.use(router);

server.listen(SERVER_PORT || "3001", async () => {
    db.sync({
        alter: true
    });
    console.log(`server running in ${SERVER_PORT} port...`);
});
