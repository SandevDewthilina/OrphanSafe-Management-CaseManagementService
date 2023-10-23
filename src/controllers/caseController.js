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
  getCaseListByUserIdAsync,
  getCaseLogsByCaseIdAsync,
  updateCaseLogAsync,
  getCaseLogBycaseLogIdAsync,
  getCaseLogByLogNameAsync,
  getCaseNameAsync,
  getPendingCaseForDashBoardAsync,
  ExternalDashboardChildProfilesAsync,
  ExternalDashboardPendingCaseAsync,
  ExternalDashboardCaseAssignAsync,
  getOngoingCaseForDashBoardAsync,
} from "../services/caseService.js";
import { RPCRequest } from "../lib/rabbitmq/index.js";
import { DOCUMENT_SERVICE_RPC } from "../config/index.js";

// @desc notification broadcast
// route POST /api/notifications/broadcast
// @access Private

export const createCase = asyncHandler(async (req, res) => {
  const exist = await getCaseNameAsync(req.body.caseName);
  if (exist.length == 0) {
    await createCaseAsync(req.userInfo.userId, req.body);
    return res.status(200).json({
      success: true,
      message: "successfully created a case",
    });
  } else {
    return res.status(400).json({
      message: "Case name already exist",
    });
  }
});

export const getCaseList = asyncHandler(async (req, res) => {
  const result = await getCaseListasync(req.userInfo.orphanageId);
  return res.status(200).json({
    success: true,
    caseList: result,
  });
});

export const getCaseListByUserId = asyncHandler(async (req, res) => {
  const result = await getCaseListByUserIdAsync(req.userInfo.userId);
  return res.status(200).json({
    success: true,
    caseList: result,
  });
});

export const getCaseInfoByCaseId = asyncHandler(async (req, res) => {
  const result = await getCaseInfoByCaseIdasync(parseInt(req.query.caseId));
  return res.status(200).json({
    success: true,
    caseInfo: result[0],
  });
});

export const getCaseInvitationByUserId = asyncHandler(async (req, res) => {
  const result = await getCaseInvitationByUserIdasync(req.userInfo.userId);
  return res.status(200).json({
    success: true,
    caseInvitations: result,
  });
});

export const createCaseLog = asyncHandler(async (req, res) => {
  const reqBody = JSON.parse(req.body.otherInfo);
  const exist = await getCaseLogByLogNameAsync(reqBody.name);
  if (exist.length == 0) {
    const result = await createCaseLogAsync(reqBody, req.files);
    return res.status(200).json({
      success: true,
      message: result,
    });
  } else {
    return res.status(400).json({
      message: "Case log name already exist",
    });
  }
});

export const getCaseNameList = asyncHandler(async (req, res) => {
  const result = await getCaseNameListAsync();
  return res.status(200).json({
    success: true,
    CaseNameList: result,
  });
});

export const deleteCaseLog = asyncHandler(async (req, res) => {
  await deleteCaseLogAsync(req.body.logId);
  return res.status(200).json({
    success: true,
    message: "successfully deleted",
  });
});

export const getCaseLogsByCaseId = asyncHandler(async (req, res) => {
  const result = await getCaseLogsByCaseIdAsync(parseInt(req.query.caseId));
  return res.status(200).json({
    success: true,
    caseLogs: result,
  });
});

export const getCaseLogBycaseLogId = asyncHandler(async (req, res) => {
  const result = await getCaseLogBycaseLogIdAsync(parseInt(req.query.logId));
  return res.status(200).json({
    success: true,
    caseLog: result[0],
  });
});

export const getPendingCaseForDashBoard = asyncHandler(async (req, res) => {
  const result = await getPendingCaseForDashBoardAsync(
    req.userInfo.orphanageId
  );
  return res.status(200).json({
    success: true,
    cases: result,
  });
});

export const getOngoingCaseForDashBoard = asyncHandler(async (req, res) => {
  const result = await getOngoingCaseForDashBoardAsync(req.userInfo.orphanageId);
  return res.status(200).json({
    success: true,
    cases: result,
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

export const updateCaseLog = asyncHandler(async (req, res) => {
  await updateCaseLogAsync(req.body);
  return res.status(200).json({
    success: true,
    message: "successfully updated",
  });
});

export const ExternalDashboardChildProfiles = asyncHandler(async (req, res) => {
  const result = await ExternalDashboardChildProfilesAsync(req.userInfo.userId);
  return res.status(200).json({
    success: true,
    count: result[0].count,
  });
});

export const ExternalDashboardCaseAssign = asyncHandler(async (req, res) => {
  const result = await ExternalDashboardCaseAssignAsync(req.userInfo.userId);
  return res.status(200).json({
    success: true,
    count: result[0].count,
  });
});

export const ExternalDashboardPendingCase = asyncHandler(async (req, res) => {
  const result = await ExternalDashboardPendingCaseAsync(req.userInfo.userId);
  return res.status(200).json({
    success: true,
    count: result[0].count,
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
