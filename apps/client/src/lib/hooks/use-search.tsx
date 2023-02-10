import { useNavigate, useRouter } from "@tanstack/react-router";
import { merge } from "lodash-es";

import { cleanObject } from "lib/functions";

export type UseSetSearchProps = {
  clean?: boolean;
  assign?: boolean;
};

// Not to be confused with useSearch from react-router.
// This hook is made for retrieving global params directly from router, rather than the route.
// It is also used to effectively manipulate the search params
export function useSetSearch() {
  const { search } = useRouter().state.currentLocation;
  const navigate = useNavigate();

  // TODO: review opts
  const set = (search: Record<string, unknown>, options?: UseSetSearchProps) =>
    navigate({
      search: (old) => {
        if (!old) return search;
        if (options?.clean) {
          return cleanObject(search);
        }

        let mergedSearch;

        if (!options?.assign) {
          mergedSearch = merge({}, old, search);
        } else {
          mergedSearch = Object.assign(old, search);
        }
        const cleanSearch = cleanObject(mergedSearch);
        return cleanSearch;
      },
      // replace: true,
    });

  return [set, search] as const;
}
