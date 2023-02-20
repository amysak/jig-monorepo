import { User, GetMeResult, TokenPair } from "type-defs";
import { client } from "../http";

export async function signIn(payload: {
  email: string;
  password: string;
}): Promise<{ accessToken: string; refreshToken: string }> {
  // return api.post('/auth/signin', payload)

  return client.post("/auth/login", payload);
}

export async function signUp(payload: Partial<User>): Promise<TokenPair> {
  return client.post("/auth/signup", payload);
}

export async function getMe(): Promise<GetMeResult> {
  return client.get("/auth/me");
}

// Potentially a good idea to handle errors right here and re-throw
export async function updateTokenPair(
  refreshToken: string
): Promise<TokenPair> {
  return client.post("/auth/refresh", { refreshToken });
}
