import SummariesServices from "../services/SummariesServices";
import { Response, Request } from "express";
import { Model } from "sequelize";


class SummarieController {
    
  /**
    * @description Get a specific user's summarie.
    * @param {string} summarieId - req.params (string) the summarie id;
    * @returns A summarie object with status code.
    */
  async get (req: Request, res: Response): Promise<Response> {
    try {
      const { summarieId: id } = req.params;

      const summarie = await SummariesServices.getSummarie(id);

      return res.status(200).send(summarie);
    } catch (error) {
      if(error instanceof Error ) return res.status(400).send({message: error.message});

      return res.status(400).send({message: error});
    }
  }

  /**
    * @description List all user's summaries.
    * @param {string} userId - req.params (string) the user id;
    * @returns A list of summaries object with status code.
    */
  async list (req: Request, res: Response): Promise<Response<Model[]>> {
    try {
      const { userId: id } = req.params;

      const summaries = await SummariesServices.listSummaries(id);

      return res.status(200).send(summaries);
    } catch (error) {
      if (error instanceof Error) return res.status(400).send({messege: error.message});

      return res.status(400).send({message: error});
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
        throw new Error("Tag ID can not be null");

      const summaries = await SummariesServices.listSummariesByTag(userId, tagId.toString());

      return res.status(200).send(summaries);
    } catch (error) {
      if(error instanceof Error ) return res.status(500).send({message: error.message});

      return res.status(400).send({message: error});
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
      const {summarieId: id} = req.params;
      const {summarieName, summarieContent, tagId } = req.body;

      await SummariesServices.updateSummarie(id, summarieName, summarieContent, tagId);

      return res.status(200).send({message: "Summarie updated !"});
    } catch (error) {
      if (error instanceof Error) return res.status(400).send({messege: error.message});

      return res.status(400).send({message: error});
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
      const { userId: id } = req.params;

      const { summarieName, summarieContent, tagId } = req.body;

      await SummariesServices.createSummarie(id, summarieName, summarieContent, tagId); 

      return res.status(200).send({message: "Summarie created !"});
    } catch (error) {
      if (error instanceof Error) return res.status(400).send({messege: error.message});

      return res.status(400).send({message: error});
            
    }
  }

  /**
    * @description Delete an user's summarie.
    * @param {string} summarieId - req.params (string) the summarie id;
    * @returns A message with status code.
    */
  async delete (req: Request, res: Response): Promise<Response> {
    try {
      const { summarieId: id } = req.params;

      await SummariesServices.deleteSummarie(id);

      return res.status(200).send({message: "summarie deleted !"});
    } catch (error) {
      if (error instanceof Error) return res.status(400).send({message: error.message});
            
      return res.status(400).send({message: error});
    }
  }

}

export default new SummarieController;