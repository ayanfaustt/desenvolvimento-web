import { Model } from "sequelize";
import { gpt } from "./external/clients/openai";
import CardRepository from "../database/repositories/CardRepository";
import DeckService from "./DeckService";
import { NotFoundError } from "../expcetions/NotFound";

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

    await DeckService.get(deckId);
			
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
  };

  async get (cardId: string): Promise<Model> {

    const card = await CardRepository.get(cardId);

    if(!card)
      throw new NotFoundError("Card not found !");
  
    return card;

  };

  async list (deckId: string): Promise<Model[]> {

    const cards = await CardRepository.list(deckId);
  
    return cards;
  };

  async update (
    cardId: string,
    cardName: string,
    cardContent: string,
  ): Promise<void> {

    await this.get(cardId);

    await CardRepository.update(cardId, cardName, cardContent);

  };

  async delete (cardId: string): Promise<void> {

    await CardRepository.delete(cardId);

  };

}


export default new CardServices;
