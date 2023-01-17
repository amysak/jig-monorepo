import { Form, FormItemProps, Select, SelectProps } from "antd";

interface FormSelectProps {
  options: { label: string; value: string }[];
}

export const FormSelect = ({
  options,
  label,
  name,
  ...props
}: FormItemProps & FormSelectProps & SelectProps) => {
  return (
    <Form.Item {...props} label={label} name={name}>
      <Select {...props}>
        {options.map((value, idx) => (
          <Select.Option key={idx} value={value.value}>
            {value.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
