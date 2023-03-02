import { Typography } from "antd";

import { useAuthorization } from "lib/hooks";

const { Paragraph } = Typography;

export const UserPreferences = () => {
  const { user } = useAuthorization();

  // TODO:
  return <Paragraph>Choose default markup:</Paragraph>;
};
