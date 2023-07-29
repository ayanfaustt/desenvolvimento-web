import { Model } from "sequelize";
import { SummariesModel } from "../../models/summaries.model";


class SummarieRepository{
    
    async createSummarie (
        userId: string, 
        summarieName: string, 
        summarieContent?: string, 
        tagId?: string
        ): Promise<void>  {
        //TODO confirm if a summarie name can be duplicated
    
        const isSummarieCreated = await SummariesModel.create({
            userId: userId,
            summarie_name: summarieName,
            summarie_content: summarieContent,
            tagId: tagId
        });
    
        if(!isSummarieCreated) throw new Error("Summarie can not be created !");
    }
    
    async listSummaries (userId: string): Promise<Model[]>  {
        try {
            const summaries = await SummariesModel.findAll({
                where: {
                    userId: userId
                }
            });
    
            return summaries;
        } catch (error) {
            throw new Error("The operation can not be completed !");
        }
    }
    
    async updateSummarie (
        id: string, 
        userId :string, 
        summarieName?: string, 
        summarieContent?: string, 
        tagId?: string
        ): Promise<void>  {
            try {
                await SummariesModel.update({
                    summarie_name: summarieName,
                    summarie_content: summarieContent,
                    tagId: tagId
                },{
                    where:{
                        id: id,
                        userId: userId
                    }
                });
            } catch (error) {
                throw new Error("The operation can not be completed !");
            }
        
    }
    
    async getSummarie (summarieId: string): Promise<Model>  {
        try {
            const summarie = await SummariesModel.findOne({
                where: {
                    id : summarieId
                }
            });
        
            if(!summarie) throw new Error("Summarie not found !");
        
            return summarie;
        } catch (error) {
            throw new Error("The operation can not be completed !");
        }
    }
    
    async deleteSummarie (summarieId: string): Promise<void> {
        try {
            await SummariesModel.destroy({
                where: {
                    id: summarieId
                }
            });
        } catch (error) {
            throw new Error("The operation can not be completed !");
        }
    }
}

export default new SummarieRepository;
