import { Model } from "sequelize";
import { DecksModel } from "../../models/decks.model";
import { CardsModel } from "../../models/cards.model";



export const createDeck = async (userId: string, deckName: string, tagId?: string): Promise<void> => {

    const isDeckCreated = await DecksModel.create({
        userId: userId,
        deck_name: deckName,
        tagId: tagId
    });

    if(!isDeckCreated) throw new Error("Deck can not be created !")
};

export const getDeck = async (deckId: string): Promise<Model> => {
    const deck = await DecksModel.findOne({
        where: {
            id : deckId
        },
        include: [CardsModel]
    });

    if(!deck) throw new Error("Deck not found !");

    return deck;
};

export const deleteDeck = async (deckId: string): Promise<void> =>{
    try {
        await DecksModel.destroy({
            where: {
                id: deckId
            },
            cascade: true,
            truncate: true
        });
    } catch (error) {
        throw new Error("The operation can not be completed !")
    }
};