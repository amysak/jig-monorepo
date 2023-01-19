export {};
// import { Col, Divider, Form, InputNumber, Row, Typography } from "antd";
// import React, { useContext, useEffect } from "react";
// import { CabinetContext } from "../../../../store/cabinets";
// import { safeNum, shortId, toFixed } from "../../../../utilities/utils";

// import CabinetImg from "../../../../assets/images/cabinets/BP_Metal_Drawer_System.png";

// const layout = {
//   wrapperCol: {
//     sm: { span: 8 },
//     md: { span: 5 },
//   },
//   labelCol: {
//     sm: { span: 16 },
//     md: { span: 8 },
//   },
// };

// const { Title } = Typography;

// export default function MetalDrawerSystem() {
//   const [form] = Form.useForm();
//   const cabinetCtx = useContext(CabinetContext);

//   const { cabinet } = cabinetCtx;

//   useEffect(() => form.resetFields(), [cabinet]);

//   const onValuesChange = async (value, values: { drawer_part: any[] }) => {
//     values.drawer_part = values.drawer_part.map((part: { cabinet: any }) => {
//       part.cabinet = cabinet.id;

//       return part;
//     });

//     await cabinetCtx.onUpdateCabinet(cabinet.id, values, false);
//   };

//   return (
//     <Form
//       form={form}
//       onValuesChange={onValuesChange}
//       initialValues={cabinet}
//       className="cabinet-form"
//       {...layout}
//     >
//       <Row>
//         <Col offset={8}>
//           <Title level={4}>Metal Drawer Box Parts</Title>
//         </Col>
//       </Row>

//       <Row>
//         <Col span={8}>
//           <Form.Item label="Number of Drawer Boxes" shouldUpdate>
//             {() => form.getFieldValue("number_of_drawers_boxes")}
//           </Form.Item>

//           <Form.Item label="Cabinet Depth">{cabinet.cabinet_depth}</Form.Item>
//           <Form.Item name="depth_difference" label="Difference">
//             <InputNumber />
//           </Form.Item>

//           <Divider />

//           <Form.Item label="Drawer Box Depth" shouldUpdate>
//             {() => {
//               return (
//                 // @ts-expect-error TS(2362): The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
//                 toFixed(cabinet.cabinet_depth) -
//                 // @ts-expect-error TS(2363): The right-hand side of an arithmetic operation mus... Remove this comment to see the full error message
//                 toFixed(form.getFieldValue("depth_difference") || 0)
//               );
//             }}
//           </Form.Item>
//         </Col>

//         <Col span={16}>
//           <Row>
//             <Col span={6}>Drawer</Col>
//             <Col span={6}>Back Height</Col>
//             <Col span={6}>Bottom Depth</Col>
//           </Row>

//           {Array.from(Array(cabinet.number_of_drawers_boxes || 0)).map(
//             (_, index: number) => (
//               <div key={shortId()}>
//                 <Row>
//                   <Col span={6}>Drawer {index + 1}</Col>

//                   <Col span={6}>
//                     <Form.Item name={["drawer_part", index, "front_height"]}>
//                       <InputNumber />
//                     </Form.Item>
//                   </Col>

//                   <Col span={6}>
//                     <Form.Item name={["drawer_part", index, "bottom_depth"]}>
//                       <InputNumber
//                         // @ts-expect-error TS(2322): Type '(value: ValueType, { userTyping, input }: { ... Remove this comment to see the full error message
//                         formatter={(value, { userTyping, input }) => {
//                           if (userTyping) {
//                             return input;
//                           }

//                           if (!value) {
//                             return (
//                               safeNum(cabinet.cabinet_depth) -
//                               (form.getFieldValue("depth_difference") || 0)
//                             );
//                           }

//                           return value;
//                         }}
//                       />
//                     </Form.Item>
//                   </Col>
//                 </Row>
//               </div>
//             )
//           )}
//         </Col>
//       </Row>

//       <Row style={{ marginTop: "100px" }}>
//         {cabinet.number_of_drawers_boxes ? (
//           <Col offset={11}>
//             <img src={CabinetImg} style={{ height: "250px" }} />
//           </Col>
//         ) : null}
//       </Row>
//     </Form>
//   );
// }
