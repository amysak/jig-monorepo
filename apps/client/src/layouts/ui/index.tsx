import { DoubleRightOutlined, HomeOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-location";
import { Breadcrumb, Layout, LayoutProps } from "antd";
import { capitalize } from "lodash-es";
import { nanoid } from "nanoid";
import { ReactNode, useCallback } from "react";

import { useRouter } from "hooks/router";

import "./style.scss";

const { Content } = Layout;

interface UILayoutProps {
  title?: string;
  children?: ReactNode;
}

export const UILayout = ({
  title,
  children,
  ...props
}: UILayoutProps & LayoutProps) => {
  const router = useRouter();

  // Could break
  const getNonGenericRoutes = useCallback(
    () =>
      router.state.matches
        .map((match) => ({
          title: match.route.path
            ?.replaceAll("/", "")
            .replaceAll("-", " ")
            .split(" ")
            .map(capitalize)
            .join(" "),
          pathname: match.pathname,
        }))
        .filter(({ title }) => title && !title.startsWith(":")),
    [router.state.matches]
  );

  return (
    <Layout
      {...props}
      className={props.className}
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
            <Link to={pathname}>{title}</Link>
          </Breadcrumb.Item>
        ))}

        <Breadcrumb.Item key={nanoid()}>
          <Link>{title}</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Content>{children}</Content>
    </Layout>
  );
};

export default UILayout;
