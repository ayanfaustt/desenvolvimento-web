import { Model } from "sequelize";
import { CardsModel } from "../../models/cards.model";

class CardRepository{

  async create (deckId: string, cardName: string, cardContent: string): Promise<void> {

    const isCardCreated = await CardsModel.create({
		  deckId: deckId,
		  card_name: cardName,
		  card_content: cardContent
    });
	  
    if(!isCardCreated) throw new Error("Card can not be created !");
  };

  async get (cardId: string): Promise<Model> {
    const card = await CardsModel.findOne({
      where: {
        id : cardId
      }
    });
	
    if(!card) throw new Error("Card not found !");
	
    return card;
  };

  async list (deckId: string): Promise<Model[]> {
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

  async update (deckId: string, cardName: string, cardContent: string): Promise<void> {
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

  async delete (cardId: string): Promise<void> {
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
	
}

export default new CardRepository;
