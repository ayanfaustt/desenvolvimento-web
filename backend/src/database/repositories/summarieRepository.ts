import { Model } from "sequelize";
import { SummariesModel } from "../../models/summaries.model";



export const createSummarie = async (
    userId: string, 
    summarieName: string, 
    summarieContent?: string, 
    tagId?: string
    ): Promise<void> => {
    //TODO confirm if a summarie name can be duplicated

    const isSummarieCreated = await SummariesModel.create({
        userId: userId,
        summarie_name: summarieName,
        summarie_content: summarieContent,
        tagId: tagId
    });

    if(!isSummarieCreated) throw new Error("Summarie can not be created !");
};

export const listSummaries = async (userId: string): Promise<Model[]> => {
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

export const updateSummarie = async (
    id: string, 
    userId :string, 
    summarieName?: string, 
    summarieContent?: string, 
    tagId?: string
    ): Promise<void> => {
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

export const getSummarie = async (summarieId: string): Promise<Model> => {
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
};

export const deleteSummarie = async (summarieId: string): Promise<void> =>{
    try {
        await SummariesModel.destroy({
            where: {
                id: summarieId
            }
        });
    } catch (error) {
        throw new Error("The operation can not be completed !");
    }
};