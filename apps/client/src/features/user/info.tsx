import { useAuthorization } from "lib/hooks";

export const UserInfo = () => {
  const { user } = useAuthorization();

  return null;
};
