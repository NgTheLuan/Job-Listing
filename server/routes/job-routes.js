import express from "express";
import {
  getJobs,
  getJobHot,
  createJobs,
  deleteJobs,
  updateJobs,
} from "../controllers/job-controller.js";

const router = express.Router();
router.get("/", getJobs);
router.get("/jobhot", getJobHot);
router.post("/", createJobs);
router.delete("/:id", deleteJobs);
router.put("/:id", updateJobs);

export default router;
