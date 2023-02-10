import { merge } from "lodash-es";
import { proxy, subscribe, useSnapshot } from "valtio";

export type TokenType = "access" | "refresh";

type TokenStore = {
  [key in TokenType]: string | null;
};

const initialStore: TokenStore = {
  access: null,
  refresh: null,
};
const retrievedStore = localStorage.getItem("tokens");

export const tokenStore = proxy<TokenStore>(
  retrievedStore
    ? merge(initialStore, JSON.parse(retrievedStore))
    : initialStore
);

export const tokenActions = {
  set(tokenType: TokenType, token: string) {
    tokenStore[tokenType] = token;
  },
  get(tokenType: TokenType) {
    return tokenStore[tokenType];
  },
};

export const useTokens = () => {
  return useSnapshot(tokenStore);
};

subscribe(tokenStore, () => {
  localStorage.setItem("tokens", JSON.stringify(tokenStore));
});
