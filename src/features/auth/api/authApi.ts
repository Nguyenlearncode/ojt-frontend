import axiosClient from "../../../api/axiosClient";

export const authApi = {
  login: async (data: { email: string; password: string }) => {
    // 🔹 Dùng API thật:
    // return axiosClient.post("/auth/login", data);

    // 🔹 Mock login để test:
    await new Promise((res) => setTimeout(res, 1000));
    if (data.email === "admin@example.com" && data.password === "123456") {
      return { success: true, token: "fake-jwt-token" };
    }
    return { success: false };
  },
};
