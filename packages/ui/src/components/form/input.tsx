import {
  Form,
  FormItemProps,
  Input,
  InputNumber,
  InputNumberProps,
} from "antd";
import { InputProps, PasswordProps, TextAreaProps } from "antd/es/input";
import { isEmpty, merge } from "lodash-es";
import { FC } from "react";

import { costInputProps, fullWidthProps, percentInputProps } from "./core";

interface FormInputProps {
  textarea?: TextAreaProps;
  fullWidth?: boolean;
  input?: InputProps;
}

export const FormInput: FC<FormItemProps & FormInputProps> = ({
  textarea,
  label,
  name,
  fullWidth = false,
  input = {},
  ...props
}) => {
  const itemProps = merge(props, fullWidth ? fullWidthProps : {});

  return (
    <Form.Item {...itemProps} label={label} name={name}>
      {isEmpty(textarea) ? (
        <Input {...input} style={props.style} />
      ) : (
        <Input.TextArea {...textarea} style={props.style} />
      )}
    </Form.Item>
  );
};

interface FormNumberInputProps {
  percent?: boolean;
  cost?: boolean;
  fullWidth?: boolean;
  input?: InputNumberProps;
}

export const FormNumberInput: FC<FormItemProps & FormNumberInputProps> = ({
  label,
  name,
  percent = false,
  cost = false,
  fullWidth = false,
  input = {},
  ...props
}) => {
  const itemProps = merge(props, fullWidth ? fullWidthProps : {});

  const inputProps = merge(
    {},
    input,
    percent ? percentInputProps : {},
    cost ? costInputProps : {}
  );

  return (
    <Form.Item {...itemProps} label={label} name={name}>
      <InputNumber {...inputProps} min={0} step={0.5} />
    </Form.Item>
  );
};

interface FormPasswordInputProps {
  fullWidth?: boolean;
  input?: PasswordProps;
}

export const FormPasswordInput: FC<FormItemProps & FormPasswordInputProps> = ({
  label,
  name,
  fullWidth = false,
  input = {},
  ...props
}) => {
  const itemProps = merge(props, fullWidth ? fullWidthProps : {});

  const inputProps = merge({}, input);

  return (
    <Form.Item {...itemProps} label={label} name={name}>
      <Input.Password {...inputProps} />
    </Form.Item>
  );
};
