import DatabaseHandler from "../lib/database/DatabaseHandler.js";

export const createCaseAsync = async (
  createId,
  { caseName, childProfileId, caseOwnerId, description }
) => {
  return await DatabaseHandler.executeSingleQueryAsync(
    `INSERT INTO "Case" ("CaseName","State", "ChildProfileId","CaseOwnerId","CreatedBy","Description") VALUES ($1,$2, $3, $4, $5,$6) RETURNING *`,
    [caseName, "INVITED", childProfileId, caseOwnerId, createId, description]
  );
};

export const getCaseListasync = async (orphanageId) => {
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

export const getCaseListByUserIdAsync = async (userId) => {
  const result = await DatabaseHandler.executeSingleQueryAsync(
    `SELECT 
      c."Id" AS "CaseId",
      c."CaseName",
      c."Description",
      (SELECT "FullName" AS "ChildName" FROM "ChildProfile" WHERE "Id"=c."ChildProfileId"),
      (SELECT "LoggedDateTime" AS "LastUpdate" FROM "CaseLog" WHERE "CaseLog"."CaseId" = c."Id" ORDER BY "LoggedDateTime" ASC LIMIT 1),
      (SELECT "Name" AS "AssignedBy" FROM "User" WHERE "Id"= c."CreatedBy")
    FROM
      "Case" AS c
    INNER JOIN "SocialWorker" as sw
    ON sw."Id"= c."CaseOwnerId"   
    WHERE "State"='ONGOING'and sw."UserId"=$1 `,
    [userId]
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
      (SELECT "Name" AS "AssignedBy" FROM "User" WHERE "Id"= c."CreatedBy")
    FROM
      "Case" AS c
    INNER JOIN "SocialWorker" as sw
    ON sw."Id"= c."CaseOwnerId"   
    WHERE "State"='INVITED'and sw."UserId"=$1`,
    [userId]
  );
  return result;
};

export const createCaseLogAsync = async ({ caseId, name, description }) => {
  await DatabaseHandler.executeSingleQueryAsync(
    `INSERT INTO "CaseLog" ("CaseId", "LogName","Description") VALUES ($1, $2, $3) RETURNING *`,
    [caseId, name, description]
  );
};

export const getCaseNameListAsync = async () => {
  return await DatabaseHandler.executeSingleQueryAsync(
    `SELECT "Id" AS "CaseId","CaseName" FROM "Case"`
  );
};

export const deleteCaseLogAsync = async (logId) => {
  await DatabaseHandler.executeSingleQueryAsync(
    `DELETE FROM "CaseLog" WHERE "Id" = $1 RETURNING *`,
    [logId]
  );
};

export const getCaseLogsByCaseIdAsync = async (caseId) => {
  return await DatabaseHandler.executeSingleQueryAsync(
    `SELECT cl.*, c."CaseName" FROM "CaseLog" AS cl INNER JOIN "Case" AS c on c."Id"= cl."CaseId" WHERE "CaseId"=$1`,
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

export const updateCaseLogAsync = async ({ id, name, description }) => {
  await DatabaseHandler.executeSingleQueryAsync(
    `
    UPDATE "CaseLog"
      SET
        "LogName" = $1,
        "DEscription" = $2
    WHERE "Id" = $2`,
    [id, name, description]
  );
};
