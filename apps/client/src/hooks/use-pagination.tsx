import { useNavigate } from "@tanstack/react-location";
import { useCallback } from "react";
import { LocationGenerics } from "router";

import { PaginationDto } from "type-defs";

export const usePagination = (pagination: PaginationDto) => {
  const navigate = useNavigate<LocationGenerics>();

  const paginate = useCallback(() => {
    navigate({
      search: (old) => {
        return {
          ...old,
          pagination,
        };
      },
      replace: true,
    });

    return paginate;
  }, [pagination, navigate]);
};
