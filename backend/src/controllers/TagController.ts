import { Response, Request } from "express";
import { Model } from "sequelize";
import {
  createTag as createTagRepository,
  deleteTag as deleteTagRepository,
  listTags as listTagsRepository
} from "../database/repositories/tagRepository";


class TagController {
    
  /**
     * @description List all user's tag (for decks and summaries).
     * @param {string} userId - (string) req.params the user id;
     * @returns return a list with all users tag and status code.
     */
  async listTags (req: Request, res: Response): Promise<Response<Model[]>> {
    try {
      const { userId: id } = req.params;

      const deck = await listTagsRepository(id);

      return res.status(200).send(deck);
    } catch (error) {
      if(error instanceof Error ) return res.status(400).send({message: error.message});

      return res.status(400).send({message: error});
    }
  }
  /**
     * @description Create an user tag (for decks and summaries).
     * @param {string} userId - (string) req.params the user id;
     * @param {string} tagName - (string) req.body the tag name;
     * @returns return a message with status code.
     */
  async createTag (req: Request, res: Response): Promise<Response> {
    try {
      const { userId: id } = req.params;
      const { tagName } = req.body;

      await createTagRepository(id, tagName); 

      return res.status(200).send({message: "Tag created !"});
    } catch (error) {
      if (error instanceof Error) return res.status(400).send({messege: error.message});

      return res.status(400).send({message: error});
            
    }
  }

  /**
     * @description Delete an user tag (for decks and summaries).
     * @param {string} tagId - (string) req.params the tag id;
     * @returns return a message with status code.
     */
  async deleteTag (req: Request, res: Response): Promise<Response> {
    try {
      const { tagId: id } = req.params;

      await deleteTagRepository(id);

      return res.status(200).send({message: "Tag deleted !"});
    } catch (error) {
      if (error instanceof Error) return res.status(400).send({message: error.message});
            
      return res.status(400).send({message: error});
    }
  }
}

export default new TagController;