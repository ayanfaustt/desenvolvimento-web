import { Model } from "sequelize";
import {
  createCard as createCardRepository,
  deleteCard as deleteCardRepository,
  getCard as getCardRepository,
  listCards as listCardsRepository,
  updateCard as updateCardRepository,
} from "../database/repositories/cardRepository";

import { gpt } from "./external/openai";

export const createCard = async (
  deckId: string,
  cardName: string,
  cardContent: string,
  isGpt: boolean,
  maxLen: string = "50",
) => {
  try {
    //TODO chang the prompt

    if(isGpt){
      const content = await gpt.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system", 
            content: "Você é um professor com um vasto conhecimento em diversas áreas. Sabendo disso você responde a dúvida de todos os seus alunos da seguinte maneira: {dúvida do seu aluno}? {sua resposta} e você sempre responde as perguntas com a quantidade de palavras que seu aluno pede. A saída deverá seguir o formato JSON com os campos: pergunta e resposta."
          },
          {
            role: "user",
            content: "modelo OSI ? responder em 20 palavras."
          },
          {
            role: "assistant",
            content: "{ 'pergunta': 'O que é o modelo OSI?', 'resposta': 'O modelo OSI é um padrão de arquitetura de redes que define como os computadores se comunicam em rede.'}"
          },{
            role: "user",
            content: `${cardName}? responder em ${maxLen} palavras`
          }
        ]
      });
            
      if(content.data.choices[0].message?.content){
        const parser = content.data.choices[0].message.content.replace(/'/g, "\"");
        const card = JSON.parse(parser);
        await createCardRepository(deckId, cardName, card.resposta);
      }
    }else{
      await createCardRepository(deckId, cardName, cardContent);
    }
  }catch (error) {
    	throw new Error("The operation can not be completed !");
  }
};

export const getCard = async (cardId: string): Promise<Model> => {
  try {
    const card = await getCardRepository(cardId);

    return card;
  } catch (error) {
    throw new Error("The operation can not be completed !");
  }
};

export const listCards = async (deckId: string): Promise<Model[]> => {
  try {
    const cards = await listCardsRepository(deckId);

    return cards;
  } catch (error) {
    throw new Error("The operation can not be completed !");
  }
};

export const updateCard = async (
  deckId: string,
  cardName: string,
  cardContent: string,
): Promise<void> => {
  try {
    await updateCardRepository(deckId, cardName, cardContent);
  } catch (error) {
    throw new Error("The operation can not be completed !");
  }
};

export const deleteCard = async (cardId: string): Promise<void> => {
  try {
    await deleteCardRepository(cardId);
  } catch (error) {
    throw new Error("The operation can not be completed !");
  }
};
