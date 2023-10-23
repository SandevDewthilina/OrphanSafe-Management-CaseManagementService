import supertest from "supertest";
import { describe, expect, it } from "vitest";
import jwt from "jsonwebtoken";
import { app } from "../server";

describe("-- Case Testing --", () => {
  describe("__GET REQUEST__", () => {
    it("(01) get case list (/api/case/getCaseList) --> orphanage manager", async () => {
      const payload = {
        userId: "37cde877-faa9-4106-9a71-7755d689692d",
        email: "thamindu@orphansafe.com",
        roleId: "27697a04-d351-4b59-97a3-c8c04980ea10",
        roleName: "orphanageManager",
        orphanageId: "bb190a0d-046f-455f-a03b-9908c07dc2ff",
      };
      const testToken = jwt.sign(payload, process.env.JWT_SECRET);
      const response = await supertest(app)
        .get("/api/case/getCaseList")
        .set("Cookie", [`jwt=${testToken}`]);

      console.log(response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body.caseList).toBeDefined();
    });
    it("(02) get case list by user Id (/api/case/getCaseListByUserId) --> social worker", async () => {
      const payload = {
        userId: "cc6214e0-e6d6-4f6f-9b73-4d7f69251179",
        email: "kapila@orphansafe.com",
        roleId: "da40348a-8c0f-41b4-902a-a28e3f5259af",
        roleName: "socialWorker",
        orphanageId: "bb190a0d-046f-455f-a03b-9908c07dc2ff",
      };
      const testToken = jwt.sign(payload, process.env.JWT_SECRET);
      const response = await supertest(app)
        .get("/api/case/getCaseListByUserId")
        .set("Cookie", [`jwt=${testToken}`]);

      console.log(response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body.caseList).toBeDefined();
    });
    it("(03) get case list by user Id (/api/case/getCaseInfoByCaseId) --> orphanage manager", async () => {
      const payload = {
        userId: "37cde877-faa9-4106-9a71-7755d689692d",
        email: "thamindu@orphansafe.com",
        roleId: "27697a04-d351-4b59-97a3-c8c04980ea10",
        roleName: "orphanageManager",
        orphanageId: "bb190a0d-046f-455f-a03b-9908c07dc2ff",
      };
      const testToken = jwt.sign(payload, process.env.JWT_SECRET);
      const response = await supertest(app)
        .get(`/api/case/getCaseInfoByCaseId?caseId=${37}`)
        .set("Cookie", [`jwt=${testToken}`]);

      console.log(response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body.caseInfo).toBeDefined();
    });
    it("(04) get case Ib=nvitations by specific userId (/api/case/getCaseInvitationByUserId)  --> social worker", async () => {
      const payload = {
        userId: "cc6214e0-e6d6-4f6f-9b73-4d7f69251179",
        email: "kapila@orphansafe.com",
        roleId: "da40348a-8c0f-41b4-902a-a28e3f5259af",
        roleName: "socialWorker",
        orphanageId: "bb190a0d-046f-455f-a03b-9908c07dc2ff",
      };
      const testToken = jwt.sign(payload, process.env.JWT_SECRET);
      const response = await supertest(app)
        .get(`/api/case/getCaseInvitationByUserId`)
        .set("Cookie", [`jwt=${testToken}`]);

      console.log(response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body.caseInvitations).toBeDefined();
    });
    it("(05) get case logs by case Id (/api/case/getCaseLogsByCaseId)  --> social worker", async () => {
      const payload = {
        userId: "cc6214e0-e6d6-4f6f-9b73-4d7f69251179",
        email: "kapila@orphansafe.com",
        roleId: "da40348a-8c0f-41b4-902a-a28e3f5259af",
        roleName: "socialWorker",
        orphanageId: "bb190a0d-046f-455f-a03b-9908c07dc2ff",
      };
      const testToken = jwt.sign(payload, process.env.JWT_SECRET);
      const response = await supertest(app)
        .get(`/api/case/getCaseLogsByCaseId?caseId=${24}`)
        .set("Cookie", [`jwt=${testToken}`]);

      console.log(response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body.caseLogs).toBeDefined();
    });
    it("(06) get case log information by specific log id (/api/case/getCaseLogBycaseLogId) --> orphanage manager", async () => {
      const payload = {
        userId: "37cde877-faa9-4106-9a71-7755d689692d",
        email: "thamindu@orphansafe.com",
        roleId: "27697a04-d351-4b59-97a3-c8c04980ea10",
        roleName: "orphanageManager",
        orphanageId: "bb190a0d-046f-455f-a03b-9908c07dc2ff",
      };
      const testToken = jwt.sign(payload, process.env.JWT_SECRET);
      const response = await supertest(app)
        .get(`/api/case/getCaseLogBycaseLogId?logId=${6}`)
        .set("Cookie", [`jwt=${testToken}`]);

      console.log(response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body.caseLog).toBeDefined();
    });
    it("(07) get latest case for dashboard (/api/case/getOngoingCaseForDashBoard) --> orphanage manager", async () => {
      const payload = {
        userId: "37cde877-faa9-4106-9a71-7755d689692d",
        email: "thamindu@orphansafe.com",
        roleId: "27697a04-d351-4b59-97a3-c8c04980ea10",
        roleName: "orphanageManager",
        orphanageId: "bb190a0d-046f-455f-a03b-9908c07dc2ff",
      };
      const testToken = jwt.sign(payload, process.env.JWT_SECRET);
      const response = await supertest(app)
        .get(`/api/case/getOngoingCaseForDashBoard`)
        .set("Cookie", [`jwt=${testToken}`]);

      console.log(response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body.cases).toBeDefined();
    });
  });
  describe("__POST REQUEST__", () => {
    it("(01) create a case but case name already exist (/api/case/createCase)", async () => {
      const payload = {
        userId: "37cde877-faa9-4106-9a71-7755d689692d",
        email: "thamindu@orphansafe.com",
        roleId: "27697a04-d351-4b59-97a3-c8c04980ea10",
        roleName: "orphanageManager",
        orphanageId: "bb190a0d-046f-455f-a03b-9908c07dc2ff",
      };
      const testToken = jwt.sign(payload, process.env.JWT_SECRET);
      const response = await supertest(app)
        .post("/api/case/createCase")
        .send({
          caseName: "a new case",
          childProfileId: "95abb6f6-2abf-428e-ab49-9a7e872b3542",
          caseOwnerId: "eaecfe7b-2ab4-4307-8548-57f2dded176c",
          description: "for testing",
        })
        .set("Cookie", [`jwt=${testToken}`]);

      console.log(response.body);
      expect(response.statusCode).toBe(400);
    });
    it("(02) create a case log but case name already exist (/api/case/createCaseLog)", async () => {
      const payload = {
        userId: "37cde877-faa9-4106-9a71-7755d689692d",
        email: "thamindu@orphansafe.com",
        roleId: "27697a04-d351-4b59-97a3-c8c04980ea10",
        roleName: "orphanageManager",
        orphanageId: "bb190a0d-046f-455f-a03b-9908c07dc2ff",
      };
      const formData = new FormData();
      formData.append("caseLogDoc", null);
      formData.append(
        "otherInfo",
        JSON.stringify({
          caseId: 26,
          name: "logName",
          description: "logDescription",
        })
      );
      //console.log(formData);
      const testToken = jwt.sign(payload, process.env.JWT_SECRET);
      const response = await supertest(app)
        .post("/api/case/createCaseLog")
        .field("caseLogDoc", "asd")
        .field(
          "otherInfo",
          JSON.stringify({
            caseId: 26,
            name: "logName",
            description: "logDescription",
          })
        )
        .set("Cookie", [`jwt=${testToken}`]);

      console.log(response.body);
      expect(response.statusCode).toBe(400);
    });
  });
  describe("__PUT REQUEST__", () => {
    it("(01) update case state (/api/case/updateCaseState)", async () => {
      const payload = {
        userId: "37cde877-faa9-4106-9a71-7755d689692d",
        email: "thamindu@orphansafe.com",
        roleId: "27697a04-d351-4b59-97a3-c8c04980ea10",
        roleName: "orphanageManager",
        orphanageId: "bb190a0d-046f-455f-a03b-9908c07dc2ff",
      };
      const testToken = jwt.sign(payload, process.env.JWT_SECRET);
      const response = await supertest(app)
        .put("/api/case/updateCaseState")
        .send({
          response: "REJECTED",
          caseId: 20,
        })
        .set("Cookie", [`jwt=${testToken}`]);

      console.log(response.body);
      expect(response.statusCode).toBe(200);
    });
    it("(02) update case log (/api/case/updateCaseLog)", async () => {
      const payload = {
        userId: "37cde877-faa9-4106-9a71-7755d689692d",
        email: "thamindu@orphansafe.com",
        roleId: "27697a04-d351-4b59-97a3-c8c04980ea10",
        roleName: "orphanageManager",
        orphanageId: "bb190a0d-046f-455f-a03b-9908c07dc2ff",
      };
      const testToken = jwt.sign(payload, process.env.JWT_SECRET);
      const response = await supertest(app)
        .put("/api/case/updateCaseLog")
        .send({
          id: 37,
          name: "abcd",
          description: "description",
        })
        .set("Cookie", [`jwt=${testToken}`]);

      console.log(response.body);
      expect(response.statusCode).toBe(200);
    });
  });
  describe("__DELETE REQUEST__", () => {
    it("(01) delete case log (/api/case/deleteCaseLog)", async () => {
      const payload = {
        userId: "37cde877-faa9-4106-9a71-7755d689692d",
        email: "thamindu@orphansafe.com",
        roleId: "27697a04-d351-4b59-97a3-c8c04980ea10",
        roleName: "orphanageManager",
        orphanageId: "bb190a0d-046f-455f-a03b-9908c07dc2ff",
      };
      const testToken = jwt.sign(payload, process.env.JWT_SECRET);
      const response = await supertest(app)
        .delete("/api/case/deleteCaseLog")
        .send({
          logId: 52,
        })
        .set("Cookie", [`jwt=${testToken}`]);

      console.log(response.body);
      expect(response.statusCode).toBe(200);
    });
  });
});
