import { gpt } from "./external/openai";
import { IStudyMaterial, Icard } from "./types/types";


class StudyMaterialServices{


    // {
    //     "model": "gpt-3.5-turbo",
    //     "messages": [
    //           {"role": "system", "content": "Você é um professor com um vasto conhecimento em diversas áreas."}, 
    //           {"role": "user", "content": "O que é o modelo OSI ? responder com no máximo 20 palavras e deve retornar um json contendo os seguintes campos: pergunta e resposta"},
    //           {"role": "assistant", "content": "{ pergunta: 'O que é o modelo OSI?', resposta: 'O modelo OSI é um padrão de arquitetura de redes que define como os computadores se comunicam em rede.'}"},
    //           {"role": "user", "content": "qual é a camada 1 do modelo osi ? responder em 20 palavras"}
    //       ]
    //   }
    async getStudyMaterial(message: string) {
        try {
            //TODO chang the prompt

        } catch (error) {
            
        }

    }
}

export default new StudyMaterialServices;