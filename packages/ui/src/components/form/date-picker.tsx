import { DatePicker, Form, FormItemProps } from "antd";
import dayjs from "dayjs";

export const FormDatePicker = ({ label, name, ...props }: FormItemProps) => {
  return (
    <Form.Item {...props} label={label} name={name}>
      <DatePicker
        placeholder={dayjs().format("MMMM Do YYYY")}
        format={(date) => dayjs(date).format("MMMM Do YYYY")}
      />
    </Form.Item>
  );
};
