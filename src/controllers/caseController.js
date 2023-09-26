import asyncHandler from "express-async-handler";
import {
  createCaseAsync,
  getCaseListasync,
  getCaseInfoByCaseIdasync,
  getCaseInvitationByUserIdasync,
  createCaseLogAsync,
} from "../services/caseService.js";
import { RPCRequest } from "../lib/rabbitmq/index.js";
import { DOCUMENT_SERVICE_RPC } from "../config/index.js";

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

export const getCaseInvitationByUserId = asyncHandler(async (req, res) => {
  const result = await getCaseInvitationByUserIdasync(req.body.userId);
  return res.status(200).json({
    success: true,
    caseInvitations: result,
  });
});

export const createCaseLog = asyncHandler(async (req, res) => {
  const caseId = req.body.caseId;
  const logName = req.body.logName;
  const logDescription = req.body.logDescription;
  const logDocumentId = req.body.logDocumentId;
  await createCaseLogAsync(caseId, logName, logDescription, logDocumentId);
  return res.status(200).json({
    success: true,
    message: "successfully created a caseLog",
  });
});

export const requestCaseDoc = asyncHandler(async (req, res) => {
  const resp = await RPCRequest(DOCUMENT_SERVICE_RPC, {event: 'URL_FOR_KEYS', data: ['s12ui121/profile/fde0c464-380d-464c-b617-da0158e18157--FirstRegistrationMonth.png']})
  return res.json(resp)
});
