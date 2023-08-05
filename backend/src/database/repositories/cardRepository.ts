import { Model } from "sequelize";
import { CardsModel } from "../../models/cards.model";



export const createCard = async (deckId: string, cardName: string, cardContent: string): Promise<void> => {

  const isCardCreated = await CardsModel.create({
    deckId: deckId,
    card_name: cardName,
    card_content: cardContent
  });

  if(!isCardCreated) throw new Error("Card can not be created !");
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

export const listCards = async (deckId: string): Promise<Model[]> => {
  try{
    const cards = await CardsModel.findAll({
      where:{
        deckId: deckId
      }
    });

    return cards;
  }catch (error) {
    throw new Error("The operation can not be completed !");
  }
};

export const updateCard = async (deckId: string, cardName: string, cardContent: string): Promise<void> =>{
  try {
    await CardsModel.update(
      {
        card_name: cardName,
        card_content: cardContent    
      },{
        where: {
          deckId: deckId
        }
      });
  } catch (error) {
    throw new Error("The operation can not be completed !");
  }
};

export const deleteCard = async (cardId: string): Promise<void> =>{
  try {
    await CardsModel.destroy({
      where: {
        id: cardId
      },
    });
  } catch (error) {
    throw new Error("The operation can not be completed !");
  }
};