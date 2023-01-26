export {};
// import { Col, Divider, Form, InputNumber, Row, Typography } from "antd";
// import React, { useContext } from "react";
// import { CabinetContext } from "../../../../store/cabinets";
// import { inputNumberPropsThreeDecimal } from "../../../../utilities";
// import {
//   safeNum,
//   sumCabDrawerProp,
//   toFixed,
// } from "../../../../utilities/utils";

// const { Title } = Typography;

// const layout = {
//   wrapperCol: {
//     span: 8,
//   },
//   labelCol: {
//     span: 16,
//   },
// };

// export default function DoorSpecification() {
//   const [form] = Form.useForm();
//   const cabinetCtx = useContext(CabinetContext);

//   const { cabinet } = cabinetCtx;
//   React.useEffect(() => form.resetFields(), [cabinet]);

//   const onValuesChange = async (
//     value,
//     values: { cabinet_height: number; floor_to_bottom_of_upper: any }
//   ) => {
//     values.cabinet_height =
//       safeNum(values.cabinet_height) - safeNum(values.floor_to_bottom_of_upper);

//     await cabinetCtx.onUpdateCabinet(cabinet.id, values, false);
//   };

//   const isUpper = (category: string) =>
//     category?.trim().toLowerCase() === "upper";

//   return (
//     <Form
//       onValuesChange={onValuesChange}
//       form={form}
//       initialValues={cabinet}
//       layout="horizontal"
//       {...layout}
//       className="cabinet-form"
//     >
//       <Row>
//         <Col span={4}>
//           <Title level={3}>Doors</Title>
//           <Form.Item label="# of Upper Doors">
//             {cabinet?.upper_doors || 0}
//           </Form.Item>
//           <Form.Item label="# of Base Doors">
//             {cabinet?.base_doors || 0}
//           </Form.Item>
//         </Col>

//         <Col span={10}>
//           <Row>
//             <Col span={8}>
//               <Title level={4}>Drawer Fronts</Title>
//               <Form.Item shouldUpdate label="# of Drawer Fronts">
//                 {() => form.getFieldValue("number_of_drawer_fronts")}
//               </Form.Item>
//             </Col>

//             <Col span={16}>
//               <Title className="center-text" level={4}>
//                 Drawer Front Heights
//               </Title>

//               {Array.from(Array(cabinet.number_of_drawer_fronts || 0)).map(
//                 (_, index: number) => {
//                   return (
//                     <Form.Item
//                       key={`${index}`}
//                       label={`Drawer ${index + 1}`}
//                       name={["door_specification", index, "front_height"]}
//                     >
//                       <InputNumber />
//                     </Form.Item>
//                   );
//                 }
//               )}

//               <Divider />

//               <Form.Item label="Total of Drawer Front Heights" shouldUpdate>
//                 {sumCabDrawerProp(
//                   form.getFieldValue("door_specification"),
//                   "front_height",
//                   safeNum(form.getFieldValue("number_of_drawer_fronts"))
//                 )}
//               </Form.Item>
//             </Col>
//           </Row>
//         </Col>

//         <Col span={8}>
//           <Title className="center-text" level={4}>
//             Door and Drawer Fronts Reveal
//           </Title>

//           <Form.Item
//             help="X"
//             label="Door and Drawer Reveal"
//             name="door_and_drawer_reveal"
//           >
//             <InputNumber {...inputNumberPropsThreeDecimal} />
//           </Form.Item>

//           <Form.Item label="Number of Drawer Fronts" help="+">
//             {cabinet.number_of_drawer_fronts}
//           </Form.Item>

//           <Form.Item shouldUpdate noStyle>
//             {() => {
//               if (cabinet.category !== "tall") return null;

//               return (
//                 <Form.Item label="Reveal between Doors (Tall Only)" help="+">
//                   {form.getFieldValue("door_and_drawer_reveal")}
//                 </Form.Item>
//               );
//             }}
//           </Form.Item>

//           <Form.Item
//             shouldUpdate
//             label="Cabinet Top Reveal (Above Door & Drawers)"
//             help="+"
//           >
//             {() => {
//               return (
//                 <Form.Item name="top_reveal">
//                   <InputNumber {...inputNumberPropsThreeDecimal} />
//                 </Form.Item>
//               );
//             }}
//           </Form.Item>

//           <Form.Item
//             shouldUpdate
//             label="Cabinet Bottom Reveal (Below Door & Drawers)"
//           >
//             {() => {
//               return (
//                 <Form.Item name="bottom_reveal">
//                   <InputNumber {...inputNumberPropsThreeDecimal} />
//                 </Form.Item>
//               );
//             }}
//           </Form.Item>

//           <br />

//           <Divider />

//           <Form.Item label="Total Door Allowance" shouldUpdate>
//             {() => {
//               const reveal = safeNum(
//                 form.getFieldValue("door_and_drawer_reveal")
//               );
//               const topReveal = reveal;
//               const bottomReveal = reveal;
//               const total =
//                 safeNum(form.getFieldValue("door_and_drawer_reveal")) *
//                 safeNum(cabinet.number_of_drawer_fronts);

//               if (cabinet.category === "tall") {
//                 return toFixed(total + reveal + topReveal + bottomReveal, 3);
//               }

//               return toFixed(total + topReveal + bottomReveal, 3);
//             }}
//           </Form.Item>
//         </Col>
//       </Row>

//       <Row>
//         <Col span={6}>
//           <Title level={4}>Cabinet Sides</Title>
//           <Form.Item name="cabinet_height" label="Floor to Top of Cabinet">
//             <InputNumber />
//           </Form.Item>

//           <Form.Item
//             name="floor_to_bottom_of_upper"
//             label="Floor to Bottom of Upper"
//           >
//             <InputNumber />
//           </Form.Item>

//           <Divider />

//           <Form.Item label="Cabinet Height" shouldUpdate>
//             {() => {
//               return (
//                 safeNum(form.getFieldValue("cabinet_height")) -
//                 safeNum(form.getFieldValue("floor_to_bottom_of_upper"))
//               );
//             }}
//           </Form.Item>

//           {isUpper(cabinet?.category) ? null : (
//             <Form.Item name="toe_kick_height" label="Toe Kick Height">
//               <InputNumber />
//             </Form.Item>
//           )}

//           <Divider />

//           <Form.Item label="Cabinet Side Height" shouldUpdate>
//             {() => {
//               return isUpper(cabinet?.category)
//                 ? cabinet?.cabinet_height
//                 : cabinet?.cabinet_height -
//                     form.getFieldValue("toe_kick_height");
//             }}
//           </Form.Item>
//         </Col>

//         <Col span={6}>
//           <Title level={4}>Door Heights</Title>
//           <Form.Item label="Cabinet Side Height" shouldUpdate>
//             {() => {
//               return (
//                 cabinet?.cabinet_height - form.getFieldValue("toe_kick_height")
//               );
//             }}
//           </Form.Item>

//           <Form.Item label="Drawer Heights" shouldUpdate>
//             {() => {
//               const count = safeNum(
//                 form.getFieldValue("number_of_drawer_fronts")
//               );

//               return sumCabDrawerProp(
//                 form.getFieldValue("door_specification"),
//                 "front_height",
//                 count
//               );
//             }}
//           </Form.Item>

//           <Divider />

//           <Form.Item label="Total Allowance" shouldUpdate>
//             {() => {
//               const reveal = safeNum(
//                 form.getFieldValue("door_and_drawer_reveal")
//               );
//               const topReveal = reveal;
//               const bottomReveal = reveal;
//               const total =
//                 safeNum(form.getFieldValue("door_and_drawer_reveal")) *
//                 safeNum(cabinet.number_of_drawer_fronts);

//               if (cabinet.category === "tall") {
//                 return toFixed(total + reveal + topReveal + bottomReveal, 3);
//               }

//               return toFixed(total + topReveal + bottomReveal, 3);
//             }}
//           </Form.Item>

//           <Divider />

//           <Form.Item label="Upper Door Height">0</Form.Item>

//           <Divider />

//           <Form.Item label="Base Door Height" shouldUpdate>
//             {() => {
//               let totalAllowance = 0;

//               if (isUpper(cabinet.category)) return null;

//               const reveal = safeNum(
//                 form.getFieldValue("door_and_drawer_reveal")
//               );
//               const topReveal = reveal;
//               const bottomReveal = reveal;
//               const total =
//                 safeNum(form.getFieldValue("door_and_drawer_reveal")) *
//                 safeNum(cabinet.number_of_drawer_fronts);

//               if (cabinet.category === "tall") {
//                 // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
//                 totalAllowance = toFixed(
//                   total + reveal + topReveal + bottomReveal,
//                   3
//                 );
//               }

//               // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
//               totalAllowance = toFixed(total + topReveal + bottomReveal, 3);
//               const sideHeight =
//                 cabinet?.cabinet_height - form.getFieldValue("toe_kick_height");

//               // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
//               const drawerHeights = sumCabDrawerProp(
//                 form.getFieldValue("drawer_part"),
//                 "front_height"
//               );
//               const baseDoorHeight =
//                 sideHeight - drawerHeights - totalAllowance;
//               const override = safeNum(
//                 form.getFieldValue("override_base_door_height")
//               );

//               return override || baseDoorHeight;
//             }}
//           </Form.Item>
//         </Col>

//         <Col>
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />

//           <Form.Item
//             name="override_upper_door_height"
//             label="Override Upper Door Height"
//           >
//             <InputNumber />
//           </Form.Item>

//           <Divider />

//           <Form.Item
//             name="override_base_door_height"
//             label="Override Base Door Height"
//           >
//             <InputNumber />
//           </Form.Item>
//         </Col>
//       </Row>
//     </Form>
//   );
// }
