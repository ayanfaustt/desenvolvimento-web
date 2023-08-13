import express from "express";
import UserController from "./controllers/UserController";
import TagController from "./controllers/TagController";
import DeckController from "./controllers/DeckController";
import SummarieController from "./controllers/SummarieController";
import CardController from "./controllers/CardController";
import SessionController from "./controllers/SessionController";
import MetricsController from "./controllers/MetricsController";
import userController from "./controllers/UserController";
import OpenAIController from "./controllers/OpenAIController";
// import StudyMaterialController from "./controllers/StudyMaterialController";

export const router = express.Router();

// user

router.get("/user/:username", UserController.getAllUserInfo);
router.get("/user/metrics/:username", userController.getUserWithMetrics);
router.post("/user/create/:username", UserController.createUser);
router.post("/user/update/:userId", UserController.updateUser);

// session
router.post("/session/login", SessionController.login);

//metrics
router.post("/metrics/update/decks/:userId", MetricsController.updateDecksMetrics);
router.post("/metrics/update/summaries/:userId", MetricsController.updatedSummariesMetrics);

//summaries
router.get("/summaries/:summarieId", SummarieController.get);
router.get("/summaries/list/:userId", SummarieController.list);
router.get("/summaries/listByTag/:userId", SummarieController.listByTag);
router.put("/summaries/update/:summarieId", SummarieController.update);
router.post("/summaries/create/:userId", SummarieController.create);
router.delete("/summaries/delete/:summarieId", SummarieController.delete);

//decks
router.get("/decks/:deckId", DeckController.get);
router.get("/decks/list/:userId", DeckController.list);
router.get("/decks/listByTag/:userId", DeckController.listByTag);
router.post("/decks/create/:userId", DeckController.create);
router.put("/decks/update/:deckId", DeckController.update);
router.delete("/decks/delete/:deckId", DeckController.delete);

//Study Materials
// router.get("/studyMaterials/", StudyMaterialController.getStudyMaterial);

//cards
router.get("/cards/:cardId", CardController.get);
router.get("/cards/list/:deckId", CardController.list);
router.post("/cards/create/:deckId", CardController.create);
//for now the update card does not contains the Chatgpt option
router.put("/cards/update/:cardId", CardController.update);
router.delete("/cards/delete/:cardId", CardController.delete);

//Tags
router.get("/tags/list/:userId", TagController.list);
router.post("/tags/create/:userId", TagController.create);
router.delete("/tags/delete/:tagId", TagController.delete);

//OpenAi
router.post("/openai/create/card", OpenAIController.createCard);
router.post("/openai/create/summarie", OpenAIController.createSummarie);
router.post("/openai/create/materials", OpenAIController.createMaterial);
