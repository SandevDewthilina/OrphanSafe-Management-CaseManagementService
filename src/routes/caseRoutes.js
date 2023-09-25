import express from "express";
import {
  createCase,
  getCaseList,
  getCaseInfoByCaseId,
} from "../controllers/caseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/createCase").post(protect, createCase);
router.route("/getCaseList").get(protect, getCaseList);
router.route("/getCaseInfoByCaseId").get(protect, getCaseInfoByCaseId);
router.route("/")
export default router;
