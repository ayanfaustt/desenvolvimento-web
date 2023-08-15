import { Model } from "sequelize";
import { FavoriteModel } from "../../models/favorite.model";
import Favorite from "../../services/interfaces/IFavorite";

class FavoriteRepository {

  async create(favorite: Favorite): Promise<void> {
    await FavoriteModel.create({
      name: favorite.name,
      type: favorite.type,
      author: favorite.author,
      description: favorite.description,
      userId: favorite.userId
    });
  }

  async delete(id: string): Promise<void> {

    await FavoriteModel.destroy({
      where:{
        id: id
      }
    });
  }

  async list(userId: string): Promise<Model[]>{

    const favorites = await FavoriteModel.findAll({
      where:{
        userId: userId
      }
    });

    return favorites;
  }
}

export default new FavoriteRepository;