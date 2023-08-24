import { Request, Response } from "express";
import { Model } from "sequelize";
import FavoriteRepository from "../database/repositories/FavoriteRepository";
import { CardErrorMessages, FavoriteErrorMessages, MaterialErrorMessages, SummarieErrorMessages, UserErrorMessages } from "../expcetions/messages";
import OpenAIService, { Material } from "../services/external/services/OpenAIService";
import CustomRequest from "../services/interfaces/ICustomRequest";
import errorHandler from "../expcetions/returnError";

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
        throw new Error(CardErrorMessages.CARD_NAME_NULL);

      cardTitle.replace("?", "");

      const content = await OpenAIService.createCardContent(cardTitle);
			
      return res.status(200).send({response: content});
    } catch (error) {
      return errorHandler(error, res);
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
        throw new Error(SummarieErrorMessages.SUMMARIE_NAME_NULL);

      summarieTitle.replace("?", "");

      const content = await OpenAIService.createSummarieContent(summarieTitle);
			
      return res.status(200).send({content});
    } catch (error) {
      return errorHandler(error, res);
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
        throw new Error(MaterialErrorMessages.MATERIAL_NULL);

      const content = await OpenAIService.createStudyMaterials(material);

      return res.status(200).send({response: content});
    } catch (error) {
      return errorHandler(error, res);
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
        throw new Error(FavoriteErrorMessages.FAVORITE_NULL);

      if(!favorite.name)
        throw new Error(FavoriteErrorMessages.FAVORITE_NAME_NULL);

      if(!favorite.type)
        throw new Error(FavoriteErrorMessages.FAVORITE_TYPE_NULL);

      if(!favorite.author)
        throw new Error(FavoriteErrorMessages.FAVORITE_AUTHOR_NULL);

      if(!favorite.description)
        throw new Error(FavoriteErrorMessages.FAVORITE_DESCRIPTION_NULL);

      if(!favorite.userId)
        throw new Error(UserErrorMessages.USER_ID_NULL);
			
      await FavoriteRepository.create(favorite);

      return res.status(200).send({message: "done"});

    } catch (error) {
      return errorHandler(error, res);
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
        throw new Error(FavoriteErrorMessages.FAVORITE_ID_NULL);

      await FavoriteRepository.delete(favoriteId);

      return res.status(204).send({message: "done"});

    } catch (error) {
      return errorHandler(error, res);
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
        throw new Error(UserErrorMessages.USER_ID_NULL);

      const favorites = await FavoriteRepository.list(userId);

      return res.status(200).send(favorites);
			
    } catch (error) {
      return errorHandler(error, res);
    }
  }
	
}

export default new OpenAIController;