import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

import { PageHeader } from "../../atoms";

import "./header.scss";

function DropDownMenuList({ link }) {
  const { children } = link;

  if (!(children && children.length)) return null;

  return (
    <Menu className="dropwdownmenu">
      {children.map((childLink, index) => (
        <Menu.Item key={index}>
          <Link to={`${link.path}/${childLink.path}`}>{childLink.text}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
}

function getRootPath(path) {
  const paths = path.split("/");

  return paths[1] ? `/${paths[1]}` : "";
}

function getActiveLinkClass(pathname, path) {
  return getRootPath(pathname).match(new RegExp(path)) ? "activenavlink" : "";
}

function RenderMenuLabel({ link }) {
  return link.useIcon ? (
    <link.Icon className={link.classes || ""} />
  ) : (
    link.text
  );
}

interface HeaderProps {
  navLinks: any;
}

function Header({ navLinks }: HeaderProps) {
  const location = useLocation();

  return (
    <PageHeader
      title={null}
      extra={navLinks.map((link, index) => {
        const activeClass = getActiveLinkClass(location.pathname, link.path);
        const btnProps = {};
        const hasChildren = Array.isArray(link.children);

        // @ts-expect-error TS(2339): Property 'href' does not exist on type '{}'.
        if (!hasChildren) btnProps.href = link.path;

        return (
          <Dropdown
            placement="bottomCenter"
            overlay={<DropDownMenuList link={link} />}
            key={index}
            className="navdropdown"
          >
            <Button
              className={`${activeClass} ${link.classes || ""}`}
              type="link"
              {...btnProps}
            >
              {!hasChildren ? (
                <RenderMenuLabel link={link} />
              ) : (
                <div className="with-caret">
                  <RenderMenuLabel link={link} />
                  <DownOutlined className="caret" />
                </div>
              )}
            </Button>
          </Dropdown>
        );
      })}
      className="apppageheader"
    />
  );
}

Header.defaultProps = {
  navLinks: [],
};

export default Header;
