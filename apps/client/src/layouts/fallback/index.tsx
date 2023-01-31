import { Layout, Spin } from "antd";

import Logo from "assets/images/logos/svgs/fallback.svg";

const { Content } = Layout;

export const Fallback = () => {
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
        <Logo width="30%" />

        <Spin size="large" style={{ marginTop: 30 }} />
      </Content>
    </Layout>
  );
};
