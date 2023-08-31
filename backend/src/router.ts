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
router.get("/user/:username",SessionController.verifySession, UserController.getAllUserInfo);
router.get("/user/metrics/:username",SessionController.verifySession, userController.getUserWithMetrics);
router.post("/user/create/:username", UserController.createUser);
router.put("/user/update/:userId",SessionController.verifySession, UserController.updateUser);
router.put("/user/username/:userID",SessionController.verifySession, UserController.updateUsername);

// session
router.post("/session/login", SessionController.login);

//metrics
router.post("/metrics/update/decks/:userId",SessionController.verifySession, MetricsController.updateDecksMetrics);
router.post("/metrics/update/summaries/:userId",SessionController.verifySession, MetricsController.updatedSummariesMetrics);

//summaries
router.get("/summaries/:summarieId",SessionController.verifySession, SummarieController.get);
router.get("/summaries/list/:userId",SessionController.verifySession, SummarieController.list);
router.get("/summaries/listByTag/:userId",SessionController.verifySession, SummarieController.listByTag);
router.put("/summaries/update/:summarieId",SessionController.verifySession, SummarieController.update);
router.post("/summaries/create/:userId",SessionController.verifySession, SummarieController.create);
router.delete("/summaries/delete/:summarieId",SessionController.verifySession, SummarieController.delete);

//decks
router.get("/decks/:deckId",SessionController.verifySession, DeckController.get);
router.get("/decks/list/:userId",SessionController.verifySession, DeckController.list);
router.get("/decks/listByTag/:userId",SessionController.verifySession, DeckController.listByTag);
router.post("/decks/create/:userId",SessionController.verifySession, DeckController.create);
router.put("/decks/update/:deckId",SessionController.verifySession, DeckController.update);
router.delete("/decks/delete/:deckId",SessionController.verifySession, DeckController.delete);

//cards
router.get("/cards/:cardId",SessionController.verifySession, CardController.get);
router.get("/cards/list/:deckId",SessionController.verifySession, CardController.list);
router.post("/cards/create/:deckId",SessionController.verifySession, CardController.create);
router.put("/cards/update/:cardId",SessionController.verifySession, CardController.update);
router.delete("/cards/delete/:cardId",SessionController.verifySession, CardController.delete);

//Tags
router.get("/tags/list/:userId",SessionController.verifySession, TagController.list);
router.post("/tags/create/:userId",SessionController.verifySession, TagController.create);
router.delete("/tags/delete/:tagId",SessionController.verifySession, TagController.delete);

//OpenAi
router.post("/openai/create/card",SessionController.verifySession, OpenAIController.createCard);
router.post("/openai/create/summarie",SessionController.verifySession, OpenAIController.createSummarie);
router.post("/openai/create/materials",SessionController.verifySession, OpenAIController.createMaterial);
router.post("/openai/favorite/create",SessionController.verifySession, OpenAIController.favorite);
router.get("/openai/favorite/list/:userId",SessionController.verifySession, OpenAIController.list);
router.delete("/openai/favorite/delete/:favoriteId",SessionController.verifySession, OpenAIController.removeFavorite);
