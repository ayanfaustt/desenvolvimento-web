import { Model } from "sequelize";
import {
    createCard as createCardRepository,
    deleteCard as deleteCardRepository,
    getCard as getCardRepository,
    listCards as listCardsRepository,
    updateCard as updateCardRepository
    
} from "../database/repositories/cardRepository";

import { gpt } from "./external/openai";

// curl https://api.openai.com/v1/chat/completions \
//   -H "Content-Type: application/json" \
//   -H "Authorization: Bearer $OPENAI_API_KEY" \
//   -d '{
//     "model": "gpt-3.5-turbo",
//     "messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Hello!"}]
//   }'


export const createCard = async (deckId: string, cardName: string, cardContent: string, isGpt?: boolean) => {
    try {

        if(isGpt){
            const prompt = `Você é um professor com um vasto conhecimento em diversas áreas. 
            Sabendo disso, Pedro, seu aluno, está com uma dúvida: {O que é o modelo OSI ?} e gostaria que você o respondesse usando no máximo {20} palavras. A saída deverá seguir o formato JSON com os campos: duvida e resposta.`;
            const content = await gpt.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system", 
                        content: "Você é um professor com um vasto conhecimento em diversas áreas."
                    },
                    {
                        role: "user",
                        content: "O que é o modelo OSI ? responder com no máximo 20 palavras e deve retornar um json contendo os seguintes campos: pergunta e resposta"
                    },
                    {
                        role: "assistant",
                        content: ""
                    }
                ]
            });

            await createCardRepository(deckId, cardName, content.data.choices[0].message?.content ?? ""); 
        }

        await createCardRepository(deckId, cardName, cardContent); 

       

    } catch (error) {
        throw new Error();
    }
};

export const getCard = async (cardId: string): Promise<Model> => {
    try {
        const card = await getCardRepository(cardId);

        return card;
    } catch (error) {
        throw new Error();
    }
};


export const listCards = async (deckId: string): Promise<Model[]> => {
    try{
        const cards = await listCardsRepository(deckId);

        return cards;
    }catch (error) {
        throw new Error()
    }
};

export const deleteCard = async (cardId: string): Promise<void> =>{
    try {
       await deleteCardRepository(cardId);
    } catch (error) {
        throw new Error("The operation can not be completed !")
    }
};