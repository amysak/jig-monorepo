import { Layout } from "antd";
import { isValidElement, ReactNode } from "react";

import Toolbar from "components/toolbar";

import "./style.scss";

const { Content } = Layout;

interface MainLayoutProps {
  ToolbarContent?: null | JSX.Element;
  className?: string;
  fixedWidth?: boolean;
  children?: ReactNode;
}

export const UILayout = ({
  ToolbarContent,
  className,
  ...props
}: MainLayoutProps) => {
  const hasToolbar = isValidElement(ToolbarContent);

  return (
    <Layout className={`pagelayout ${className}`}>
      {/* <div className="pagelayout__contentwrapper"> */}
      {hasToolbar ? <Toolbar>{ToolbarContent}</Toolbar> : null}
      <Content
        className={`${
          hasToolbar ? "pagelayout__contenttoolbar" : "pagelayout__content"
        }`}
      >
        {props.children}
      </Content>
      {/* </div> */}
    </Layout>
  );
};

UILayout.defaultProps = {
  ToolbarContent: null,
  className: "",
  fixedWidth: false,
};

export default UILayout;
