import { api, AsyncResponse } from "./Api";

async function sentOTP(payload: any): AsyncResponse<boolean> {
  return api.post("/users/otp", payload);
}

async function verifyPasswordOTP(payload: any): AsyncResponse<boolean> {
  return api.post("/users/otp/verify-password", payload);
}

export { sentOTP, verifyPasswordOTP };
