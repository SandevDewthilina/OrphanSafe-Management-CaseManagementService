import asyncHandler from "express-async-handler";
import {
  createCaseAsync,
  getCaseListasync,
  getCaseInfoByCaseIdasync,
  getCaseInvitationByUserIdasync,
  createCaseLogAsync,
  getCaseNameListAsync,
  deleteCaseLogAsync,
  updateCaseStateAsync,
} from "../services/caseService.js";
import { RPCRequest } from "../lib/rabbitmq/index.js";
import { DOCUMENT_SERVICE_RPC } from "../config/index.js";

// @desc notification broadcast
// route POST /api/notifications/broadcast
// @access Private

export const createCase = asyncHandler(async (req, res) => {
  const caseName = req.body.caseName;
  const childProfileID = req.body.childProfileID;
  const caseOwnerID = req.body.caseOwnerID;
  const createdID = req.body.createdID;
  const description = req.body.description;
  await createCaseAsync(
    caseName,
    childProfileID,
    caseOwnerID,
    createdID,
    description
  );
  return res.status(200).json({
    success: true,
    message: "successfully created a case",
  });
});

export const getCaseList = asyncHandler(async (req, res) => {
  const result = await getCaseListasync(req.userInfo.orphanageId);
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

export const getCaseNameList = asyncHandler(async (req, res) => {
  const result = await getCaseNameListAsync();
  return res.status(200).json({
    success: true,
    CaseNameList: result,
  });
});

export const deleteCaseLog = asyncHandler(async (req, res) => {
  await deleteCaseLogAsync(req.body.caseId);
  return res.status(200).json({
    success: true,
    message: "successfully deleted",
  });
});

export const updateCaseState = asyncHandler(async (req, res) => {
  const response = req.body.response;
  const caseId = req.body.caseId;
  await updateCaseStateAsync(response, caseId);
  return res.status(200).json({
    success: true,
    message: "successfully updated",
  });
});
export const requestCaseDoc = asyncHandler(async (req, res) => {
  const resp = await RPCRequest(DOCUMENT_SERVICE_RPC, {
    event: "URL_FOR_KEYS",
    data: [
      "s12ui121/profile/fde0c464-380d-464c-b617-da0158e18157--FirstRegistrationMonth.png",
    ],
  });
  return res.json(resp);
});
