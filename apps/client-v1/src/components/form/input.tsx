import {
  Form,
  FormItemProps,
  Input,
  InputNumber,
  InputNumberProps,
} from "antd";
import { TextAreaProps } from "antd/es/input";
import { isEmpty, merge } from "lodash";
import { CSSProperties } from "react";
import { costInputProps, fullWidthProps, percentInputProps } from "./core";

interface FormInputProps {
  textarea?: TextAreaProps;
  fullWidth?: boolean;
  inputStyle?: CSSProperties;
}

interface FormNumberInputProps {
  percent?: boolean;
  cost?: boolean;
  fullWidth?: boolean;
  input?: InputNumberProps;
}

export const FormInput = ({
  textarea,
  label,
  name,
  fullWidth = false,
  inputStyle = {},
  ...props
}: FormItemProps & FormInputProps) => {
  const itemProps = merge(props, fullWidth ? fullWidthProps : {});

  return (
    <Form.Item {...itemProps} label={label} name={name}>
      {isEmpty(textarea) ? (
        <Input style={inputStyle} />
      ) : (
        <Input.TextArea style={inputStyle} />
      )}
    </Form.Item>
  );
};

export const FormNumberInput = ({
  label,
  name,
  percent = false,
  cost = false,
  fullWidth = false,
  input = {},
  ...props
}: FormItemProps & FormNumberInputProps) => {
  const itemProps = merge(props, fullWidth ? fullWidthProps : {});

  const inputProps = merge(
    {},
    input,
    percent ? percentInputProps : {},
    cost ? costInputProps : {}
  );

  return (
    <Form.Item {...itemProps} label={label} name={name}>
      <InputNumber {...inputProps} />
    </Form.Item>
  );
};
