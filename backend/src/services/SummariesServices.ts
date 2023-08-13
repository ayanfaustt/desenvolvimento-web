import { Model } from "sequelize";
import SummarieRepository from "../database/repositories/SummarieRepository";
import UserServices from "./UserServices";
import { NotFoundError } from "../expcetions/NotFound";

class SummariesServices {
 
  async createSummarie(
    userId: string,
    summarieName: string,
    summarieContent?: string,
    tagId?: string,
  ): Promise<void> {
    // TODO confirm if a summarie name can be duplicated
    await UserServices.getUserById(userId);
		
    await SummarieRepository.createSummarie(
      userId,
      summarieName,
      summarieContent,
      tagId,
    );

  }

  async listSummaries(userId: string): Promise<Model[]> {
    const summaries = SummarieRepository.listSummaries(userId);

    return summaries;
  }

  async listSummariesByTag(userId: string, tagId: string): Promise<Model[]> {
    const summaries = SummarieRepository.listSummariesByTag(userId, tagId);

    return summaries;
  }

  async updateSummarie(
    id: string,
    summarieName?: string,
    summarieContent?: string,
    tagId?: string,

  ): Promise<void> {

    await SummarieRepository.updateSummarie(
      id,
      summarieName,
      summarieContent,
      tagId,
    );

  }

  async getSummarie(summarieId: string): Promise<Model> {
    const summarie = await SummarieRepository.getSummarie(summarieId);

    if (!summarie) 
      throw new NotFoundError("Summarie not found !");

    return summarie;
  }

  async deleteSummarie(summarieId: string): Promise<void> {
    
    await SummarieRepository.deleteSummarie(summarieId);

  }
}

export default new SummariesServices();
