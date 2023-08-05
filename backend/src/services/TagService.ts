import { Model } from "sequelize/types/model";
import TagRepository from "../database/repositories/TagRepository";

class TagService {
  
  async create(userId: string, tagName: string): Promise<void> {
    try {
      await TagRepository.create(userId, tagName);
    } catch (error) {
      throw new Error();
    }
  }

  async list(userId: string): Promise<Model[]> {
    try {
      const deck = await TagRepository.list(userId);

      return deck;
    } catch (error) {
      throw new Error();
    }
  }

  async delete(tagId: string): Promise<void> {
    try {
      await TagRepository.delete(tagId);
    } catch (error) {
      throw new Error();
    }
  }
}

export default new TagService;