import { Response, Request } from "express";
import { Model } from "sequelize";
import {
    createTag as createTagRepository,
    deleteTag as deleteTagRepository,
    listTags as listTagsRepository
} from "../database/repositories/tagRepository";


class TagController {
    
    async listTags (req: Request, res: Response): Promise<Response<Model[]>> {
        try {
            const { userId: id } = req.params;

            const deck = await listTagsRepository(id);

            return res.status(200).send(deck);
        } catch (error) {
            if(error instanceof Error ) return res.status(400).send({message: error.message});

            return res.status(400).send({message: error});
        }
    }

    async createTag (req: Request, res: Response): Promise<Response> {
        try {
            const { userId: id } = req.params;
            const { tagName } = req.body;

            await createTagRepository(id, tagName); 

            return res.status(200).send({message: "Tag created !"});
        } catch (error) {
            if (error instanceof Error) return res.status(400).send({messege: error.message});

            return res.status(400).send({message: error});
            
        }
    }

    async deleteTag (req: Request, res: Response): Promise<Response> {
        try {
            const { deckId: id } = req.params;

            await deleteTagRepository(id);

            return res.status(200).send({message: "Tag deleted !"})
        } catch (error) {
            if (error instanceof Error) return res.status(400).send({message: error.message});
            
            return res.status(400).send({message: error});
        }
    }
}

export default new TagController;