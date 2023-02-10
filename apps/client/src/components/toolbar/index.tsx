import { DoubleRightOutlined, HomeOutlined } from "@ant-design/icons";
import { PageSkeleton } from "@jigbid/ui";
import { Link } from "@tanstack/react-router";
import { Breadcrumb } from "antd";
import { nanoid } from "nanoid";
import { ReactNode } from "react";

interface ToolbarProps {
  initial?: { title: string; path: string };
  parent?: { label: string; path: string };
  label: string;
}

export const Toolbar = ({
  initial,
  label,
  parent,
}: ToolbarProps): ReactNode => {
  const paths: { path: string; label: string }[] = [];

  if (!initial) {
    return <PageSkeleton />;
  }

  if (parent) {
    paths.push({
      path: `${initial.path}${parent.path}`,
      label: parent.label,
    });
  }

  return (
    <Breadcrumb
      className="cabinetsetup-breadcrumb"
      separator={<DoubleRightOutlined />}
    >
      <Breadcrumb.Item key={nanoid()}>
        <Link to="/dashboard">
          <HomeOutlined style={{ fontSize: "14px" }} />
        </Link>
      </Breadcrumb.Item>

      <Breadcrumb.Item key={nanoid()}>
        {parent ? (
          <Link to={initial.path as any}>{initial.title}</Link>
        ) : (
          initial.title
        )}
      </Breadcrumb.Item>

      {paths.map((path) => (
        <Breadcrumb.Item key={nanoid()}>
          <Link to={path.path as any}>{path.label}</Link>
        </Breadcrumb.Item>
      ))}

      <Breadcrumb.Item>{label}</Breadcrumb.Item>
    </Breadcrumb>
  );
};
