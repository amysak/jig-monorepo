import { Typography } from "antd";

import { FormInput, FormNumberInput, FormRadioSet } from "components/form";
import { deliveryLayout, layout, markupLayout } from "../../core";
import { Col, Row } from "../ant";

const { Paragraph, Title } = Typography;

export const JobFormPreferences = () => {
  return (
    <>
      <Row layout={markupLayout} className="bordered-row">
        <Col span={18}>
          <Title level={4}>Markups</Title>
          <Paragraph strong>Edit Markups if necessary </Paragraph>
        </Col>

        <FormNumberInput
          fullWidth
          label="Sales Commision %"
          name={["preferences", "markup", "fees", "salesCommission"]}
          percent
        />

        <FormNumberInput
          fullWidth
          label="Design fee %"
          name={["preferences", "markup", "fees", "design"]}
          percent
        />

        <FormRadioSet
          fullWidth
          options={[
            { label: "yes", value: true },
            { label: "no", value: false },
          ]}
          label="Show design fee on Estimate?"
          name={["preferences", "markup", "fees", "showDesignOnEstimate"]}
        />

        <FormNumberInput
          fullWidth
          label="Overhead Markup %"
          name={["preferences", "markup", "fees", "overhead"]}
          percent
        />

        <FormNumberInput
          fullWidth
          label="Profit Markup %"
          name={["preferences", "markup", "fees", "profit"]}
          percent
        />

        <FormNumberInput
          fullWidth
          label="Additional Markup %"
          name={["preferences", "markup", "fees", "additional"]}
          percent
        />

        <Paragraph strong>
          Enter a Fixed Adjustment if necessary, this adjustment will be shown
          on Estimate and Proposal
        </Paragraph>

        <FormNumberInput
          fullWidth
          label="Fixed Adjustment Amount"
          name={["preferences", "markup", "fees", "fixed"]}
          help="(Enter a positive or negative amount)"
        />

        <FormInput
          {...markupLayout}
          fullWidth
          textarea={{ rows: 2 }}
          label="Adjustment Reason"
          name={["preferences", "markup", "fees", "reason"]}
        />
      </Row>

      <Row layout={layout} className="bordered-row">
        <Title level={4}>Taxes</Title>

        <FormNumberInput
          fullWidth
          percent
          label="Sales Tax Rate?"
          name={["preferences", "markup", "taxes", "salesTax"]}
        />

        <FormRadioSet
          fullWidth
          options={[
            { label: "yes", value: true },
            { label: "no", value: false },
          ]}
          label="Sales Tax on Materials?"
          name={["preferences", "markup", "taxes", "appliedTo", "materials"]}
        />

        <FormRadioSet
          fullWidth
          options={[
            { label: "yes", value: true },
            { label: "no", value: false },
          ]}
          label="Sales Tax on Shop Labor?"
          name={["preferences", "markup", "taxes", "appliedTo", "shopLabor"]}
        />

        <FormRadioSet
          fullWidth
          options={[
            { label: "yes", value: true },
            { label: "no", value: false },
          ]}
          label="Sales Tax on Installation?"
          name={["preferences", "markup", "taxes", "appliedTo", "installation"]}
        />

        <FormRadioSet
          fullWidth
          options={[
            { label: "yes", value: true },
            { label: "no", value: false },
          ]}
          label="Sales Tax on Delivery?"
          name={["preferences", "markup", "taxes", "appliedTo", "delivery"]}
        />
      </Row>

      <Row className="bordered-row">
        <Col span={12}>
          <Title level={4}>Delivery</Title>

          <FormInput
            wrapperCol={{ span: "24" }}
            labelCol={{ span: "24" }}
            label="Delivery Text for Reports"
            textarea={{ style: { width: "100%" }, rows: 5 }}
            name={["preferences", "delivery", "text"]}
          />
        </Col>

        <Col layout={deliveryLayout} span={12}>
          <FormNumberInput
            fullWidth
            label="Delivery Trip Quantity"
            name={["preferences", "delivery", "tripQuantity"]}
          />

          <FormNumberInput
            fullWidth
            label="Miles to Job Site"
            name={["preferences", "delivery", "milesToJobSite"]}
          />

          <FormNumberInput
            cost
            label="Delivery Rate per Trip"
            name={["preferences", "delivery", "perTrip"]}
          />

          <FormNumberInput
            cost
            fullWidth
            label="Delivery Rate per Mile"
            name={["preferences", "delivery", "perMile"]}
          />

          <FormNumberInput
            cost
            fullWidth
            label="Delivery Rate per Box"
            name={["preferences", "delivery", "perBox"]}
          />
        </Col>
      </Row>
    </>
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
