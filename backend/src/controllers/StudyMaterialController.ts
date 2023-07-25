import { Request, Response } from "express";
import { IStudyMaterial } from "../services/types/types";
import StudyMaterialServices from "../services/StudyMaterialServices";

class StudyMaterialController {

    async getStudyMaterial (req: Request, res: Response) {
        try {
            //TODO implemente method
            const {message, maxLen} = req.body;
            const studyMaterials = StudyMaterialServices.getStudyMaterial(message);
            res.status(200).send({message: "ok"});
        } catch (error) {
            
        }
    }
}

export default new StudyMaterialController;