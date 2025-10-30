import { describe, it, expect, beforeEach, vi, type Mock } from "vitest";

// 🧩 Mock axiosClient module
vi.mock("../../../../api/axiosClient", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

import axiosClient from "../../../../api/axiosClient";
import { userApi } from "../../../../features/user/api/userApi";

describe("userApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 🧪 getAllUsers
  describe("getAllUsers", () => {
    it("calls axiosClient.get with correct path and returns users", async () => {
      const mockUsers = [{ userId: "1", fullName: "John Doe" }];
      (axiosClient.get as unknown as Mock).mockResolvedValueOnce({ data: mockUsers });

      const result = await userApi.getAllUsers();

      expect(axiosClient.get).toHaveBeenCalledWith("/users/getalluser");
      expect(result).toEqual(mockUsers);
    });

    it("returns empty array when data is undefined", async () => {
      (axiosClient.get as unknown as Mock).mockResolvedValueOnce({ data: undefined });

      const result = await userApi.getAllUsers();

      expect(result).toEqual([]);
    });

    it("propagates error when axiosClient.get rejects", async () => {
      (axiosClient.get as unknown as Mock).mockRejectedValueOnce(new Error("network error"));

      await expect(userApi.getAllUsers()).rejects.toThrow("network error");
    });
  });

  // 🧪 getUserById
  describe("getUserById", () => {
    it("calls axiosClient.get with correct userId and returns user", async () => {
      const mockUser = { userId: "1", fullName: "Alice" };
      (axiosClient.get as unknown as Mock).mockResolvedValueOnce({ data: mockUser });

      const result = await userApi.getUserById("1");

      expect(axiosClient.get).toHaveBeenCalledWith("/users/1");
      expect(result).toEqual(mockUser);
    });

    it("throws error when axiosClient.get fails", async () => {
      (axiosClient.get as unknown as Mock).mockRejectedValueOnce(new Error("not found"));

      await expect(userApi.getUserById("404")).rejects.toThrow("not found");
    });
  });

  // 🧪 lockUser
  describe("lockUser", () => {
    it("calls axiosClient.post with /users/:id/lock", async () => {
      (axiosClient.post as unknown as Mock).mockResolvedValueOnce({ status: 200 });

      await userApi.lockUser("123");
      expect(axiosClient.post).toHaveBeenCalledWith("/users/123/lock");
    });

    it("throws error when axiosClient.post fails", async () => {
      (axiosClient.post as unknown as Mock).mockRejectedValueOnce(new Error("lock failed"));

      await expect(userApi.lockUser("999")).rejects.toThrow("lock failed");
    });
  });

  // 🧪 unlockUser
  describe("unlockUser", () => {
    it("calls axiosClient.post with /users/:id/unlock", async () => {
      (axiosClient.post as unknown as Mock).mockResolvedValueOnce({ status: 200 });

      await userApi.unlockUser("123");
      expect(axiosClient.post).toHaveBeenCalledWith("/users/123/unlock");
    });

    it("throws error when axiosClient.post fails", async () => {
      (axiosClient.post as unknown as Mock).mockRejectedValueOnce(new Error("unlock failed"));

      await expect(userApi.unlockUser("999")).rejects.toThrow("unlock failed");
    });
  });

  // 🧪 deleteUserPermanently
  describe("deleteUserPermanently", () => {
    it("calls axiosClient.delete with correct path", async () => {
      (axiosClient.delete as unknown as Mock).mockResolvedValueOnce({ status: 204 });

      await userApi.deleteUserPermanently("123");
      expect(axiosClient.delete).toHaveBeenCalledWith("/users/123/permanent");
    });

    it("throws error when axiosClient.delete fails", async () => {
      (axiosClient.delete as unknown as Mock).mockRejectedValueOnce(new Error("delete failed"));

      await expect(userApi.deleteUserPermanently("321")).rejects.toThrow("delete failed");
    });
  });

  // 🧪 createUser
  describe("createUser", () => {
    it("calls axiosClient.post with correct path and payload, returns data", async () => {
      const payload = { fullName: "Bob", email: "bob@mail.com" };
      const mockResponse = { data: { userId: "u1", ...payload } };
      (axiosClient.post as unknown as Mock).mockResolvedValueOnce(mockResponse);

      const result = await userApi.createUser(payload as any);

      expect(axiosClient.post).toHaveBeenCalledWith("/users/create", payload);
      expect(result).toEqual(mockResponse.data);
    });

    it("throws error when axiosClient.post fails", async () => {
      (axiosClient.post as unknown as Mock).mockRejectedValueOnce(new Error("create fail"));

      await expect(userApi.createUser({} as any)).rejects.toThrow("create fail");
    });
  });

  // 🧪 updateUser
  describe("updateUser", () => {
    it("calls axiosClient.put with correct userId and payload, returns data", async () => {
      const payload = { fullName: "Updated User" };
      const mockResponse = { data: { ...payload, userId: "123" } };
      (axiosClient.put as unknown as Mock).mockResolvedValueOnce(mockResponse);

      const result = await userApi.updateUser("123", payload);

      expect(axiosClient.put).toHaveBeenCalledWith("/users/123", payload);
      expect(result).toEqual(mockResponse.data);
    });

    it("throws error when axiosClient.put fails", async () => {
      (axiosClient.put as unknown as Mock).mockRejectedValueOnce(new Error("update fail"));

      await expect(userApi.updateUser("456", {})).rejects.toThrow("update fail");
    });
  });
});
