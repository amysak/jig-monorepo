export {};
// import {
//   Button,
//   Divider,
//   Form,
//   Input,
//   Popover,
//   Row,
//   Select,
//   Typography,
// } from "antd";
// import React, { useState } from "react";
// import { useNavigate } from "@tanstack/react-router";
// import { createLaborRate } from "../../../api/labor-rates";
// import {
//   ACTIVE_INACTIVE_STATUSES,
//   ACTIVE_INACTIVE_STATUSES_OPTIONS,
//   LABOR_RATE_CATEGORIES_OPTIONS,
// } from "../../../utilities/constants";
// import { shortId } from "../../../utilities/utils";

// const layout = {
//   wrapperCol: { span: 18 },
//   labelCol: { span: 6 },
// };

// const { Title } = Typography;

// function NewLaborRateForm() {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const onFinish = async (values) => {
//     try {
//       setLoading(true);
//       const laborRate = await createLaborRate({
//         ...values,
//         is_default: true,
//       });
//       //@ts-ignore
//       navigate(`/cabinet-setup/labor-rates/${laborRate.id}`);
//     } catch (error) {
//       setLoading(false);
//     }
//   };

//   return (
//     <Form
//       form={form}
//       onFinish={onFinish}
//       className="new-cabinet-setup-form"
//       {...layout}
//     >
//       <Title level={4}>New Labor Rate</Title>

//       <Divider className="x5" />

//       <Form.Item
//         label="Name"
//         name="name"
//         rules={[{ required: true, message: "Name is required." }]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item
//         label="Category"
//         name="category"
//         rules={[{ required: true, message: "Category is required." }]}
//       >
//         <Select>
//           {LABOR_RATE_CATEGORIES_OPTIONS.map((option) => (
//             <Select.Option key={shortId()} value={option.label}>
//               {option.label}
//             </Select.Option>
//           ))}
//         </Select>
//       </Form.Item>

//       <Form.Item
//         label="Status"
//         name="status"
//         initialValue={ACTIVE_INACTIVE_STATUSES[0]}
//       >
//         <Select>
//           {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((option) => (
//             <Select.Option key={shortId()} value={option.value}>
//               {option.label}
//             </Select.Option>
//           ))}
//         </Select>
//       </Form.Item>

//       {/* @ts-expect-error TS(2322): Type '"end"' is not assignable to type '"top" | "b... Remove this comment to see the full error message */}
//       <Row align="end">
//         <Button
//           loading={loading}
//           htmlType="submit"
//           size="small"
//           className="jig-button"
//         >
//           Submit
//         </Button>
//       </Row>
//     </Form>
//   );
// }

// export default function NewLaborRateFormPopover() {
//   return (
//     <Popover placement="leftTop" content={<NewLaborRateForm />} trigger="click">
//       <Button size="small" className="jig-button">
//         Create New
//       </Button>
//     </Popover>
//   );
// }
