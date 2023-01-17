import { Col, Layout, Typography } from "antd";
import { Logo } from "components/icon";

import "./authlayout.scss";

const { Content } = Layout;
const { Paragraph } = Typography;

export const AuthLayout = (props: {
  contenStyle: React.CSSProperties;
  useTitle: boolean;
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal;
}) => {
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
