import { Button as AntButton, ButtonProps as AntButtonProps } from "antd";

type ButtonProps = AntButtonProps;

export const Button = (props: ButtonProps) => {
  return <AntButton {...props} />;
};
