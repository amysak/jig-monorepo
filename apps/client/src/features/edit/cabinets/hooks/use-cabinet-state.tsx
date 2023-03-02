import { useMutation, useQuery } from "@tanstack/react-query";
import { debounce } from "lodash-es";
import { createContext, useContext, useEffect, useRef } from "react";
import { proxy, subscribe, useSnapshot } from "valtio";

import { api } from "lib/api";
import { Cabinet } from "type-defs";

// Careful of this hack
export const CabinetContext = createContext<{ cabinet: Cabinet }>({
  cabinet: {} as Cabinet,
});

export const CabinetContextProvider = ({ cabinetId, children }) => {
  const { data: cabinet, isLoading } = useQuery({
    queryKey: ["cabinets", cabinetId],
    queryFn: () => api.cabinets.getById(cabinetId),
  });

  const state = useRef(proxy({ cabinet })).current;

  // Verifying state is fetched, fixes hack above
  if (isLoading || !state.cabinet) return null;

  return (
    <CabinetContext.Provider value={state as { cabinet: Cabinet }}>
      {children}
    </CabinetContext.Provider>
  );
};

export const useCabinetState = () => {
  const state = useContext(CabinetContext);
  const snapshot = useSnapshot(state);

  const { mutateAsync: updateCabinet } = useMutation({
    mutationKey: ["cabinet:update", state.cabinet.id],
    mutationFn: () => api.cabinets.updateById(state.cabinet.id, state.cabinet),
  });

  useEffect(
    () =>
      subscribe(
        state.cabinet,
        debounce(() => {
          updateCabinet();
        }, 200)
      ),
    []
  );

  return { cabinetState: state, snapshot };
};
