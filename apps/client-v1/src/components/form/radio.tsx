import { Form, FormItemProps, Radio } from "antd";
import { merge } from "lodash";

import { capitalize } from "utilities/utils";
import { fullWidthProps } from "./core";

interface FormRadioProps {
  options: { label: string; value: boolean | number | string }[];
  fullWidth?: boolean;
}

export const FormRadioSet = ({
  options,
  label,
  name,
  fullWidth = false,
  ...props
}: FormItemProps & FormRadioProps) => {
  const itemProps = merge(props, fullWidth ? fullWidthProps : {});

  return (
    <Form.Item {...itemProps} label={label} name={name}>
      <Radio.Group>
        {options.map((option) => (
          <Radio key={option.label} value={option.value}>
            {capitalize(option.label)}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};
