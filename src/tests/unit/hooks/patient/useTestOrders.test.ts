import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { useTestOrders } from "../../../../features/patient/hooks/useTestOrders";
import { testOrderApi } from "../../../../features/patient/api/testOrderApi";

vi.mock("../../../../features/patient/api/testOrderApi", () => ({
  testOrderApi: {
    createTestOrder: vi.fn(),
    createTestOrderForPatient: vi.fn(),
    getTestOrderDetail: vi.fn(),
    getAllTestOrders: vi.fn(),
    modifyTestOrder: vi.fn(),
    updateTestOrderStatus: vi.fn(),
    deleteTestOrder: vi.fn(),
    exportTestOrders: vi.fn(),
    printTestOrder: vi.fn(),
    reviewTestOrder: vi.fn(),
  },
}));

vi.mock("../../../../features/patient/api/flaggingSetApi", () => ({
  flaggingSetApi: {
    applyFlags: vi.fn(),
  },
}));

describe("useTestOrders", () => {
  it("createTestOrder → gọi API", async () => {
    (testOrderApi.createTestOrder as any).mockResolvedValue({});

    const { result } = renderHook(() => useTestOrders());

    await act(async () => {
      await result.current.createTestOrder({ createdBy: "U1" });
    });

    expect(testOrderApi.createTestOrder).toHaveBeenCalled();
  });

  it("getAllTestOrders → return data", async () => {
    (testOrderApi.getAllTestOrders as any).mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useTestOrders());

    await act(async () => await result.current.getAllTestOrders());

    expect(testOrderApi.getAllTestOrders).toHaveBeenCalled();
  });

  it("deleteTestOrder → gọi API", async () => {
    (testOrderApi.deleteTestOrder as any).mockResolvedValue({});

    const { result } = renderHook(() => useTestOrders());

    await act(async () => result.current.deleteTestOrder("T1"));

    expect(testOrderApi.deleteTestOrder).toHaveBeenCalled();
  });
});
