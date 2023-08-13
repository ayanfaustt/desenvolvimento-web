import { Model } from "sequelize/types/model";
import TagRepository from "../database/repositories/TagRepository";

class TagService {
  
  async create(userId: string, tagName: string): Promise<void> {

    await TagRepository.create(userId, tagName);
  }

  async list(userId: string): Promise<Model[]> {

    const deck = await TagRepository.list(userId);

    return deck;
  }

  async delete(tagId: string): Promise<void> {
		
    await TagRepository.delete(tagId);
  }

}

export default new TagService;