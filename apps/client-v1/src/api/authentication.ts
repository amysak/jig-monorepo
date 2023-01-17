import { JwtAccount, SigninDto, SignupDto, TokenPair } from "types";
import { refreshTokenStorage } from "utilities/token-storage";
import { api, apiV2, AsyncResponse } from "./Api";

export async function signIn(
  payload: SigninDto
): AsyncResponse<{ accessToken: string; refreshToken: string }> {
  // return api.post('/auth/signin', payload)

  return apiV2.post("/auth/login", payload);
}

export async function signUp(payload: SignupDto): AsyncResponse<TokenPair> {
  return api.post("/auth/signup", payload);
}

export async function validateToken(): AsyncResponse<{
  ok: boolean;
}> {
  return apiV2.get("/auth/check");
}

export async function getMe(): AsyncResponse<JwtAccount> {
  return apiV2.get("/auth/me");
}

// Potentially a good idea to handle errors right here and re-throw
export async function updateTokenPair(): AsyncResponse<TokenPair> {
  const refreshToken = refreshTokenStorage.get();

  if (!refreshToken) {
    // Can be error bound to display friendly to a user
    throw new Error("No refresh token found");
  }

  return apiV2.post("/auth/refresh", { refreshToken });
}
