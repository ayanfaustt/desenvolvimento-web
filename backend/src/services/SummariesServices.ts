import { Model } from "sequelize";
import SummarieRepository from "../database/repositories/SummarieRepository";
import { gpt } from "./external/openai";


class SummariesServices{

    private systemPrompt = "Você é um professor com um vasto conhecimento em diversas áreas com uma grande capacidade de criar resumos das coisas que você já leu." + 
    "Sabendo disso você cria resumos todos os seus alunos da seguinte maneira: {tema do resumo pedido pelo seu aluno}:"+
    "{sua resposta} e você sempre atende os pedidos de resumo com a quantidade de palavras que seu aluno pede. A saída deverá seguir o formato JSON com os campos: tema e resumo.";

    private userSamplePrompt = "modelo OSI : resumir em 20 palavras.";

    private systemResponseSamplePrompt = "{ 'tema': 'O que é o modelo OSI', 'resumo': 'O modelo OSI é um padrão de arquitetura de redes que define como os computadores se comunicam em rede.'}";

    
    async createSummarie (
        userId: string, 
        summarieName: string, 
        summarieContent?: string, 
        maxLen: number = 100, 
        tagId?: string,
        isGpt?: boolean,
        ): Promise<void> {
        //TODO confirm if a summarie name can be duplicated

        try {
            if(isGpt){
                const content = await gpt.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system", 
                            content: this.systemPrompt,
                        },
                        {
                            role: "user",
                            content: this.userSamplePrompt
                        },
                        {
                            role: "assistant",
                            content: this.systemResponseSamplePrompt,
                        },{
                            role: "user",
                            content: `${summarieName}? responder em ${maxLen} palavras`
                        }
                    ]
                });

                if(content.data.choices[0].message?.content){
                    const parser = content.data.choices[0].message.content.replace(/'/g, '"');
                    const summarie = JSON.parse(parser);
                    await SummarieRepository.createSummarie(userId, summarieName, summarie.resumo, tagId);
                }
            }else{
                await SummarieRepository.createSummarie(userId, summarieName, summarieContent, tagId);

            }
            
                
        } catch (error) {
            
        }
    }
    
    async listSummaries(userId: string): Promise<Model[]> {
        try {
            const summaries = SummarieRepository.listSummaries(userId);
    
            return summaries;
        } catch (error) {
            throw new Error("The operation can not be completed !");
        }
    }

    async listSummariesByTag(userId: string, tagId: string): Promise<Model[]> {
        try {
            const summaries = SummarieRepository.listSummariesByTag(userId, tagId);
    
            return summaries;
        } catch (error) {
            throw new Error("The operation can not be completed !");
        }
    }
    
    async updateSummarie (
        id: string, 
        summarieName?: string, 
        summarieContent?: string,
        maxLen: number = 100,  
        tagId?: string,
        isGpt?: boolean,
        ): Promise<void> {
            try {
                if(isGpt){
                    const content = await gpt.createChatCompletion({
                        model: "gpt-3.5-turbo",
                        messages: [
                            {
                                role: "system", 
                                content: this.systemPrompt,
                            },
                            {
                                role: "user",
                                content: this.userSamplePrompt
                            },
                            {
                                role: "assistant",
                                content: this.systemResponseSamplePrompt,
                            },{
                                role: "user",
                                content: `${summarieName}? responder em ${maxLen} palavras`
                            }
                        ]
                    });
    
                    if(content.data.choices[0].message?.content){
                        const parser = content.data.choices[0].message.content.replace(/'/g, '"');
                        const summarie = JSON.parse(parser);
                        await SummarieRepository.updateSummarie(id, summarieName, summarie.resumo, tagId);
                    }
                } else {

                    await SummarieRepository.updateSummarie(id, summarieName, summarieContent, tagId);

                }
        
            } catch (error) {
                throw new Error("The operation can not be completed !");
            }
        
    }
    
    async getSummarie(summarieId: string): Promise<Model> {
        try {
            const summarie = await SummarieRepository.getSummarie(summarieId);
        
            if(!summarie) throw new Error("Summarie not found !");
        
            return summarie;
        } catch (error) {
            throw new Error("The operation can not be completed !");
        }
    }
    
    async deleteSummarie (summarieId: string): Promise<void> {
        try {
            await SummarieRepository.deleteSummarie(summarieId);
        } catch (error) {
            throw new Error("The operation can not be completed !");
        }
    }
}

export default new SummariesServices;