import { Children, cloneElement, FC, ReactElement } from "react";

interface FormLayoutProps {
  children: ReactElement | ReactElement[];
  layout?: {
    labelCol: { span: number };
    wrapperCol: { span: number };
  };
}

export const FormLayout: FC<FormLayoutProps> = ({ layout, children }) => {
  const wrappedItems = layout
    ? Children.map(children, (child) =>
        cloneElement(child, {
          ...child.props,
          ...layout,
        })
      )
    : children;

  return <>{wrappedItems}</>;
};
