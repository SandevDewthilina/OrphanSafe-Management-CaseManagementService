import express from "express";
import {
  createCase,
  getCaseList,
  getCaseInfoByCaseId,
  getCaseInvitationByUserId,
  createCaseLog,
  getCaseNameList,
  deleteCaseLog,
  updateCaseState,
  requestCaseDoc,
  getCaseListByUserId,
  getCaseLogsByCaseId,
  updateCaseLog,
} from "../controllers/caseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/rabbit").get(requestCaseDoc);
router.route("/createCase").post(protect, createCase);
router.route("/getCaseList").get(protect, getCaseList);
router.route("/getCaseListByUserId").get(protect, getCaseListByUserId);
router.route("/getCaseInfoByCaseId").get(protect, getCaseInfoByCaseId);
router
  .route("/getCaseInvitationByUserId")
  .get(protect, getCaseInvitationByUserId);

router.route("/createCaseLog").post(protect, createCaseLog);
router.route("/getCaseNameList").get(protect, getCaseNameList);
router.route("/getCaseLogsByCaseId").get(protect, getCaseLogsByCaseId);
router.route("/deleteCaseLog").delete(protect, deleteCaseLog);
router.route("/updateCaseState").put(protect, updateCaseState);
router.route("/updateCaseLog").put(protect, updateCaseLog);

router.route("/createCaseLog").post(protect, createCaseLog);

export default router;
