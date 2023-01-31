import { TOKEN_KEY } from "./envs";

class TokenStorage {
  constructor(private key: string) {}

  set(token: string) {
    return localStorage.setItem(this.key, token);
  }

  get(): string | null {
    return localStorage.getItem(this.key);
  }

  clear() {
    return localStorage.removeItem(this.key);
  }
}

export const tokenStorage = new TokenStorage(TOKEN_KEY);

export const refreshTokenStorage = new TokenStorage(TOKEN_KEY + "_REFRESH");
