import { merge } from "lodash-es";

import { useNavigate } from "hooks/router";
import { cleanObject } from "lib/functions";
import { LocationGenerics } from "router";

export type UseSetSearchProps = {
  clean?: boolean;
};

export const useSetSearch = () => {
  const navigate = useNavigate();

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
