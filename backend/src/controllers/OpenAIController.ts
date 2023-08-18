import { Response, Request } from "express";
import OpenAIService, { Material } from "../services/external/services/OpenAIService";
import { ServiceUnavailableError } from "../expcetions/ServiceUnavailableError";

interface CustomRequest extends Request{
	body: {
		cardTitle?: string;
		summarieTitle?: string;
		material?: string;
	}
}

class OpenAIController {
	  
  /**
    * @description Create a Card content using ChatGPT
    * @param {string} CardTitle - req.body (string) the card name;
    * @returns A message with the reponse of ChatGpt and status code.
    */
  async createCard (req: CustomRequest, res: Response): Promise<Response>{
    try {
      const { cardTitle } = req.body;

      if(!cardTitle)
        throw new Error("Card title can not be null");

      cardTitle.replace("?", "");

      const content = await OpenAIService.createCardContent(cardTitle);
			
      return res.status(200).send({response: content});
    } catch (error) {
      if(error instanceof ServiceUnavailableError)
        return res.status(503).send({message: error.message});
		
      return res.status(400).send({message: error});
    }
  }

  /**
    * @description Create a Summarie content using ChatGPT
    * @param {string} summarieTitle - req.body (string) the summarie name;
    * @returns A message with the reponse of ChatGpt and status code.
    */
  async createSummarie (req: CustomRequest, res: Response): Promise<Response>{
    try {
      const { summarieTitle } = req.body;

      if(!summarieTitle)
        throw new Error("Card title can not be null");

      summarieTitle.replace("?", "");

      const content = await OpenAIService.createSummarieContent(summarieTitle);
			
      return res.status(200).send({content});
    } catch (error) {
      if(error instanceof ServiceUnavailableError)
        return res.status(503).send({message: error.message});
		
      return res.status(400).send({message: error});
    }
  }

  /**
    * @description Create a list of materials content using ChatGPT
    * @param {string} material - req.body (string) the theme of materials that will be recommended
    * @returns A message with the reponse of ChatGpt and status code.
    */
  async createMaterial(req: CustomRequest, res: Response): Promise<Response<Material[]>>{
    try {
      const {material} = req.body;
      if(!material)
        throw new Error("Material can not be null");

      const content = await OpenAIService.createStudyMaterials(material);

      return res.status(200).send({response: content});
    } catch (error) {
      if(error instanceof ServiceUnavailableError)
        return res.status(503).send({message: error.message});

      return res.status(400).send({message: error});
    }
  }
	
}

export default new OpenAIController;