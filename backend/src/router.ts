import express from "express";
import UserController from "./controllers/userController";
import TagController from "./controllers/TagController";
import DeckController from "./controllers/DeckController";
import SummarieController from "./controllers/SummarieController";
import CardController from "./controllers/CardController";
import SessionController from "./controllers/SessionController";

export const router = express.Router();

router.get("/user/:username", UserController.getUser);
router.post('/user/create/:username', UserController.createUser);

// router.post("/metrics/:userId", UserController.updateMetrics);

//summaries
router.get("/summaries/:userId", SummarieController.getSummaries);
router.get("/summaries/list/:userId", SummarieController.listSummaries);
router.post("/summaries/create/:userId", SummarieController.createSummarie);
router.delete("/summaries/delete/:summarieId", SummarieController.deleteSummarie);

//decks
router.get("/decks/:deckId", DeckController.getDeck);
router.get("/decks/list/:userId", DeckController.getDeck);
router.post("/decks/create/:userId", DeckController.createDeck);
router.delete("/decks/delete/:deckId", DeckController.deleteDeck);


//TODO test all endpoints
//cards
router.get("/cards/:deckId", CardController.getCard);
router.get("/cards/list/:deckId", CardController.listCards);
router.post("/cards/create/:deckId", CardController.createCard);
router.delete("/cards/delete/:deckId", CardController.deleteCard);


//TODO test all endpoints
//Tags
router.get("/tags/list/:userId", TagController.listTags);
router.post("/tags/create/:userId", TagController.createTag);
router.delete("/tags/delete/:tagId", TagController.deleteTag);

//TODO test all endpoints
//Tags
router.post("/login", SessionController.login)