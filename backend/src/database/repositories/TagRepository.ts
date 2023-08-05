import { Model } from "sequelize";
import {TagsModel } from "../../models/tags.model";

class TagRepository{
  async create (userId: string, tag_name: string): Promise<void> {
	
    const isTagCreated = await TagsModel.create({
		  userId: userId,
		  tag_name: tag_name ,
    });
	  
    if(!isTagCreated) throw new Error("The Tag can not be created !");
  };
	  
  async list (userId: string): Promise<Model[]> {
    try{
      const deck = await TagsModel.findAll({
        where: {
          userId : userId
        }
      });
		
      return deck;
    } catch (error) {
      throw new Error("The operation can not be completed !");
    }
  };
	  
  async delete (tagId: string): Promise<void> {
    try {
		  await TagsModel.destroy({
        where: {
			  id: tagId
        },
		  });
    } catch (error) {
		  throw new Error("The operation can not be completed !");
    }
  };
}

export default new TagRepository;
