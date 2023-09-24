import asyncHandler from "express-async-handler";
import {
  createCaseAsync,
  getCaseListasync,
  getCaseInfoByCaseIdasync,
} from "../services/caseService.js";
import { notFound } from "../middleware/errorMiddleware.js";

// @desc notification broadcast
// route POST /api/notifications/broadcast
// @access Private

export const createCase = asyncHandler(async (req, res) => {
  const caseName = req.body.caseName;
  const state = req.body.state;
  const childProfileID = req.body.childProfileID;
  const caseOwnerID = req.body.caseOwnerID;
  const createID = req.body.createID;
  await createCaseAsync(caseName, state, childProfileID, caseOwnerID, createID);
  return res.status(200).json({
    success: true,
    message: "successfully created a case",
  });
});

export const getCaseList = asyncHandler(async (req, res) => {
  const result = await getCaseListasync();
  return res.status(200).json({
    success: true,
    caseList: result,
  });
});

export const getCaseInfoByCaseId = asyncHandler(async (req, res) => {
  const result = await getCaseInfoByCaseIdasync(req.body.caseId);
  return res.status(200).json({
    success: true,
    caseInfo: result[0],
  });
});
