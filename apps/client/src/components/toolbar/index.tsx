import { DoubleRightOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { Link } from "@tanstack/react-location";
import { nanoid } from "nanoid";
import { PageSkeleton } from "@jigbid/ui";

interface ToolbarProps {
  initial?: { title: string; path: string };
  label: any;
  parent?: { label: any; path: string };
}

export default function Toolbar({ initial, label, parent }: ToolbarProps) {
  const paths: { path: string; label: any }[] = [];

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
          <Link to={initial.path}>{initial.title}</Link>
        ) : (
          initial.title
        )}
      </Breadcrumb.Item>

      {paths.map((path) => (
        <Breadcrumb.Item key={nanoid()}>
          <Link to={path.path}>{path.label + "dd"}</Link>
        </Breadcrumb.Item>
      ))}

      <Breadcrumb.Item>{label}</Breadcrumb.Item>
    </Breadcrumb>
  );
}
