import { Model } from "sequelize";
import { DecksModel } from "../../models/decks.model";
import { CardsModel } from "../../models/cards.model";



export const createDeck = async (userId: string, deckName: string, tagId?: string): Promise<void> => {

    const isDeckCreated = await DecksModel.create({
        userId: userId,
        deck_name: deckName,
        tagId: tagId
    });

    if(!isDeckCreated) throw new Error("Deck can not be created !");
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

export const listDecks = async (userId: string): Promise<Model[]> => {
    try{
        const deck = await DecksModel.findAll({
                where: {
                    userId : userId
                }
            });

        return deck;
    } catch (error) {
        throw new Error("The operation can not be completed !");
    }
};

export const updateDeck =async (deckId: string, deckName: string, tagId?: string): Promise<void> => {
    try {
        await DecksModel.update(
        {
            deck_name: deckName,
            tagId: tagId
        },{
            where: {
                id: deckId
            }
        });
    } catch (error) {
        throw new Error("The operation can not be completed !");
    }
}

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
        throw new Error("The operation can not be completed !");
    }
};