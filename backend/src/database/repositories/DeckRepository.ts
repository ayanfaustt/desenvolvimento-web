import { Model } from "sequelize";
import { DecksModel } from "../../models/decks.model";
import { CardsModel } from "../../models/cards.model";
import { TagsModel } from "../../models/tags.model";

class DeckRepository{
  
  async create(userId: string, deckName: string, tagId?: string): Promise<void> {

    await DecksModel.create({
		  userId: userId,
		  deck_name: deckName,
		  tagId: tagId
    });
	  
	  };

  async get (deckId: string): Promise<Model | null> {
    const deck = await DecksModel.findOne({
      where: {
        id : deckId
      },
      include: [CardsModel,  TagsModel]
    });
		
    return deck;
  };

  async list (userId: string): Promise<Model[]> {

    const deck = await DecksModel.findAll({
      where: {
        userId : userId
      },
      include: [TagsModel]
    });
	
    return deck;

  };

  async listByTag (userId: string, tagId: string): Promise<Model[]> {

    const decks = await DecksModel.findAll({
      where:{
        userId: userId,
        tagId: tagId
      },
      include: [TagsModel]
    });
	
    return decks;

  };
	
  async update (deckId: string, deckName: string, tagId?: string): Promise<void> {

    await DecksModel.update(
      {
        deck_name: deckName,
        tagId: tagId
      },{
        where: {
          id: deckId
        }
      });

  };
	
  async delete (deckId: string): Promise<void> {

    await DecksModel.destroy({
      where: {
        id: deckId
      }
    });

  };
	
}

export default new DeckRepository;
