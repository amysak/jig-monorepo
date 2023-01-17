import { Layout, Spin, Typography } from "antd";

const { Content } = Layout;
const { Title, Text } = Typography;

interface FallbackUIProps {
  info?: string;
  Icon?: any;
}

export const FallbackUI = ({ info, Icon }: FallbackUIProps) => {
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
        {Icon ? <Icon spin fontSize={60} /> : <Spin />}
      </Content>
    </Layout>
  );
};
