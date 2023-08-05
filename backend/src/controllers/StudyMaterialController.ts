// import { Request, Response } from "express";
// import { IStudyMaterial } from "../services/types/types";
// import StudyMaterialServices from "../services/StudyMaterialServices";

// class StudyMaterialController {

//   async getStudyMaterial (req: Request, res: Response) {
//     try {
//       //TODO implemente method
//       const {message} = req.body;
//       const studyMaterials = StudyMaterialServices.getStudyMaterial(message, );
//       return res.status(200).send({message: studyMaterials});
//     } catch (error) {
//       return res.status(500).send({message: "internal Error"});
//     }
//   }
// }

// export default new StudyMaterialController;