import { DoubleRightOutlined, HomeOutlined } from "@ant-design/icons";
import { Link, useRouter } from "@tanstack/react-router";
import { Breadcrumb, Layout, LayoutProps } from "antd";
import { capitalize } from "lodash-es";
import { nanoid } from "nanoid";
import { ReactNode, useCallback } from "react";

import "./style.scss";

const { Content } = Layout;

interface UILayoutProps {
  title?: string;
  borderless?: boolean;
  children?: ReactNode;
}

export const UILayout = ({
  title,
  children,
  borderless = false,
  ...props
}: UILayoutProps & LayoutProps) => {
  const namedMatches = useRouter().state.currentMatches.filter(
    (match) => match.route.path && !match.route.path.startsWith("$")
  );

  // Could break
  const getNonGenericRoutes = useCallback(
    () =>
      namedMatches
        .map((match) => ({
          title: match.route.path
            ?.replaceAll("/", "")
            .replaceAll("-", " ")
            .split(" ")
            .map(capitalize)
            .join(" "),
          pathname: match.id,
        }))
        .filter(({ title }) => title && !title.startsWith("$")),
    [namedMatches]
  );

  return (
    <Layout
      {...props}
      className={`ui-layout ${props.className || ""}`}
      style={{ ...props.style, background: "transparent" }}
    >
      <Breadcrumb
        separator={<DoubleRightOutlined />}
        style={{ marginBottom: "1.5rem" }}
      >
        <Breadcrumb.Item key={nanoid()}>
          <Link to="/dashboard">
            <HomeOutlined style={{ fontSize: "14px" }} />
          </Link>
        </Breadcrumb.Item>

        {getNonGenericRoutes().map(({ title, pathname }) => (
          <Breadcrumb.Item key={nanoid()}>
            <Link to={pathname as any}>{title}</Link>
          </Breadcrumb.Item>
        ))}

        <Breadcrumb.Item key={nanoid()}>
          <Link>{title}</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Content className={borderless ? "" : "ui-layout-content"}>
        {children}
      </Content>
    </Layout>
  );
};

export default UILayout;
