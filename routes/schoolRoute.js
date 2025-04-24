import express from "express";
import { addSchoolController, listSchoolsController } from "../controllers/schoolController.js"; // Importing controllers

const router = express.Router();

router.post("/addSchool", addSchoolController);
router.get("/listSchools", listSchoolsController);

export default router;