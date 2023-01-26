export {};
// import { Col, Divider, Form, InputNumber, Row, Typography } from "antd";
// import debounce from "lodash-es";
// import React, { useContext } from "react";
// import { CabinetContext } from "../../../../store/cabinets";
// import { safeNum, shortId } from "../../../../utilities/utils";

// import CabinetImg from "../../../../assets/images/cabinets/BP_Five_Part_Drawer_Box.png";

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

// export default function FivePartDrawerBox() {
//   const [form] = Form.useForm();
//   const cabinetCtx = useContext(CabinetContext);

//   const { cabinet } = cabinetCtx;

//   React.useEffect(() => form.resetFields(), [cabinet]);

//   const onValuesChange = debounce(
//     async (value, values: { five_part_drawer: any[] }) => {
//       values.five_part_drawer = values.five_part_drawer?.map(
//         (part: { cabinet: any }) => {
//           part.cabinet = cabinet.id;

//           return part;
//         }
//       );

//       await cabinetCtx.onUpdateCabinet(cabinet.id, values, false);
//     },
//     1000
//   );

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
//           <Title level={4}>Five Part Drawer Box Parts</Title>
//         </Col>
//       </Row>

//       <Row>
//         <Col span={8}>
//           <Form.Item label="Number of Drawer Boxes" shouldUpdate>
//             {() => form.getFieldValue("number_of_drawers_boxes")}
//           </Form.Item>

//           <Form.Item label="Cabinet Depth">{cabinet.cabinet_depth}</Form.Item>

//           <Form.Item label="Difference" name="depth_difference">
//             <InputNumber />
//           </Form.Item>

//           <Divider />

//           <Form.Item label="Drawer Box Depth" shouldUpdate>
//             {() => {
//               return (
//                 safeNum(cabinet.cabinet_depth) -
//                 (form.getFieldValue("depth_difference") || 0)
//               );
//             }}
//           </Form.Item>
//         </Col>

//         <Col span={16}>
//           <Row>
//             <Col span={4}>Drawer</Col>
//             <Col span={4}>Front Height</Col>
//             <Col span={4}>Side height</Col>
//             <Col span={4}>Back Height</Col>
//             <Col span={4}>Bottom Depth</Col>
//           </Row>

//           {Array.from(Array(cabinet.number_of_drawers_boxes || 0)).map(
//             (_, index: number) => (
//               <div key={shortId()}>
//                 <Row>
//                   <Col span={4}>Drawer {index + 1}</Col>

//                   <Col span={4}>
//                     <Form.Item
//                       name={["five_part_drawer", index, "front_height"]}
//                     >
//                       <InputNumber />
//                     </Form.Item>
//                   </Col>

//                   <Col span={4}>
//                     <Form.Item
//                       name={["five_part_drawer", index, "side_height"]}
//                     >
//                       <InputNumber />
//                     </Form.Item>
//                   </Col>

//                   <Col span={4}>
//                     <Form.Item
//                       name={["five_part_drawer", index, "back_height"]}
//                     >
//                       <InputNumber />
//                     </Form.Item>
//                   </Col>

//                   <Col span={4}>
//                     <Form.Item
//                       name={["five_part_drawer", index, "bottom_depth"]}
//                     >
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
