import { Model } from "sequelize";
import { CardsModel } from "../../models/cards.model";



export const createCard = async (deckId: string, cardName: string, cardContent: string): Promise<void> => {

    const isCardCreated = await CardsModel.create({
        deckId: deckId,
        card_name: cardName,
        card_content: cardContent
    });

    if(!isCardCreated) throw new Error("Card can not be created !")
};

export const getCard = async (cardId: string): Promise<Model> => {
    const card = await CardsModel.findOne({
        where: {
            id : cardId
        }
    });

    if(!card) throw new Error("Card not found !");

    return card;
};

export const getCards = async (cardId: string): Promise<Model[]> => {
    const cards = await CardsModel.findAll({
        where: {
            id : cardId
        }
    });

    if(!cards) throw new Error("Cards not found !");

    return cards;
};


export const deleteCard = async (cardId: string): Promise<void> =>{
    try {
        await CardsModel.destroy({
            where: {
                id: cardId
            },
        });
    } catch (error) {
        throw new Error("The operation can not be completed !")
    }
};