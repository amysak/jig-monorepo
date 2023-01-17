import { Account, GetMeResult, TokenPair } from "type-defs";
import { refreshTokenStorage } from "utilities/token-storage";
import { client } from "../http";

export async function signIn(payload: {
  email: string;
  password: string;
}): Promise<{ accessToken: string; refreshToken: string }> {
  // return api.post('/auth/signin', payload)

  return client.post("/auth/login", payload);
}

export async function signUp(payload: Partial<Account>): Promise<TokenPair> {
  return client.post("/auth/signup", payload);
}

export async function getMe(): Promise<GetMeResult> {
  return client.get("/auth/me");
}

// Potentially a good idea to handle errors right here and re-throw
export async function updateTokenPair(): Promise<TokenPair> {
  const refreshToken = refreshTokenStorage.get();

  if (!refreshToken) {
    // Can be error bound to display friendly to a user
    throw new Error("No refresh token found");
  }

  return client.post("/auth/refresh", { refreshToken });
}
