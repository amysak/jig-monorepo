import { Card, Col, Row, Space, Typography } from "antd";

import {
  FormInput,
  FormLayout,
  FormNumberInput,
  FormRadioSet,
} from "@jigbid/ui";
import { layout, deliveryLayout } from "../../core";

const { Paragraph, Title } = Typography;

export const JobFormPreferences = () => {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Card>
        <Title level={4}>Markups</Title>
        <Paragraph strong>Edit Markups if necessary </Paragraph>

        <FormLayout layout={layout}>
          <FormNumberInput
            label="Sales Commision %"
            name={["markup", "fees", "salesCommission"]}
            percent
          />

          <FormNumberInput
            label="Design fee %"
            name={["markup", "fees", "design"]}
            percent
          />

          <FormRadioSet
            options={[
              { label: "yes", value: true },
              { label: "no", value: false },
            ]}
            label="Show design fee on Estimate?"
            name={["markup", "fees", "showDesignOnEstimate"]}
          />

          <FormNumberInput
            label="Overhead Markup %"
            name={["markup", "fees", "overhead"]}
            percent
          />

          <FormNumberInput
            label="Profit Markup %"
            name={["markup", "fees", "profit"]}
            percent
          />

          <FormNumberInput
            label="Additional Markup %"
            name={["markup", "fees", "additional"]}
            percent
          />

          <Paragraph strong>
            Enter a Fixed Adjustment if necessary, this adjustment will be shown
            on Estimate and Proposal
          </Paragraph>
          <FormNumberInput
            label="Fixed Adjustment Amount"
            name={["markup", "fees", "fixed"]}
            help="(Enter a positive or negative amount)"
          />

          <FormInput
            textarea={{ rows: 2 }}
            label="Adjustment Reason"
            name={["markup", "fees", "reason"]}
          />
        </FormLayout>
      </Card>

      <Card>
        <Title level={4}>Taxes</Title>

        <FormLayout layout={layout}>
          <FormNumberInput
            percent
            label="Sales Tax Rate?"
            name={["markup", "taxes", "salesTax"]}
          />

          <FormRadioSet
            options={[
              { label: "yes", value: true },
              { label: "no", value: false },
            ]}
            label="Sales Tax on Materials?"
            name={["markup", "taxes", "appliedTo", "materials"]}
          />

          <FormRadioSet
            options={[
              { label: "yes", value: true },
              { label: "no", value: false },
            ]}
            label="Sales Tax on Shop Labor?"
            name={["markup", "taxes", "appliedTo", "shopLabor"]}
          />

          <FormRadioSet
            options={[
              { label: "yes", value: true },
              { label: "no", value: false },
            ]}
            label="Sales Tax on Installation?"
            name={["markup", "taxes", "appliedTo", "installation"]}
          />

          <FormRadioSet
            options={[
              { label: "yes", value: true },
              { label: "no", value: false },
            ]}
            label="Sales Tax on Delivery?"
            name={["markup", "taxes", "appliedTo", "delivery"]}
          />
        </FormLayout>
      </Card>

      <Card>
        <Row>
          <Col span={12}>
            <Title level={4}>Delivery</Title>

            <FormInput
              wrapperCol={{ span: "24" }}
              labelCol={{ span: "24" }}
              label="Delivery Text for Reports"
              textarea={{ style: { width: "100%" }, rows: 5 }}
              name={["delivery", "text"]}
            />
          </Col>

          <Col span={12}>
            <FormLayout layout={deliveryLayout}>
              <FormNumberInput
                label="Delivery Trip Quantity"
                name={["delivery", "tripQuantity"]}
              />

              <FormNumberInput
                label="Miles to Job Site"
                name={["delivery", "milesToJobSite"]}
              />

              <FormNumberInput
                cost
                label="Delivery Rate per Trip"
                name={["delivery", "perTrip"]}
              />

              <FormNumberInput
                cost
                label="Delivery Rate per Mile"
                name={["delivery", "perMile"]}
              />

              <FormNumberInput
                cost
                label="Delivery Rate per Box"
                name={["delivery", "perBox"]}
              />
            </FormLayout>
          </Col>
        </Row>
      </Card>
    </Space>
  );
};

// function JobCabinetForm() {
//   const [form] = Form.useForm();

//   return (
//     <Form form={form} {...layout} className="bordered-row">
//       <Row>
//         <Col span={18}>
//           <Title level={4}>Default Floor to Top of Cabinet Heights</Title>
//         </Col>
//         <Col>
//           <Button size="small">Relookup</Button>
//         </Col>
//       </Row>

//       <Row>
//         <Col span={12}>
//           <Form.Item label="Default Base">
//             <InputNumber style={{ width: "100%" }} />
//           </Form.Item>
//         </Col>

//         <Col span={12}>
//           <Form.Item label="Default Tall">
//             <InputNumber style={{ width: "100%" }} />
//           </Form.Item>
//         </Col>
//       </Row>

//       <Row>
//         <Col span={12}>
//           <Form.Item label="Default Vanity">
//             <InputNumber style={{ width: "100%" }} />
//           </Form.Item>
//         </Col>
//         <Col span={12}>
//           <Form.Item label="Default Upper">
//             <InputNumber style={{ width: "100%" }} />
//           </Form.Item>
//         </Col>
//       </Row>

//       <Form.Item
//         label="Manually Enter Cabinet Width"
//         valuePropName="checked"
//         name="manually_enter_cabinet_width"
//       >
//         <Checkbox />
//       </Form.Item>

//       <Row>
//         <Col span={12}>
//           <Form.Item name="base_style" label="Base Style">
//             <Radio.Group>
//               <Radio value="standard">Standard</Radio>
//               <Radio value="Adjustable Legs">Standard</Radio>
//               <Radio value="Separate Base Platform">Standard</Radio>
//             </Radio.Group>
//           </Form.Item>
//         </Col>
//       </Row>
//     </Form>
//   );
// }
