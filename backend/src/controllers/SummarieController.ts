import { Request, Response } from "express";
import { Model } from "sequelize";
import { SummarieErrorMessages, TagErrorMessages, UserErrorMessages } from "../expcetions/messages";
import errorHandler from "../expcetions/returnError";
import SummariesServices from "../services/SummariesServices";


class SummarieController {
    
  /**
    * @description Get a specific user's summarie.
    * @param {string} summarieId - req.params (string) the summarie id;
    * @returns A summarie object with status code.
    */
  async get (req: Request, res: Response): Promise<Response> {
    try {
      const { summarieId } = req.params;

      if(!summarieId)
        throw new Error(SummarieErrorMessages.SUMMARIE_ID_NULL);

      const summarie = await SummariesServices.getSummarie(summarieId);

      return res.status(200).send(summarie);
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  /**
    * @description List all user's summaries.
    * @param {string} userId - req.params (string) the user id;
    * @returns A list of summaries object with status code.
    */
  async list (req: Request, res: Response): Promise<Response<Model[]>> {
    try {
      const { userId } = req.params;

      if(!userId)
        throw new Error(UserErrorMessages.USER_ID_NULL);

      const summaries = await SummariesServices.listSummaries(userId);

      return res.status(200).send(summaries);
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  /**
    * @description List all user's summaries filltering by a tag.
    * @param {string} userId - req.params (string) the user id;
    * @param {string} tagId - req.query (string) :userId?TagId=...  the tag id;
    * @returns A list of summaries object with status code.
    */
  async listByTag(req: Request, res: Response): Promise<Response<Model[]>> {
    try {
      const { userId } = req.params;
      const { tagId } = req.query;

      if(!tagId)
        throw new Error(TagErrorMessages.TAG_ID_NULL);

      if(!userId)
        throw new Error(UserErrorMessages.USER_ID_NULL);

      const summaries = await SummariesServices.listSummariesByTag(userId, tagId.toString());

      return res.status(200).send(summaries);
    } catch (error) {
      return errorHandler(error, res);

    }
  }

  /**
    * @description Update an user's summarie.
    * @param {string} summarieId - req.params (string) the summarie id;
    * @param {string} summarieName - req.body (string) the summarie name;
    * @param {string} summarieContent - req.body (string) the summarie content;
    * @param {string} tagId - req.body (string) the tag id (optional);
    * @returns A message with status code.
    */
  async update (req: Request, res: Response): Promise<Response> {
    try {
      const {summarieId} = req.params;
      const {summarieName, summarieContent, tagId } = req.body;

      if(!summarieId)
        throw new Error(SummarieErrorMessages.SUMMARIE_ID_NULL);

      if(!summarieName)
        throw new Error(SummarieErrorMessages.SUMMARIE_NAME_NULL);

      if(!summarieContent)
        throw new Error(SummarieErrorMessages.SUMMARIE_CONTENT_NULL);

      await SummariesServices.updateSummarie(summarieId, summarieName, summarieContent, tagId);

      return res.status(200).send({message: "Summarie updated !"});
    } catch (error) {
      return errorHandler(error, res);
			
    }
  }

  /**
    * @description Create an user's summarie.
    * @param {string} userId - req.params (string) the user id;
    * @param {string} summarieName - req.body (string) the summarie name;
    * @param {string} summarieContent - req.body (string) the summarie content;
    * @param {string} tagId - req.body (string) the tag id (optional);
    * @returns A message with status code.
    */
  async create (req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;

      const { summarieName, summarieContent, tagId } = req.body;

      if(!userId)
        throw new Error(UserErrorMessages.USER_ID_NULL);

      if(!summarieName)
        throw new Error(SummarieErrorMessages.SUMMARIE_NAME_NULL);

      if(!summarieContent)
        throw new Error(SummarieErrorMessages.SUMMARIE_CONTENT_NULL);

      await SummariesServices.createSummarie(userId, summarieName, summarieContent, tagId); 

      return res.status(200).send({message: "Summarie created !"});
    } catch (error) {
      return errorHandler(error, res);
            
    }
  }

  /**
    * @description Delete an user's summarie.
    * @param {string} summarieId - req.params (string) the summarie id;
    * @returns A message with status code.
    */
  async delete (req: Request, res: Response): Promise<Response> {
    try {
      const { summarieId } = req.params;

      if(!summarieId)
        throw new Error(SummarieErrorMessages.SUMMARIE_ID_NULL);
			
      await SummariesServices.deleteSummarie(summarieId);

      return res.status(204).send({message: "summarie deleted !"});
    } catch (error) {
      return errorHandler(error, res);

    }
  }

}

export default new SummarieController;