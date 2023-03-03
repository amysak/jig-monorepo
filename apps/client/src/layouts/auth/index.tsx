import { Navigate } from "@tanstack/react-router";
import { Col, Layout, Typography } from "antd";
import { ReactNode } from "react";

import { Logo } from "components/logo";
import { useAuthorization } from "lib/hooks";

import "./authlayout.scss";

const { Content } = Layout;
const { Paragraph } = Typography;

export const AuthLayout = (props: {
  contenStyle: React.CSSProperties;
  useTitle: boolean;
  children?: ReactNode;
}) => {
  const { isAuthenticated } = useAuthorization();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Layout
      className="authlayoutwrapper"
      hasSider={false}
      style={{ minHeight: "100vh" }}
    >
      <Content className="authlayoutwrapper__content" style={props.contenStyle}>
        {props.useTitle && (
          <>
            <Col className="authlayoutwrapper__content-header">
              <Logo />

              <br />

              <Paragraph className="copywrite">
                @Jigbid, {new Date().getFullYear()}
              </Paragraph>
            </Col>
          </>
        )}

        {props.children}
      </Content>
    </Layout>
  );
};

AuthLayout.defaultProps = {
  useTitle: true,
  contenStyle: {},
};

export default AuthLayout;
