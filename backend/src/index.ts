import express from "express";
import { db } from "./database/db";
import cors from "cors";
import 'dotenv/config';
import { router } from "./router";
import { DateObserver}  from "./system/DateObserver";

const server = express()
const { SERVER_PORT } = process.env;
  
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
    const dateObserver = new DateObserver();
    dateObserver.startObserving();
    console.log(`server running in ${SERVER_PORT} port...`);
});
