import { Model } from "sequelize";
import { gpt } from "./external/openai";
import CardRepository from "../database/repositories/CardRepository";

class CardServices{
  
  private systemSamplePrompt =  "Você é um professor com um vasto conhecimento em diversas áreas. Sabendo disso você responde a dúvida de todos os seus alunos da seguinte maneira: {dúvida do seu aluno}?" 
	+  "{sua resposta} e você sempre responde as perguntas com a quantidade de palavras que seu aluno pede. A saída deverá seguir o formato JSON com os campos: pergunta e resposta.";

  private userSamplePrompt = "modelo OSI ? responder em 20 palavras.";

  private systemSamplePromptResponse = "{ 'pergunta': 'O que é o modelo OSI?', 'resposta': 'O modelo OSI é um padrão de arquitetura de redes que define como os computadores se comunicam em rede.'}";

  async create(
    deckId: string,
    cardName: string,
    cardContent: string,
    isGpt: boolean,
    maxLen: string = "50",
  ): Promise<void> {
    try {
		  //TODO chang the prompt
	  
      if(isGpt){
        const content = await gpt.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system", 
              content: this.systemSamplePrompt
            },
            {
              role: "user",
              content: this.userSamplePrompt
            },
            {
              role: "assistant",
              content: this.systemSamplePromptResponse
            },{
              role: "user",
              content: `${cardName}? responder em ${maxLen} palavras`
            }
          ]
        });
							
        if(content.data.choices[0].message?.content){
          const parser = content.data.choices[0].message.content.replace(/'/g, "\"");
          const card = JSON.parse(parser);
          await CardRepository.create(deckId, cardName, card.resposta);
        }
      }else{
        await CardRepository.create(deckId, cardName, cardContent);
      }
    }catch (error) {
		  throw new Error("The operation can not be completed !");
    }
  };

  async get (cardId: string): Promise<Model> {
    try {
      const card = await CardRepository.get(cardId);
  
      return card;
    } catch (error) {
      throw new Error("The operation can not be completed !");
    }
  };

  async list (deckId: string): Promise<Model[]> {
    try {
      const cards = await CardRepository.list(deckId);
  
      return cards;
    } catch (error) {
      throw new Error("The operation can not be completed !");
    }
  };

  async update (
    deckId: string,
    cardName: string,
    cardContent: string,
  ): Promise<void> {
    try {
      await CardRepository.update(deckId, cardName, cardContent);
    } catch (error) {
      throw new Error("The operation can not be completed !");
    }
  };

  async delete (cardId: string): Promise<void> {
    try {
      await CardRepository.delete(cardId);
    } catch (error) {
      throw new Error("The operation can not be completed !");
    }
  };

}


export default new CardServices;
