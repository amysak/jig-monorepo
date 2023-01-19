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
// import { useNavigate } from "@tanstack/react-location";
// import { createCabinet } from "../../../api/cabinets";
// import {
//   ACTIVE_INACTIVE_STATUSES,
//   ACTIVE_INACTIVE_STATUSES_OPTIONS,
//   CABINET_PARTS,
//   CABINET_STYLES,
// } from "../../../utilities/constants";
// import { capitalize, shortId } from "../../../utilities/utils";

// const layout = {
//   wrapperCol: { span: 18 },
//   labelCol: { span: 6 },
// };

// const { Title } = Typography;

// function NewCabinetSetupForm() {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const onFinish = async (values) => {
//     try {
//       setLoading(true);

//       const payload = { ...values, is_default: true };
//       const cabinet = await createCabinet(payload);

//       navigate(`/cabinet-setup/cabinets/${cabinet.id}`);
//     } catch (error) {
//       console.log(error);
//     } finally {
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
//       <Title level={4}>New Cabinet</Title>

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
//           {CABINET_PARTS.map((cabineType) => (
//             <Select.Option key={shortId()} value={cabineType}>
//               {capitalize(cabineType)}
//             </Select.Option>
//           ))}
//         </Select>
//       </Form.Item>

//       <Form.Item name="style" label="Style">
//         <Select>
//           {CABINET_STYLES.map((style) => (
//             <Select.Option value={style} key={style}>
//               {capitalize(style)}
//             </Select.Option>
//           ))}
//         </Select>
//       </Form.Item>

//       <Form.Item label="Interior" name="interior" initialValue="u">
//         <Select>
//           {["u", "f"].map((option) => (
//             <Select.Option key={shortId()} value={option}>
//               {capitalize(option)}
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
//           size="small"
//           loading={loading}
//           htmlType="submit"
//           className="jig-button"
//         >
//           Submit
//         </Button>
//       </Row>
//     </Form>
//   );
// }

// export default function NewCabinetSetupFormPopOver() {
//   return (
//     <Popover
//       placement="leftTop"
//       content={<NewCabinetSetupForm />}
//       trigger="click"
//     >
//       <Button size="small" className="jig-button">
//         Create New
//       </Button>
//     </Popover>
//   );
// }
