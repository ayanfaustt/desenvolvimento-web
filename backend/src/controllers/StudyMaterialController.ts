import { Request, Response } from "express";
import { IStudyMaterial } from "../services/types/types";
import StudyMaterialServices from "../services/StudyMaterialServices";

class StudyMaterialController {

    async getStudyMaterial (req: Request, res: Response): Promise<void> {
        try {
            const studyMaterials = StudyMaterialServices.getStudyMaterial();
        } catch (error) {
            
        }
    }
}