import DatabaseHandler from "../lib/database/DatabaseHandler.js";

export const createCaseAsync = async (
  caseName,
  childProfileID,
  caseOwnerID,
  createID,
  description
) => {
  await DatabaseHandler.executeSingleQueryAsync(
    `INSERT INTO "Case" ("CaseName","State", "ChildProfileId","CaseOwnerId","CreatedBy","Description") VALUES ($1,$2, $3, $4, $5,$6)`,
    [caseName, "INVITED", childProfileID, caseOwnerID, createID, description]
  );
};

export const getCaseListasync = async (orphanageId) => {
  console.log(orphanageId);
  const result = await DatabaseHandler.executeSingleQueryAsync(
    `SELECT 
      c."Id",
      c."CaseName",
      c."State",
      u."Name" AS "SocialWorkerName",
      (SELECT "Name" AS "CreatedBy"FROM "User" WHERE "Id"= c."CreatedBy"),
      (SELECT "LoggedDateTime" AS "LastUpdate" FROM "CaseLog" WHERE "CaseLog"."CaseId" = c."Id" ORDER BY "LoggedDateTime" ASC LIMIT 1),
      (SELECT "FullName" as "ChildName"FROM "ChildProfile" AS cp WHERE cp."Id" = c."ChildProfileId")
    FROM
      "Case" AS c
    INNER JOIN "User" AS u
      INNER JOIN "SocialWorker" AS sw
      ON sw."UserId" = u."Id"
    ON sw."Id" = c."CaseOwnerId"
    WHERE "OrphanageId" = $1 `,
    [orphanageId]
  );
  return result;
};

export const getCaseInfoByCaseIdasync = async (caseId) => {
  const result = await DatabaseHandler.executeSingleQueryAsync(
    `SELECT 
      c."Id",
      c."CaseName",
      c."State",
      u."Name" AS "SocialWorkerName",
      c."Description",
      c."ChildProfileId",
      c."CreatedAt",
      (SELECT "Name" AS "CreatedBy"FROM "User" WHERE "Id"= c."CreatedBy"),
      (SELECT "LoggedDateTime" AS "LastUpdate" FROM "CaseLog" WHERE "CaseLog"."CaseId" = c."Id" ORDER BY "LoggedDateTime" ASC LIMIT 1),
      (SELECT "FullName" as "ChildName"FROM "ChildProfile" AS cp WHERE cp."Id" = c."ChildProfileId")
    FROM
      "Case" AS c
    INNER JOIN "User" AS u
      INNER JOIN "SocialWorker" AS sw
      ON sw."UserId" = u."Id"
    ON sw."Id" = c."CaseOwnerId"
    WHERE c."Id" = $1`,
    [caseId]
  );
  return result;
};

export const getCaseInvitationByUserIdasync = async (userId) => {
  const result = await DatabaseHandler.executeSingleQueryAsync(
    `SELECT 
      c."Id" AS "CaseId",
      c."CaseName",
      c."Description",
      (SELECT "FullName" AS "ChildName" FROM "ChildProfile" WHERE "Id"=c."ChildProfileId"),
      (SELECT "Name" AS "AssignedBy" FROM "User" WHERE "Id"= c."CreateBy")
    FROM
      "Case" AS c
    WHERE "State"='INVITED' AND "CaseOwnerId"= $1`,
    [userId]
  );
  return result;
};

export const createCaseLogAsync = async (
  caseId,
  logName,
  logDescription,
  logDocumentId
) => {
  await DatabaseHandler.executeSingleQueryAsync(
    `INSERT INTO "CaseLog" ("CaseId", "LogName","DocumentCollectionID","Description") VALUES ($1, $2, $3, $4)`,
    [caseId, logName, logDocumentId, logDescription]
  );
};

export const getCaseNameListAsync = async () => {
  return await DatabaseHandler.executeSingleQueryAsync(
    `SELECT "Id" AS "CaseId","CaseName" FROM "Case"`
  );
};

export const deleteCaseLogAsync = async (caseId) => {
  await DatabaseHandler.executeSingleQueryAsync(
    `DELETE FROM "CaseLog" WHERE "Id" = (SELECT Max("Id") FROM "CaseLog" WHERE "CaseId" = $1) RETURNING *`,
    [caseId]
  );
};

export const updateCaseStateAsync = async (response, caseId) => {
  await DatabaseHandler.executeSingleQueryAsync(
    `
    UPDATE "Case"
      SET "State" = $1
    WHERE "Id" = $2`,
    [response, caseId]
  );
};
