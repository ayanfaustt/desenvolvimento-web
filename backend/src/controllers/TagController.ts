import { Response, Request } from "express";
import { Model } from "sequelize";
import TagService from "../services/TagService";
import SessionRepository from "../database/repositories/SessionRepository";

class TagController {
  /**
	 * @description List all user's tag (for decks and summaries).
	 * @param {string} userId - (string) req.params the user id;
	 * @returns return a list with all users tag and status code.
	 */
  async list(req: Request, res: Response): Promise<Response<Model[]>> {
    try {
      const { userId: id } = req.params;
      const { userID , token, sessionType} = req.body;
      if(await SessionRepository.checkSession(userID, token, sessionType)){
        const deck = await TagService.list(id);

        return res.status(200).send(deck);}
      else{
        return res.status(489).send();
      }
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).send({ message: error.message });

      return res.status(400).send({ message: error });
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
      const { userId: id } = req.params;
      const { userID , token, sessionType, tagName} = req.body;
      if(await SessionRepository.checkSession(userID, token, sessionType)){
        await TagService.create(id, tagName);

        return res.status(200).send({ message: "Tag created !" });}
      else{
        return res.status(489).send();
      }
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).send({ messege: error.message });

      return res.status(400).send({ message: error });
    }
  }

  /**
	 * @description Delete an user tag (for decks and summaries).
	 * @param {string} tagId - (string) req.params the tag id;
	 * @returns return a message with status code.
	 */
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { tagId: id } = req.params;
      const { userID , token, sessionType} = req.body;
      if(await SessionRepository.checkSession(userID, token, sessionType)){
        await TagService.delete(id);

        return res.status(200).send({ message: "Tag deleted !" });}
      else{
        return res.status(489).send();
      }
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).send({ message: error.message });

      return res.status(400).send({ message: error });
    }
  }
}

export default new TagController();
