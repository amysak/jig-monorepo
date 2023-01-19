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
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "@tanstack/react-location";
// import { createProfile } from "../../../api/profiles";
// import { getVendors } from "../../../api/vendors";
// import {
//   ACTIVE_INACTIVE_STATUSES,
//   ACTIVE_INACTIVE_STATUSES_OPTIONS,
//   DOOR_PROFILES_OPTIONS,
// } from "../../../utilities/constants";
// import { shortId } from "../../../utilities/utils";

// const layout = {
//   wrapperCol: { span: 18 },
//   labelCol: { span: 6 },
// };

// const { Title } = Typography;

// function NewDoorProfileForm() {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [vendors, setVendors] = useState([]);

//   const getProfileVendors = async () => {
//     try {
//       const vendors = await getVendors();

//       setVendors(vendors[0]);
//     } catch {}
//   };

//   useEffect(() => {
//     getProfileVendors();
//   }, []);

//   const onFinish = async (values) => {
//     try {
//       setLoading(true);
//       const profile = await createProfile({ ...values, is_default: true });
//       //@ts-ignore
//       navigate(`/cabinet-setup/door-drawer-profiles/${profile.id}`);
//     } catch (error) {
//       setLoading(false);
//     }
//   };

//   console.log(vendors);

//   return (
//     <Form
//       form={form}
//       onFinish={onFinish}
//       className="new-cabinet-setup-form"
//       {...layout}
//     >
//       <Title level={4}>New Door/Drawer Profile</Title>

//       <Divider className="x5" />

//       <Form.Item
//         label="Category"
//         name="category"
//         rules={[{ required: true, message: "Category is required." }]}
//       >
//         <Select>
//           {DOOR_PROFILES_OPTIONS.map((option) => (
//             <Select.Option key={shortId()} value={option.value}>
//               {option.label}
//             </Select.Option>
//           ))}
//         </Select>
//       </Form.Item>

//       <Form.Item
//         label="Name"
//         name="name"
//         rules={[{ required: true, message: "Name is required." }]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item label="Vendor" name="vendor">
//         <Select>
//           {vendors.map((option) => (
//             <Select.Option key={shortId()} value={option.id}>
//               {option.name}
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

// export default function NewDoorProfileFormPopover() {
//   return (
//     <Popover
//       placement="leftTop"
//       content={<NewDoorProfileForm />}
//       trigger="click"
//     >
//       <Button size="small" className="jig-button">
//         Create New
//       </Button>
//     </Popover>
//   );
// }
