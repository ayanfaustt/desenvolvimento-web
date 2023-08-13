import { Model } from "sequelize";
import { SummariesModel } from "../../models/summaries.model";
import { TagsModel } from "../../models/tags.model";


class SummarieRepository{
    
  async createSummarie (
    userId: string, 
    summarieName: string, 
    summarieContent?: string, 
    tagId?: string
  ): Promise<void>  {
    //TODO confirm if a summarie name can be duplicated

    await SummariesModel.create({
      userId: userId,
      summarie_name: summarieName,
      summarie_content: summarieContent,
      tagId: tagId
    });
    
  }
    
  async listSummaries (userId: string): Promise<Model[]>  {

    const summaries = await SummariesModel.findAll({
      where: {
        userId: userId
      },
      include: [TagsModel]
    });
    
    return summaries;

  }

  async listSummariesByTag (userId: string, tagId: string): Promise<Model[]>  {

    const summaries = await SummariesModel.findAll({
      where: {
        userId: userId,
        tagId: tagId
      },
      include: [TagsModel]
    });
    
    return summaries;

  }
    
  async updateSummarie (
    id: string, 
    summarieName?: string, 
    summarieContent?: string, 
    tagId?: string
  ): Promise<void>  {
    await SummariesModel.update({
      summarie_name: summarieName,
      summarie_content: summarieContent,
      tagId: tagId
    },{
      where:{
        id: id,
      }
    });
        
  }
    
  async getSummarie (summarieId: string): Promise<Model | null>  {

    const summarie = await SummariesModel.findOne({
      where: {
        id : summarieId
      },
      include: [TagsModel]
    });
        
    return summarie;
  }
    
  async deleteSummarie (summarieId: string): Promise<void> {

    await SummariesModel.destroy({
      where: {
        id: summarieId
      }
    });

  }
}

export default new SummarieRepository;
