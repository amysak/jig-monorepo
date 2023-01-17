import { Form, FormItemProps, Select, SelectProps } from "antd";

interface FormSelectProps {
  options: { label: string; value: any }[];
  select?: SelectProps;
}

export const FormSelect = ({
  options,
  label,
  name,
  select = {},
  ...props
}: FormItemProps & FormSelectProps) => {
  return (
    <Form.Item {...props} label={label} name={name}>
      <Select {...select}>
        {options.map((value, idx) => (
          <Select.Option key={idx} value={value.value}>
            {value.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
