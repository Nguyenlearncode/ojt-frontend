import { describe, it, expect, vi, beforeEach } from "vitest";
import axiosClient from "../../../../api/axiosClient";
import { testOrderApi } from "../../../../features/patient/api/testOrderApi";

vi.mock("../../../../api/axiosClient", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("testOrderApi", () => {
  beforeEach(() => vi.clearAllMocks());

  it("createTestOrder → POST đúng", () => {
    const data = { a: 1 };
    testOrderApi.createTestOrder(data);
    expect(axiosClient.post).toHaveBeenCalledWith("/patient/testorder/create", data);
  });

  it("createTestOrderForPatient → POST đúng", () => {
    const data = { b: 2 };
    testOrderApi.createTestOrderForPatient("P1", data);
    expect(axiosClient.post).toHaveBeenCalledWith("/patient/testorder/create/P1", data);
  });

  it("getTestOrderDetail → GET đúng", () => {
    testOrderApi.getTestOrderDetail("T01");
    expect(axiosClient.get).toHaveBeenCalledWith("/patient/testorder/detail/T01");
  });

  it("getAllTestOrders → GET đúng", () => {
    testOrderApi.getAllTestOrders();
    expect(axiosClient.get).toHaveBeenCalledWith("/patient/testorder/viewAll");
  });

  it("modifyTestOrder → PATCH đúng", () => {
    const data = { c: 3 };
    testOrderApi.modifyTestOrder("T02", data);
    expect(axiosClient.patch).toHaveBeenCalledWith("/patient/testorder/modify/T02", data);
  });


  it("deleteTestOrder → DELETE đúng", () => {
    testOrderApi.deleteTestOrder("T04");
    expect(axiosClient.delete).toHaveBeenCalledWith("/patient/testorder/delete/T04");
  });

  it("exportTestOrders → GET đúng", () => {
    testOrderApi.exportTestOrders("P01");
    expect(axiosClient.get).toHaveBeenCalledWith(
      "/patient/TestOrderReport/export-excel",
      {
        params: { patientId: "P01" },
        responseType: "blob",
      }
    );
  });

  it("printTestOrder → GET đúng", () => {
    testOrderApi.printTestOrder("T05", "abc.pdf");
    expect(axiosClient.get).toHaveBeenCalledWith(
      "/patient/TestOrderReport/print-pdf/T05",
      {
        params: { fileName: "abc.pdf" },
        responseType: "blob",
      }
    );
  });

  it("reviewTestOrder → PATCH đúng", () => {
    const data = { x: 1 };
    testOrderApi.reviewTestOrder("T11", data);
    expect(axiosClient.patch).toHaveBeenCalledWith(
      "/patient/testorder/review/T11",
      data
    );
  });
});
