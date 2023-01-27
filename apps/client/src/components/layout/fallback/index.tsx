import { Layout, Spin, Typography } from "antd";
import Logo from "components/icon";

const { Content } = Layout;
const { Title, Text } = Typography;

interface FallbackUIProps {
  info?: string;
}

export const Fallback = ({ info }: FallbackUIProps) => {
  return (
    <Layout>
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Title level={3}>Cabinet Estimating Software</Title>

        {info && <Text strong>{info}</Text>}
        <Spin />
      </Content>
    </Layout>
  );
};
