import { Model } from "sequelize";
import {TagsModel } from "../../models/tags.model";

class TagRepository{
  async create (userId: string, tag_name: string): Promise<void> {
	
    await TagsModel.create({
		  userId: userId,
		  tag_name: tag_name ,
    });
	
  };
	  
  async list (userId: string): Promise<Model[]> {
  
    const deck = await TagsModel.findAll({
      where: {
        userId : userId
      }
    });
		
    return deck;

  };
	  
  async delete (tagId: string): Promise<void> {
		
    await TagsModel.destroy({
      where: {
        id: tagId
      },
    });
  };
}

export default new TagRepository;
