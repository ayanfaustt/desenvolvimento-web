import { Request, Response } from "express";
import { Model } from "sequelize";
import { TagErrorMessages, UserErrorMessages } from "../expcetions/messages";
import TagService from "../services/TagService";
import errorHandler from "../expcetions/returnError";

class TagController {
  /**
	 * @description List all user's tag (for decks and summaries).
	 * @param {string} userId - (string) req.params the user id;
	 * @returns return a list with all users tag and status code.
	 */
  async list(req: Request, res: Response): Promise<Response<Model[]>> {
    try {
      const { userId } = req.params;

      if(!userId)
        throw new Error(UserErrorMessages.USER_ID_NULL);

      const deck = await TagService.list(userId);

      return res.status(200).send(deck);
    } catch (error) {
      return errorHandler(error, res);
    }
  }
  /**
	 * @description Create an user tag (for decks and summaries).
	 * @param {string} userId - (string) req.params the user id;
	 * @param {string} tagName - (string) req.body the tag name;
	 * @returns return a message with status code.
	 */
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const { tagName } = req.body;

      if(!userId)
        throw new Error(UserErrorMessages.USER_ID_NULL);

      if(!tagName)
        throw new Error(TagErrorMessages.TAG_NAME_NULL);

      await TagService.create(userId, tagName);

      return res.status(200).send({ message: "Tag created !" });
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  /**
	 * @description Delete an user tag (for decks and summaries).
	 * @param {string} tagId - (string) req.params the tag id;
	 * @returns return a message with status code.
	 */
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { tagId } = req.params;

      if(!tagId)
        throw new Error(TagErrorMessages.TAG_ID_NULL);

      await TagService.delete(tagId);

      return res.status(200).send({ message: "Tag deleted !" });
    } catch (error) {
      return errorHandler(error, res);
    }
  }
}

export default new TagController();
