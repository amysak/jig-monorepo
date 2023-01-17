import { Col, Row, type ColProps, type RowProps } from "antd";
import { Children, cloneElement, ReactElement } from "react";

interface WithLayoutProps {
  children: ReactElement[];
  layout?: {
    labelCol: { span: number };
    wrapperCol: { span: number };
  };
}

export const RowWithLayout = ({
  children,
  layout,
  ...props
}: RowProps & WithLayoutProps) => {
  return (
    <Row {...props}>
      {layout
        ? Children.map(children, (child) =>
            cloneElement(child, {
              ...child.props,
              ...layout,
            })
          )
        : children}
    </Row>
  );
};

export const ColWithLayout = ({
  children,
  layout,
  ...props
}: ColProps & WithLayoutProps) => {
  return (
    <Col {...props}>
      {layout
        ? Children.map(children, (child) =>
            cloneElement(child, {
              ...child.props,
              ...layout,
            })
          )
        : children}
    </Col>
  );
};

export { ColWithLayout as Col, RowWithLayout as Row };
