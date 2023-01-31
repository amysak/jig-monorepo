import {
  useMatch as useMatchRL,
  useMatches as useMatchesRL,
  useMatchRoute as useMatchRouteRL,
  useNavigate as useNavigateRL,
  useSearch as useSearchRL,
  useRouter as useRouterRL,
} from "@tanstack/react-location";
import { LocationGenerics } from "router";

export const useMatch = useMatchRL<LocationGenerics>;
export const useNavigate = useNavigateRL<LocationGenerics>;
export const useMatches = useMatchesRL<LocationGenerics>;
export const useMatchRoute = useMatchRouteRL<LocationGenerics>;
export const useSearch = useSearchRL<LocationGenerics>;
export const useRouter = useRouterRL<LocationGenerics>;
