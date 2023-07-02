import express from "express";
import UserController from "./controllers/userController";

export const router = express.Router();


router.post('/createUser/:username', UserController.createUser);
router.get("/:username", UserController.getUser);
router.post("/metrics/:userId", UserController.updateMetrics)