import express from "express";
import UserController from "./controllers/userController";

export const router = express.Router();


router.post('/createUser/:username', UserController.createUser);
router.get("/:username", UserController.getUser);

router.post("/metrics/:userId", UserController.updateMetrics)

router.get("/summaries/:userId", UserController.getSummaries);
router.post("/summaries/createSummarie/:userId", UserController.createSummarie);
router.delete("/summaries/delete/:summarieId", UserController.deleteSummarie);