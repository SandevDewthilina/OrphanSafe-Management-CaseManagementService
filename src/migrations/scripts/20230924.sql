ALTER TABLE "Case" ADD "description" varchar(255) NOT NULL DEFAULT '' ;
ALTER TABLE "CaseLog" RENAME COLUMN "LogDescription" TO "LogName";