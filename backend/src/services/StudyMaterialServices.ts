import { gpt } from "./external/openai";
import { IStudyMaterial } from "./types/types";


class StudyMaterialServices{

    async getStudyMaterial() {
        try {
            //TODO chang the prompt
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

            console.log()

        } catch (error) {
            
        }

    }
}

export default new StudyMaterialServices;