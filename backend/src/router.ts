import express from "express";
import UserController from "./controllers/userController";

export const router = express.Router();

router.get("/user/:username", UserController.getUser);
router.post('/user/create/:username', UserController.createUser);

router.post("/metrics/:userId", UserController.updateMetrics);

//summaries
router.get("/summaries/:userId", UserController.getSummaries);
router.post("/summaries/create/:userId", UserController.createSummarie);
router.delete("/summaries/delete/:summarieId", UserController.deleteSummarie);

//decks
router.get("/decks/:deckId", UserController.getDeck);
router.post("/decks/create/:userId", UserController.createDeck);
router.delete("/decks/delete/:deckId", UserController.deleteDeck);


//TODO test all endpoints
//cards
router.get("/cards/:deckId", UserController.getCard);
router.get("/cards/list/:deckId", UserController.listCards);
router.post("/cards/create/:deckId", UserController.createCard);
router.delete("/cards/delete/:deckId", UserController.deleteCard);


//TODO test all endpoints
//Tags
router.get("/tags/list/:userId", UserController.listCards);
router.post("/tags/create/:deckId", UserController.createCard);
router.delete("/tags/delete/:deckId", UserController.deleteCard);