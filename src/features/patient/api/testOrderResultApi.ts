// src/features/patient/api/testOrderResultApi.ts

import axiosClient from "../../../api/axiosClient";

export const testOrderResultApi = {
  createResult: (data: {
    patientId: string;
    testOrderId: string;
    enteredBy?: string | null;
  }) => axiosClient.post("/patient/CreateResult", data),
};
