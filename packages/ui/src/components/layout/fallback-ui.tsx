import { Layout, Spin, Typography } from "antd";
import { ReactNode } from "react";

const { Content } = Layout;
const { Title, Text } = Typography;

interface FallbackUIProps {
  info?: string;
  icon?: ReactNode;
}

export const FallbackUI = ({ info, icon }: FallbackUIProps) => {
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
        {icon ? icon : <Spin />}
      </Content>
    </Layout>
  );
};
