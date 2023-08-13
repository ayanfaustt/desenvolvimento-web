import { Model } from "sequelize";
import { CardsModel } from "../../models/cards.model";

class CardRepository{

  async create (deckId: string, cardName: string, cardContent: string): Promise<void> {

    await CardsModel.create({
		  deckId: deckId,
		  card_name: cardName,
		  card_content: cardContent
    });
	  
  };

  async get (cardId: string): Promise<Model | null> {
    const card = await CardsModel.findOne({
      where: {
        id : cardId
      }
    });
	
    return card;
  };

  async list (deckId: string): Promise<Model[]> {

    const cards = await CardsModel.findAll({
      where:{
        deckId: deckId
      }
    });
	
    return cards;
  };

  async update (cardId: string, cardName: string, cardContent: string): Promise<void> {

    await CardsModel.update(
      {
        card_name: cardName,
        card_content: cardContent    
      },{
        where: {
          id: cardId
        }
      });

  };

  async delete (cardId: string): Promise<void> {

    await CardsModel.destroy({
      where: {
        id: cardId
      },
    });

  };
	
}

export default new CardRepository;
