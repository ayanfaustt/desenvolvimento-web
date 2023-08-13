import { ServiceUnavailableError } from "../../../expcetions/ServiceUnavailableError";
import { gpt as gptClient } from "../clients/openai";


export interface Material {
	name: string;
	type: string;
	author: string;
	description: string;
}

class OpenAIService{
	
  //#region Card Prompt
  private systemSampleCardPrompt =  "Você é um professor com um vasto conhecimento em diversas áreas. Sabendo disso você responde a dúvida de todos os seus alunos da seguinte maneira: {dúvida do seu aluno}?" 
	+  "{sua resposta} e você sempre responde as perguntas com a quantidade de palavras que seu aluno pede. A saída deverá seguir o formato JSON com os campos: theme e content.";

  private userSampleCardPrompt = "modelo OSI ? responder em 20 palavras.";

  private systemSampleCardPromptResponse = 
    "{ 'theme': 'O que é o modelo OSI?', 'content': 'O modelo OSI é um padrão de arquitetura de redes que define como os computadores se comunicam em rede.'}";

  private maxCardLen = 50;
  //#endregion

  //#region Summarie Prompt
  private systemSummariePrompt =
    "Você é um professor com um vasto conhecimento em diversas áreas com uma grande capacidade de criar resumos das coisas que você já leu." +
	"Sabendo disso você cria resumos todos os seus alunos da seguinte maneira: {tema do resumo pedido pelo seu aluno}:" +
	"{sua resposta} e você sempre atende os pedidos de resumo com a quantidade de palavras que seu aluno pede. A saída deverá seguir o formato JSON com os campos: theme e content.";

  private userSummarieSamplePrompt = "modelo OSI : resumir em 20 palavras.";

  private systemSummarieResponseSamplePrompt =
    "{ 'theme': 'O que é o modelo OSI', 'content': 'O modelo OSI é um padrão de arquitetura de redes que define como os computadores se comunicam em rede.'}";

  private summarieMaxLen = 1000;
  //#endregion

  //#region Material Prompt
  private systemmaterialSamplePrompt = 
    "Você é um professor com um vasto conhecimento em diversas áreas com um grande know-how sobre livros e materiais de estudo ." 
	+ "Sabendo disso você cria lista de recomendações de materiais de estudo (livros, vídeos e artigos) para os seus alunos da seguinte maneira: {tema do material}:{sua resposta}"
	+ "e você sempre atende os pedidos de resumo com a quantidade de materiais que seu aluno pede. A saída deverá seguir o formato JSON com a seguinte estrutura:" 
	+"{ respects : [ { name: nome do material, type: qual a mídia do material, author: responsável por produzir o material, description: uma descricao do material } ] }";

  private userMaterialPromptSample = " matemática discreta : 3 recomendações em português ou inglês";

  private systemMaterialResponsePromptSample = 
    "{ 'respects': [ { 'name': 'Livro - Matemática Discreta e suas Aplicações', 'type': 'Livro', 'author': 'Kenneth H. Rosen', 'description': 'Livro essencial sobre matemática discreta com aplicações em ciência da computação.' }, "
	+ "{ 'name': 'Vídeo Aula - Discrete Mathematics by Dr. Trefor Bazett', 'type': 'Vídeo', 'author': 'Dr. Trefor Bazett','description': 'Série de vídeos que cobrem tópicos importantes de matemática discreta.'}, "
	+ "{'name': 'Artigo - An Introduction to Discrete Mathematics', 'type': 'Artigo', 'author': 'James F. Vejmola', 'description': 'Artigo introdutório que explora os conceitos fundamentais da matemática discreta.' } ] }";

  private materialCount = 5;

  //#endregion

  private responseToTextParser(gptResponseContent: string): string{
    const parser = gptResponseContent.replace(
      /'/g,
      "\"",
    );
    const content = JSON.parse(parser);

    return content.content;
  }

  private reponseToMaterialParser (gptResponseContent: string): Material[] {
    const parser = gptResponseContent.replace(
      /'/g,
      "\"",
    );
    const content = JSON.parse(parser) as Material[];

    // const materials: Material[] = [];

    // content
		
    return content;
  }

  async createCardContent(cardTitle: string): Promise<string>{
    
    const content = await gptClient.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system", 
          content: this.systemSampleCardPrompt
        },
        {
          role: "user",
          content: this.userSampleCardPrompt
        },
        {
          role: "assistant",
          content: this.systemSampleCardPromptResponse
        },{
          role: "user",
          content: `${cardTitle}? responder em ${this.maxCardLen} palavras`
        }
      ]
    });
							
    const gptResponse = content.data.choices[0].message?.content;

    if (gptResponse) {
      const response = this.responseToTextParser(gptResponse);

      return response;
    }

    throw new ServiceUnavailableError("ChatGPT services are unavailable");
  }

  async createSummarieContent(summarieTitle: string): Promise<string>{
    const content = await gptClient.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: this.systemSummariePrompt,
        },
        {
          role: "user",
          content: this.userSummarieSamplePrompt,
        },
        {
          role: "assistant",
          content: this.systemSummarieResponseSamplePrompt,
        },
        {
          role: "user",
          content: `${summarieTitle} : resumir em  ${this.summarieMaxLen} palavras`,
        },
      ],
    });

    const gptResponse = content.data.choices[0].message?.content;

    if (gptResponse) {
      const response = this.responseToTextParser(gptResponse);

      return response;
    }

    throw new ServiceUnavailableError("ChatGPT services are unavailable");
  }

  async createStudyMaterials(materialName: string): Promise<Material[]>{
    const content = await gptClient.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: this.systemMaterialResponsePromptSample,
        },
        {
          role: "user",
          content: this.userMaterialPromptSample,
        },
        {
          role: "assistant",
          content: this.systemMaterialResponsePromptSample,
        },
        {
          role: "user",
          content: `${materialName} : ${this.materialCount} recomendações em português ou inglês`,
        },
      ],
    });

    const gptResponse = content.data.choices[0].message?.content;

    if(gptResponse){
      const response = this.reponseToMaterialParser(gptResponse);

      return response;
    }

    throw new ServiceUnavailableError("ChatGPT services are unavailable");
  }

}

export default new OpenAIService;