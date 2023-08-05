import { Model } from "sequelize";
import { DecksModel } from "../../models/decks.model";
import { CardsModel } from "../../models/cards.model";
import { TagsModel } from "../../models/tags.model";

class DeckRepository{
  
  async create(userId: string, deckName: string, tagId?: string): Promise<void> {

    const isDeckCreated = await DecksModel.create({
		  userId: userId,
		  deck_name: deckName,
		  tagId: tagId
    });
	  
    if(!isDeckCreated) throw new Error("Deck can not be created !");
	  };

  async get (deckId: string): Promise<Model> {
    const deck = await DecksModel.findOne({
      where: {
        id : deckId
      },
      include: [CardsModel,  TagsModel]
    });
		
    if(!deck) throw new Error("Deck not found !");
		
    return deck;
  };

  async list (userId: string): Promise<Model[]> {
    try{
      const deck = await DecksModel.findAll({
        where: {
          userId : userId
        },
        include: [TagsModel]
      });
	
      return deck;
    } catch (error) {
      throw new Error("The operation can not be completed !");
    }
  };

  async listByTag (userId: string, tagId: string): Promise<Model[]> {
    try {
      const decks = await DecksModel.findAll({
        where:{
          userId: userId,
          tagId: tagId
        },
        include: [TagsModel]
      });
	
      return decks;
    } catch (error) {
      throw new Error("The operation can not be completed !");
    }
  };
	
  async update (deckId: string, deckName: string, tagId?: string): Promise<void> {
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
  };
	
  async delete (deckId: string): Promise<void> {
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
	
}

export default new DeckRepository;