import express from "express";
import { 
    getCv, getCvById, getCvByUserId, createProfile, updateCv, deleteCv, createCV, createEducation, createProject, createExperience, updateProfile, updateEducation, updateProject, updateExperience, createExtra, updateExtra
} from "../controllers/cv-controllers.js";
//import fileUpload from '../middleware/file-upload';

const router = express.Router();

router.get("/", getCv);
router.get("/:cvId", getCvById);
router.get("/user/:userId", getCvByUserId);

router.post("/createcv/:userId", createCV);
router.patch("/updateCv/:cvId", updateCv);

router.post("/createProfile/:cvId", createProfile);
router.patch("/updateProfile/:profileId", updateProfile);

router.post("/createEducation/:cvId", createEducation);
router.patch("/updateEducation/:eduId", updateEducation);

router.post("/createProject/:cvId", createProject);
router.patch("/updateProject/:projectId", updateProject);

router.post("/createExperience/:cvId", createExperience);
router.patch("/updateExperience/:expId", updateExperience);

router.post("/createExtra/:cvId", createExtra);
router.patch("/updateExtra/:extraId", updateExtra);

router.delete("/:cvId", deleteCv);

export default router;
