import express from "express";
import UserController from "./controllers/userController";
import TagController from "./controllers/TagController";
import DeckController from "./controllers/DeckController";
import SummarieController from "./controllers/SummarieController";
import CardController from "./controllers/CardController";
import SessionController from "./controllers/SessionController";
import MetricsController from "./controllers/MetricsController";
import userController from "./controllers/userController";
import StudyMaterialController from "./controllers/StudyMaterialController";

export const router = express.Router();

// user

router.get("/user/:username", UserController.getAllUserInfo);
router.get("/user/metrics/:username", userController.getUserWithMetrics);
router.post('/user/create/:username', UserController.createUser);
router.post("/user/update/:userId", UserController.updateUser)

//metrics
router.post("/metrics/update/decks/:userId", MetricsController.updateDecksMetrics);
router.post("/metrics/update/summaries/:userId", MetricsController.updatedSummariesMetrics);

//summaries
router.get("/summaries/:userId", SummarieController.getSummaries);
router.get("/summaries/list/:userId", SummarieController.listSummaries);
router.get("/summaries/listByTag/:userId", SummarieController.listSummariesByTag);
router.put("/summaries/update/:summarieId", SummarieController.updateSummarie);
router.post("/summaries/create/:userId", SummarieController.createSummarie);
router.delete("/summaries/delete/:summarieId", SummarieController.deleteSummarie);

//decks
router.get("/decks/:deckId", DeckController.getDeck);
router.get("/decks/list/:userId", DeckController.listDeck);
router.get("/decks/listByTag/:userId", DeckController.listDecksByTag);
router.post("/decks/create/:userId", DeckController.createDeck);
router.put("/decks/update/:deckId", DeckController.updateDeck);
router.delete("/decks/delete/:deckId", DeckController.deleteDeck);

//Study Materials
router.get("/studyMaterials/", StudyMaterialController.getStudyMaterial);

//cards
router.get("/cards/:deckId", CardController.getCard);
router.get("/cards/list/:deckId", CardController.listCards);
router.post("/cards/create/:deckId", CardController.createCard);
//for now the update card does not contains the Chatgpt option
router.put("/cards/update/:deckId", CardController.updateCard);
router.delete("/cards/delete/:deckId", CardController.deleteCard);


//TODO test all endpoints
//Tags
router.get("/tags/list/:userId", TagController.listTags);
router.post("/tags/create/:userId", TagController.createTag);
router.delete("/tags/delete/:tagId", TagController.deleteTag);

//TODO test all endpoints
//Tags
router.post("/login", SessionController.login)