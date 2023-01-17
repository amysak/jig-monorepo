import { useMatch as useRLMatch } from "@tanstack/react-location";

import { LocationGenerics } from "router";

export const useMatch = () => useRLMatch<LocationGenerics>();
