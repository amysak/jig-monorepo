export {};
// import { Col, Divider, Form, InputNumber, Row, Typography } from "antd";
// import debounce from "lodash-es";
// import React, { useContext } from "react";
// import { CabinetContext } from "../../../../store/cabinets";
// import { safeNum, shortId, toFixed } from "../../../../utilities/utils";

// import CabinetImg from "../../../../assets/images/cabinets/BP_Metal_Tray_System.png";

// const layout = {
//   wrapperCol: {
//     sm: { span: 8 },
//     md: { span: 10 },
//   },
//   labelCol: {
//     sm: { span: 16 },
//     md: { span: 14 },
//   },
// };

// const { Title } = Typography;

// export default function MetalTraySystem() {
//   const [form] = Form.useForm();
//   const cabinetCtx = useContext(CabinetContext);

//   const { cabinet } = cabinetCtx;

//   React.useEffect(() => form.resetFields(), [cabinet]);

//   const onValuesChange = debounce(
//     async (value, values: { tray_part: any[] }) => {
//       values.tray_part = values.tray_part.map((part: { cabinet: any }) => {
//         part.cabinet = cabinet.id;

//         return part;
//       });

//       await cabinetCtx.onUpdateCabinet(cabinet.id, values, false);
//     },
//     1000
//   );

//   return (
//     <Form
//       form={form}
//       initialValues={cabinet}
//       onValuesChange={onValuesChange}
//       className="cabinet-form"
//       {...layout}
//     >
//       <Row>
//         <Col offset={6}>
//           <Title level={4}>Metal Tray Box Parts</Title>
//         </Col>
//       </Row>

//       <Row>
//         <Col span={6}>
//           <Form.Item label="Number of Roll Out Trays">
//             {cabinet.number_of_rollout_trays}
//           </Form.Item>
//           <Form.Item label="Cabinet Depth">{cabinet.cabinet_depth}</Form.Item>
//           <Form.Item label="Difference" name="tray_box_depth_difference">
//             <InputNumber />
//           </Form.Item>

//           <Divider />

//           <Form.Item label="Drawer Box Depth" shouldUpdate>
//             {() => {
//               return (
//                 safeNum(cabinet.cabinet_depth) -
//                 safeNum(form.getFieldValue("tray_box_depth_difference"))
//               );
//             }}
//           </Form.Item>
//         </Col>

//         <Col span={10}>
//           <Row>
//             <Col span={6}>Tray</Col>
//             <Col span={6}>Front Height</Col>
//             <Col span={6}>Back Height</Col>
//             <Col span={6}>Bottom Depth</Col>
//           </Row>

//           {Array.from(Array(cabinet.number_of_rollout_trays || 0)).map(
//             (_, index: number) => (
//               <div key={shortId()}>
//                 <Row>
//                   <Col span={6}>Tray {index + 1}</Col>

//                   <Col span={6}>
//                     <Form.Item name={["tray_part", index, "front_height"]}>
//                       <InputNumber />
//                     </Form.Item>
//                   </Col>

//                   <Col span={6}>
//                     <Form.Item name={["tray_part", index, "back_height"]}>
//                       <InputNumber />
//                     </Form.Item>
//                   </Col>

//                   <Col span={6}>
//                     <Form.Item name={["tray_part", index, "bottom_depth"]}>
//                       <InputNumber
//                         // @ts-expect-error TS(2322): Type '(value: ValueType, { userTyping, input }: { ... Remove this comment to see the full error message
//                         formatter={(value, { userTyping, input }) => {
//                           if (userTyping) {
//                             return input;
//                           }

//                           if (!value) {
//                             return (
//                                 cabinet.cabinet_depth
//                                -
//                                 form.getFieldValue("tray_box_depth_difference")
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
//         {cabinet.number_of_rollout_trays ? (
//           <Col offset={8}>
//             <img src={CabinetImg} style={{ height: "250px" }} />
//           </Col>
//         ) : null}
//       </Row>
//     </Form>
//   );
// }
