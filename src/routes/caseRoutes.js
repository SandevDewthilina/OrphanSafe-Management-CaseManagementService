import express from "express";
import {
  createCase,
  getCaseList,
  getCaseInfoByCaseId,
  getCaseInvitationByUserId,
  createCaseLog,
  requestCaseDoc
} from "../controllers/caseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/rabbit").get(requestCaseDoc);
router.route("/createCase").post(protect, createCase);
router.route("/getCaseList").get(protect, getCaseList);
router.route("/getCaseInfoByCaseId").get(protect, getCaseInfoByCaseId);
router
  .route("/getCaseInvitationByUserId")
  .get(protect, getCaseInvitationByUserId);
router.route("/createCaseLog").post(protect,createCaseLog)
export default router;
