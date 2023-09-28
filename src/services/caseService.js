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
      y."CaseId",
      y."CaseName",
      y."Description",
      cp."Id" AS "ChildId",
      cp."FullName" AS "ChildName",
      y."CreatedBy",
      y."CaseOwner",
      (SELECT "LoggedDateTime" AS "LastUpdate" FROM "CaseLog" WHERE y."CaseId" = "CaseId" ORDER BY "LoggedDateTime" ASC LIMIT 1),
      (SELECT "LoggedDateTime" AS "StartedDate" FROM "CaseLog" WHERE y."CaseId" = "CaseId" ORDER BY "LoggedDateTime" DESC LIMIT 1)
    FROM
      (SELECT
        x."Name" AS "CreateBy",
        v."Name" AS "CaseOwner",
        x."ChildProfileId",
        x."CaseId",
        x."CaseName",
        x."Description"
      FROM
        (SELECT
          u."Name",
          c."ChildProfileId",
          c."CaseOwnerId",
          c."Id" AS "CaseId",
          c."CaseName",
          c."Description"
        FROM
          "Case" AS c
        INNER JOIN
          "User" AS u
        ON u."Id" = c."CreateBy") AS x
      INNER JOIN
        "User" AS v
      ON v."Id" = x."CaseOwnerId") AS y
    INNER JOIN
      "ChildProfile" AS cp
    ON y."ChildProfileId" = cp."Id"
    WHERE "CaseId"= $1`,
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
