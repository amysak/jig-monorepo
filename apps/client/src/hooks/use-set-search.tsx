import { useNavigate } from "@tanstack/react-location";
import { merge } from "lodash-es";

import { LocationGenerics } from "router";
import { cleanObject } from "utilities/functions";

export type UseSetSearchProps = {
  clean?: boolean;
};

export const useSetSearch = () => {
  const navigate = useNavigate<LocationGenerics>();

  const set = (
    search: LocationGenerics["Search"],
    options?: UseSetSearchProps
  ) =>
    navigate({
      search: (old) => {
        if (!old) return search;
        if (options?.clean) {
          return cleanObject(search);
        }

        const mergedSearch = merge({}, old, search);
        const cleanedSearch = cleanObject(mergedSearch);

        return cleanedSearch;
      },
      // replace: true,
    });

  return [set];
};
