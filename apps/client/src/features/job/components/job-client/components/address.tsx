import { Card, Form, Input, Typography } from "antd";

const { Title } = Typography;

interface MailingAddressFormProps {
  title?: string;
}

const tailLayout = {
  wrapperCol: { span: 18 },
  labelCol: { span: 6 },
};

export const AddressForm = ({ title }: MailingAddressFormProps) => {
  return (
    <Card>
      <Title level={4}>{title}</Title>

      <Form.Item label="Street" name={["mailing_address", "street"]}>
        <Input placeholder="Your street." />
      </Form.Item>

      <Form.Item {...tailLayout} label="City State Zip">
        <Input.Group compact>
          <Form.Item
            name={["mailing_address", "city"]}
            style={{ width: "50%" }}
          >
            <Input placeholder="Your city." />
          </Form.Item>

          <Form.Item
            name={["mailing_address", "state"]}
            style={{ width: "25%" }}
            label=""
          >
            <Input placeholder="Your state abbreviation." />
          </Form.Item>

          <Form.Item
            name={["mailing_address", "zip_code"]}
            style={{ width: "25%" }}
            label=""
          >
            <Input placeholder="Zip code." />
          </Form.Item>
        </Input.Group>
      </Form.Item>
    </Card>
  );
};
