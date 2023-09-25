CREATE TABLE "Case" (
  "Id" SERIAL PRIMARY KEY,
  "CaseName" varchar(225) NOT NULL,
  "State" varchar(10) NOT NULL,
  "ChildProfileId" uuid NOT NULL,
  "CaseOwnerId" uuid NOT NULL,
  "CreateBy" uuid NOT NULL, 
  CONSTRAINT "FK_Case.CaseOwnerId"
    FOREIGN KEY ("CaseOwnerId")
      REFERENCES "User"("Id") ON DELETE CASCADE,
  CONSTRAINT "FK_Case.CreateBy"
    FOREIGN KEY ("CreateBy")
      REFERENCES "User"("Id") ON DELETE CASCADE,
  CONSTRAINT "FK_Case.ChildProfileId"
    FOREIGN KEY ("ChildProfileId")
      REFERENCES "ChildProfile"("Id") ON DELETE CASCADE
);

CREATE TABLE "CaseLog" (
  "Id" int PRIMARY KEY,
  "CaseId" int NOT NULL,
  "LogDescription" varchar(225) NOT NULL,
  "LoggedDateTime" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "DocumentCollectionID" int,
  CONSTRAINT "FK_CaseLog.CaseId"
    FOREIGN KEY ("CaseId")
      REFERENCES "Case"("Id") ON DELETE CASCADE
);