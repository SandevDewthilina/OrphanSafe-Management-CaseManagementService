import DatabaseHandler from "../lib/database/DatabaseHandler.js";

export const createCaseAsync = async (
  caseName,
  state,
  childProfileID,
  caseOwnerID,
  createID
) => {
  await DatabaseHandler.executeSingleQueryAsync(
    'INSERT INTO "Case" ("CaseName", "State", "ChildProfileId","CaseOwnerId","CreateBy") VALUES ($1, $2, $3, $4, $5)',
    [caseName, state, childProfileID, caseOwnerID, createID]
  );
};

export const getCaseListasync = async () => {
  const result = await DatabaseHandler.executeSingleQueryAsync(
    'SELECT y."CaseId", y."CaseName", cp."Id" AS "ChildId", cp."FirstName" ||$1|| cp."LastName" AS "ChildName", y."CreateBy", y."CaseOwner",(SELECT "LoggedDateTime" AS "LastUpdate" FROM "CaseLog" WHERE y."CaseId" = "CaseId" ORDER BY "LoggedDateTime" ASC LIMIT 1) FROM (SELECT x."Name" AS "CreateBy",v."Name" AS "CaseOwner",x."ChildProfileId",x."CaseId",x."CaseName" FROM (SELECT u."Name",c."ChildProfileId",c."CaseOwnerId",c."Id" AS "CaseId",c."CaseName"  FROM "Case" AS c INNER JOIN "User" AS u ON u."Id" = c."CreateBy") AS x INNER JOIN "User" AS v ON v."Id" = x."CaseOwnerId") AS y INNER JOIN "ChildProfile" AS cp ON y."ChildProfileId" = cp."Id"',
    [" "]
  );
  return result;
};

export const getCaseInfoByCaseIdasync = async (caseId) => {
  const result = await DatabaseHandler.executeSingleQueryAsync(
    'SELECT y."CaseId", y."CaseName",y."description", cp."Id" AS "ChildId", cp."FirstName" ||$1|| cp."LastName" AS "ChildName", y."CreateBy", y."CaseOwner",(SELECT "LoggedDateTime" AS "LastUpdate" FROM "CaseLog" WHERE y."CaseId" = "CaseId" ORDER BY "LoggedDateTime" ASC LIMIT 1),(SELECT "LoggedDateTime" AS "StartedDate" FROM "CaseLog" WHERE y."CaseId" = "CaseId" ORDER BY "LoggedDateTime" DESC LIMIT 1) FROM (SELECT x."Name" AS "CreateBy",v."Name" AS "CaseOwner",x."ChildProfileId",x."CaseId",x."CaseName",x."description" FROM (SELECT u."Name",c."ChildProfileId",c."CaseOwnerId",c."Id" AS "CaseId",c."CaseName",c."description" FROM "Case" AS c INNER JOIN "User" AS u ON u."Id" = c."CreateBy") AS x INNER JOIN "User" AS v ON v."Id" = x."CaseOwnerId") AS y INNER JOIN "ChildProfile" AS cp ON y."ChildProfileId" = cp."Id" WHERE "CaseId"= $2',
    [" ", caseId]
  );
  return result;
};

