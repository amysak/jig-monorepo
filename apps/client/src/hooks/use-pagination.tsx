import { useNavigate } from "@tanstack/react-location";
import { merge } from "antd/es/theme/util/statistic";
import { useCallback } from "react";

import { LocationGenerics } from "router";
import { cleanObject } from "utilities/functions";

export const useSetSearch = () => {
  const navigate = useNavigate<LocationGenerics>();

  const set = (search: LocationGenerics["Search"]) => {
    navigate({
      search: (old) => {
        if (!old) return search;
        return cleanObject(merge(old, search));
      },
      // replace: true,
    });
  };

  const clear = useCallback(() => {
    navigate({
      search: () => ({}),
    });
  }, [navigate]);

  return [set, clear];
};
