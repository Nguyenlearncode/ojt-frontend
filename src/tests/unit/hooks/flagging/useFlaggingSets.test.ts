import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useFlaggingSets } from "../../../../features/flagging/hooks/useFlaggingSets";
import { flaggingSetApi } from "../../../../features/patient/api/flaggingSetApi";

// ⛔ Chặn useEffect để hook KHÔNG tự fetchConfigs() khi render
vi.mock("react", async () => {
  const actual = await vi.importActual<any>("react");
  return {
    ...actual,
    useEffect: vi.fn(),  // 👈 CHẶN useEffect
  };
});

// Mock API
vi.mock("../../../../features/patient/api/flaggingSetApi", () => ({
  flaggingSetApi: {
    getAllFlaggingConfigs: vi.fn(),
    createFlaggingConfig: vi.fn(),
    updateFlaggingConfig: vi.fn(),
  },
}));

// Mock Chakra toast
vi.mock("@chakra-ui/react", () => ({
  useToast: () => () => {}, 
}));

beforeEach(() => {
  vi.clearAllMocks();
  (flaggingSetApi.getAllFlaggingConfigs as any).mockResolvedValue({ data: [] });
  (flaggingSetApi.createFlaggingConfig as any).mockResolvedValue({});
  (flaggingSetApi.updateFlaggingConfig as any).mockResolvedValue({});
});

describe("useFlaggingSets (simple)", () => {
  it("fetchConfigs → API được gọi", () => {
    const { result } = renderHook(() => useFlaggingSets());

    act(() => {
      result.current.fetchConfigs();
    });

    expect(flaggingSetApi.getAllFlaggingConfigs).toHaveBeenCalledTimes(1);
  });

  it("createConfig → gọi API", async () => {
    const { result } = renderHook(() => useFlaggingSets());

    await act(async () => {
      await result.current.createConfig({ testName: "HB" });
    });

    expect(flaggingSetApi.createFlaggingConfig).toHaveBeenCalledTimes(1);
  });

  it("updateConfig → gọi API", async () => {
    const { result } = renderHook(() => useFlaggingSets());

    await act(async () => {
      await result.current.updateConfig(10, { testName: "GLU" });
    });

    expect(flaggingSetApi.updateFlaggingConfig).toHaveBeenCalledTimes(1);
  });
});
