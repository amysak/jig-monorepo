import type { GetMeResult, HttpError } from "type-defs";
import { useMutation, useQuery } from "@tanstack/react-query";

import { api } from "api";
import { refreshTokenStorage, tokenStorage } from "utilities/token-storage";

// for reference

// let Element = data.element;

// switch (true) {
//   case authCtx.isAuthenticated && data.isAuth:
//     Element = IndexPage;
//     break;

//   case authCtx.isAuthenticated && hasAccount && !hasCard:
//     Element = GettingStarted;
//     break;

//   case authCtx.loaded &&
//     !authCtx.isAuthenticated &&
//     !hasAccount &&
//     data.isPrivate:
//   case authCtx.loaded && !authCtx.isAuthenticated && data.isPrivate:
//     Element = SignIn;
//     break;

//   default:
//     break;
// }

export const useAuthorization = () => {
  const { mutate: updateTokens, isLoading: isUpdatingTokens } = useMutation(
    api.auth.updateTokenPair,
    {
      onError: (error: HttpError) => {
        console.error("ERROR =========> ", error);

        // return navigate("/signin");
      },
      onSuccess: (tokens) => {
        refetchMe();
        tokenStorage.set(tokens.accessToken);
        refreshTokenStorage.set(tokens.refreshToken);

        api._client.setAuthorizationToken(tokens.accessToken);
      },
    }
  );

  const {
    data: account,
    isLoading: isFetchingUserAccount,
    refetch: refetchMe,
  } = useQuery<GetMeResult, HttpError>(
    ["account", "me"],
    async () => {
      const me = await api.auth.getMe();

      return { ...me, isAuthenticated: !!me.account };
    },
    {
      retry: false,
      staleTime: 60000,
      onError: (error) => {
        console.error("ERROR =========> ", error);

        if (error?.statusCode === 401) {
          // User is not authenticated and we need to refresh the token if refresh token is available
          // Or force user to login page
          const refreshToken = refreshTokenStorage.get();

          if (!refreshToken) {
            return;
          }

          return updateTokens();
        }

        // if (error.statusCode === 400) {
        //   return
        // }
      },
    }
  );

  return {
    data: account,
    isLoading: isUpdatingTokens || isFetchingUserAccount,
  };
};
