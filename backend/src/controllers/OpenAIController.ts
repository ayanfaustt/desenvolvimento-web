import { Response, Request } from "express";
import OpenAIService, { Material } from "../services/external/services/OpenAIService";
import { ServiceUnavailableError } from "../expcetions/ServiceUnavailableError";
import { DatabaseError, Model } from "sequelize";
import CustomRequest from "../services/interfaces/ICustomRequest";
import FavoriteRepository from "../database/repositories/FavoriteRepository";

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
		
      if(error instanceof Error)
      	return res.status(400).send({message: error.message});

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
		
      if(error instanceof Error)
      	return res.status(400).send({message: error.message});

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

      if(error instanceof Error)
      	return res.status(400).send({message: error.message});

      return res.status(400).send({message: error});
    }
  }

  /**
    * @description Favorite the ChatGPT recomendation
    * @param {string} favorite - req.body { favorite:{name, author, description, type, userId all string} }
    * @returns A message with status code.
  */
  async favorite(req: CustomRequest, res: Response): Promise<Response> {
    try {
      const { favorite } = req.body;

      if(!favorite)
        throw new Error("Favorite can not be null");

      if(!favorite.name)
        throw new Error("Favorite Name can not be null");

      if(!favorite.type)
        throw new Error("Favorite Type can not be null");

      if(!favorite.author)
        throw new Error("Favorite Author can not be null");

      if(!favorite.description)
        throw new Error("Favorite Description can not be null");

      if(!favorite.userId)
        throw new Error("Favorite user ID can not be null");
			
      await FavoriteRepository.create(favorite);

      return res.status(200).send({message: "done"});

    } catch (error) {
      if(error instanceof DatabaseError)
        return res.status(500).send({message: error.message});

      if(error instanceof Error)
      	return res.status(400).send({message: error.message});

      return res.status(400).send({message: error});
    }
  }

  /**
    * @description Delete a favorite material
    * @param {string} favoriteId - req.params (string) the favorite ID
    * @returns A message with status code.
  */
  async removeFavorite(req: Request, res: Response): Promise<Response> {
    try {
      const { favoriteId } = req.params;

      if(!favoriteId)
        throw new Error("Favorite can not be null");

      await FavoriteRepository.delete(favoriteId);

      return res.status(200).send({message: "done"});

    } catch (error) {
      if(error instanceof DatabaseError)
        return res.status(500).send({message: error.message});

      return res.status(400).send({message: error});
    }
  }

	  /**
    * @description List all user's favorites
    * @param {string} userId - req.params (string) The user ID
    * @returns A list of favorite with status code.
  */
  async list(req: Request, res: Response): Promise<Response<Model[]>>{
    try {
      const { userId } = req.params;

      if(!userId)
        throw new Error("User ID can not be null");

      const favorites = await FavoriteRepository.list(userId);

      return res.status(200).send(favorites);
			
    } catch (error) {
      if(error instanceof DatabaseError)
        return res.status(500).send({message: error.message});

      if(error instanceof Error)
      	return res.status(400).send({message: error.message});

      return res.status(400).send({message: error});
    }
  }
	
}

export default new OpenAIController;