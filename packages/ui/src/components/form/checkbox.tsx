import { Form, Checkbox, FormItemProps } from "antd";

interface FormCheckboxProps {}

export const FormCheckbox = ({
  label,
  name,
  ...props
}: FormItemProps & FormCheckboxProps) => {
  return (
    <Form.Item {...props} name={name} valuePropName="checked" label={label}>
      <Checkbox />
    </Form.Item>
  );
};
