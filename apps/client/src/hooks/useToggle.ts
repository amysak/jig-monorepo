import { isNil } from "lodash-es";
import { useCallback, useState } from "react";

interface IUseToggle {
  (): [boolean, () => void];
}

export const useToggle: IUseToggle = (initialState = false) => {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = useCallback(
    (bool?: boolean) => setState((s) => (isNil(bool) ? !s : bool)),
    []
  );
  return [state, toggle];
};
