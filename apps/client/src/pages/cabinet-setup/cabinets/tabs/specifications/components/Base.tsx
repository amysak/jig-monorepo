export {};
// import React, { forwardRef } from "react";
// import {
//   Col,
//   Row,
//   Form,
//   Checkbox,
//   InputNumber,
//   Divider,
//   Typography,
//   Select,
// } from "antd";

// import { CABINET_POSITION_METHODS_OPTIONS } from "../../../../../../utilities/constants";
// import { shortId, safeNum, toFixed } from "../../../../../../utilities/utils";

// import "../../../../../defaultsetup/cabinet-specification/style.scss";
// import {
//   inputNumberProps,
//   inputNumberPropsNoDecimal,
// } from "@jigbid/ui";

// const { Title } = Typography;

// const numList = [0, 1, 2];

// const inputNoDecProps = {
//   ...inputNumberPropsNoDecimal,
//   style: {
//     width: "70%",
//   },
// };

// const inputProps = {
//   ...inputNumberProps,
//   style: {
//     width: "70px",
//   },
// };

// function SideCLearanceLabel() {
//   return (
//     <p>
//       Side Width Clearance
//       <br />
//       (total for both sides)
//     </p>
//   );
// }

// function BaseCabinet({ cabinet, form }, ref?) {
//   return (
//     <Row className="">
//       <Col span={7}>
//         <Title level={4}>Top</Title>

//         <Form.Item
//           label="Include Top"
//           name={["include_top"]}
//           valuePropName="checked"
//         >
//           <Checkbox />
//         </Form.Item>

//         <Form.Item
//           label="# of Finished Sides"
//           name={["number_of_top_finished_sides"]}
//         >
//           <Select style={{ width: "70px" }}>
//             {numList.map((value) => {
//               return (
//                 <Select.Option key={`${value}`} value={value}>
//                   {value}
//                 </Select.Option>
//               );
//             })}
//           </Select>
//         </Form.Item>

//         <Form.Item label="Cabinet Depth">{cabinet?.cabinet_depth}</Form.Item>
//         <Form.Item name={["depth_difference_top"]} label="Difference">
//           <InputNumber {...inputProps} />
//         </Form.Item>
//         <Divider className="measurement" />

//         <Form.Item label="Top Depth" shouldUpdate>
//           {() => {
//             const includeTop = form.getFieldValue(["include_top"]);

//             if (!includeTop) return 0;

//             return (
//               safeNum(cabinet.cabinet_depth) -
//               (form.getFieldValue(["depth_difference_top"]) || 0)
//             );
//           }}
//         </Form.Item>

//         <Title level={4}>Stretchers</Title>
//         <Form.Item
//           name={["number_of_top_front_stretcher_finished_sides"]}
//           label="# of Finished Sides"
//         >
//           <Select style={{ width: "70px" }}>
//             {numList.map((value) => {
//               return (
//                 <Select.Option key={`${value}`} value={value}>
//                   {value}
//                 </Select.Option>
//               );
//             })}
//           </Select>
//         </Form.Item>
//         <Form.Item
//           name={["depth_top_front_stretcher"]}
//           label="Top & Front Stretcher Width"
//         >
//           <InputNumber {...inputProps} />
//         </Form.Item>
//         <Form.Item
//           name={["number_of_stretcher_below_drawer_finished_sides"]}
//           label="# of Finished Sides"
//         >
//           <Select style={{ width: "70px" }}>
//             {numList.map((value) => {
//               return (
//                 <Select.Option key={`${value}`} value={value}>
//                   {value}
//                 </Select.Option>
//               );
//             })}
//           </Select>
//         </Form.Item>
//         <Form.Item
//           name={["depth_stretcher_below_drawer"]}
//           label="Stretcher Below Drawer Width"
//         >
//           <InputNumber {...inputProps} />
//         </Form.Item>

//         <Title level={4}>Shelves</Title>
//         <Row>
//           <Col offset={14} span={5}>
//             Adjustable
//           </Col>
//           <Col span={5}>Fixed</Col>
//         </Row>

//         <Form.Item label="# of Finished Sides">
//           <Row>
//             <Col span={12}>
//               <Form.Item name={["number_of_adjusted_shelves_finished_sides"]}>
//                 <Select style={{ width: "80px" }}>
//                   {[0, 1, 2].map((value) => {
//                     return (
//                       <Select.Option key={`${value}`} value={value}>
//                         {value}
//                       </Select.Option>
//                     );
//                   })}
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name={["number_of_fixed_shelves_finished_sides"]}>
//                 <Select style={{ width: "80px" }}>
//                   {[0, 1, 2].map((value) => {
//                     return (
//                       <Select.Option key={`${value}`} value={value}>
//                         {value}
//                       </Select.Option>
//                     );
//                   })}
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form.Item>
//         <Form.Item label="# of Shelves">
//           <Row>
//             <Col span={12}>
//               <Form.Item name={["number_of_adjusted_shelves"]}>
//                 <InputNumber {...inputNoDecProps} />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name={["number_of_fixed_shelves"]}>
//                 <InputNumber {...inputNoDecProps} />
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form.Item>
//         <Form.Item label="Cabinet Depth">
//           <Row>
//             <Col span={12}>
//               <Form.Item>{cabinet.cabinet_depth}</Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item>{cabinet.cabinet_depth}</Form.Item>
//             </Col>
//           </Row>
//         </Form.Item>
//         <Form.Item label="Difference">
//           <Row>
//             <Col span={12}>
//               <Form.Item name={["depth_difference_adjusted_shelves"]}>
//                 <InputNumber {...inputProps} />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name={["depth_difference_fixed_shelves"]}>
//                 <InputNumber {...inputProps} />
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form.Item>
//         <Form.Item label={<SideCLearanceLabel />}>
//           <Row>
//             <Col span={12}>
//               <Form.Item name="shelf_with_clearance">
//                 <InputNumber {...inputProps} />
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form.Item>

//         <Form.Item label="Shelf Depth">
//           <Row>
//             <Col span={12}>
//               <Form.Item shouldUpdate>
//                 {() => {
//                   const numberOfAdjustedShelves = form.getFieldValue([
//                     "number_of_adjusted_shelves",
//                   ]);

//                   if (!numberOfAdjustedShelves) return 0;

//                   return (
//                     // @ts-expect-error TS(2362): The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
//                     toFixed(cabinet.cabinet_depth) -
//                     // @ts-expect-error TS(2363): The right-hand side of an arithmetic operation mus... Remove this comment to see the full error message
//                     toFixed(
//                       form.getFieldValue(["depth_difference_adjusted_shelves"])
//                     )
//                   );
//                 }}
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item shouldUpdate>
//                 {() => {
//                   const numberOfFixedShelves = form.getFieldValue([
//                     "number_of_fixed_shelves",
//                   ]);

//                   if (!numberOfFixedShelves) return 0;

//                   return (
//                     // @ts-expect-error TS(2362): The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
//                     toFixed(cabinet.cabinet_depth) -
//                     // @ts-expect-error TS(2363): The right-hand side of an arithmetic operation mus... Remove this comment to see the full error message
//                     toFixed(
//                       form.getFieldValue(["depth_difference_fixed_shelves"])
//                     )
//                   );
//                 }}
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form.Item>

//         <Divider className="measurement" />

//         <Title level={4}>Deck</Title>
//         <Form.Item
//           label="Include Deck"
//           name={["include_deck"]}
//           valuePropName="checked"
//         >
//           <Checkbox />
//         </Form.Item>

//         <Form.Item
//           label="# of Finished Sides"
//           name={["number_of_deck_finished_sides"]}
//         >
//           <Select style={{ width: "70px" }}>
//             {[0, 1, 2].map((value) => {
//               return (
//                 <Select.Option key={`${value}`} value={value}>
//                   {value}
//                 </Select.Option>
//               );
//             })}
//           </Select>
//         </Form.Item>
//         <Form.Item label="Cabinet Depth">{cabinet.cabinet_depth}</Form.Item>
//         <Form.Item label="Difference" name={["depth_difference_deck"]}>
//           <InputNumber {...inputProps} />
//         </Form.Item>

//         <Divider className="measurement" />

//         <Form.Item label="Deck Depth" shouldUpdate>
//           {() => {
//             const includeDeck = form.getFieldValue([["include_deck"]]);

//             if (!includeDeck) return 0;

//             return (
//               cabinet.cabinet_depth -
//               safeNum(form.getFieldValue(["depth_difference_deck"]))
//             );
//           }}
//         </Form.Item>
//       </Col>

//       <Col
//         span={10}
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//         }}
//       >
//         <div ref={ref} id="board-img" />
//       </Col>

//       <Col span={7}>
//         <br />
//         <br />
//         <Title level={4}>Back Stretcher</Title>
//         <Form.Item
//           label="# of Finished Sides"
//           name={["number_of_top_back_stretcher_finished_sides"]}
//         >
//           <Select style={{ width: "70px" }}>
//             {numList.map((value) => {
//               return (
//                 <Select.Option key={`${value}`} value={value}>
//                   {value}
//                 </Select.Option>
//               );
//             })}
//           </Select>
//         </Form.Item>
//         <Form.Item
//           label="Top Back Stretcher Width"
//           name={["depth_top_back_stretcher"]}
//         >
//           <InputNumber {...inputProps} />
//         </Form.Item>

//         <Title level={4}>Back Nailer</Title>
//         <Form.Item
//           label="# of Finished Sides"
//           name={["number_of_nailer_finished_sides"]}
//         >
//           <Select style={{ width: "70px" }}>
//             {numList.map((value) => {
//               return (
//                 <Select.Option key={`${value}`} value={value}>
//                   {value}
//                 </Select.Option>
//               );
//             })}
//           </Select>
//         </Form.Item>
//         <Form.Item label="Nailer Height" name={["nailer_height"]}>
//           <InputNumber {...inputProps} />
//         </Form.Item>
//         <Form.Item label="Nailer Quantity X" name={["nailer_quantity"]}>
//           <InputNumber {...inputProps} />
//         </Form.Item>

//         <Divider className="measurement" />

//         <Form.Item label="Nailer Total" shouldUpdate>
//           {() => {
//             return (
//               (form.getFieldValue(["nailer_height"]) || 0) *
//               (form.getFieldValue(["nailer_quantity"]) || 0)
//             );
//           }}
//         </Form.Item>

//         <Title level={4}>Cabinet Back</Title>
//         <Form.Item
//           label="Include Back"
//           name={["include_back"]}
//           valuePropName="checked"
//         >
//           <Checkbox />
//         </Form.Item>
//         <Form.Item label="Back Position Method" name="back_position_method">
//           <Select>
//             {CABINET_POSITION_METHODS_OPTIONS.map((option) => (
//               <Select.Option key={shortId()} value={option.value}>
//                 {option.label}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item
//           label="# of Finished Sides"
//           name={["number_of_back_finished_sides"]}
//         >
//           <Select style={{ width: "70px" }}>
//             {[0, 1, 2].map((value) => {
//               return (
//                 <Select.Option key={`${value}`} value={value}>
//                   {value}
//                 </Select.Option>
//               );
//             })}
//           </Select>
//         </Form.Item>

//         <Form.Item label="Cabinet Height">{cabinet.cabinet_height}</Form.Item>

//         <Form.Item label="Toe Kick Height" shouldUpdate>
//           {() => {
//             return (
//               <Form.Item name="toe_kick_height">
//                 <InputNumber
//                   {...inputProps}
//                   disabled={form.getFieldValue(["base_style"]) === "standard"}
//                 />
//               </Form.Item>
//             );
//           }}
//         </Form.Item>

//         <Form.Item label="Bottom Dado Clearance" shouldUpdate>
//           {() => {
//             return form.getFieldValue(["base_style"]) !== "standard"
//               ? `- ${toFixed(
//                   safeNum(
//                     form.getFieldValue("cabinet_material_thickness") || 0
//                   ) - (form.getFieldValue(["dado_depth"]) || 0)
//                 )}`
//               : null;
//           }}
//         </Form.Item>

//         <Form.Item label="Top Dado Clearance" shouldUpdate>
//           {() => {
//             return form.getFieldValue(["base_style"]) !== "standard"
//               ? `- ${toFixed(
//                   safeNum(
//                     form.getFieldValue("cabinet_material_thickness") || 0
//                   ) - (form.getFieldValue(["dado_depth"]) || 0)
//                 )}`
//               : null;
//           }}
//         </Form.Item>

//         <Divider className="measurement" />

//         <Form.Item label="Cabinet Back Height" shouldUpdate>
//           {() => {
//             const dadoClearance =
//               (form.getFieldValue("cabinet_material_thickness") || 0) -
//               (form.getFieldValue(["dado_depth"]) || 0);

//             return form.getFieldValue(["base_style"]) !== "standard"
//               ? toFixed(
//                   safeNum(form.getFieldValue("cabinet_height")) -
//                     safeNum(form.getFieldValue("toe_kick_height")) -
//                     dadoClearance * 2
//                 )
//               : toFixed(safeNum(form.getFieldValue("cabinet_height")));
//           }}
//         </Form.Item>

//         <Title level={4}>Cabinet Sides</Title>
//         <Form.Item name={["number_of_cabinet_sides"]} label="# of Sides">
//           <Select style={{ width: "70px" }}>
//             {[0, 1, 2].map((value) => {
//               return (
//                 <Select.Option key={`${value}`} value={value}>
//                   {value}
//                 </Select.Option>
//               );
//             })}
//           </Select>
//         </Form.Item>

//         <Form.Item
//           name={["number_of_cabinet_finished_sides"]}
//           label="# of Finished Sides"
//         >
//           <Select style={{ width: "70px" }}>
//             {[0, 1, 2].map((value) => {
//               return (
//                 <Select.Option key={`${value}`} value={value}>
//                   {value}
//                 </Select.Option>
//               );
//             })}
//           </Select>
//         </Form.Item>

//         <Form.Item label="Cabinet Height" name="cabinet_height">
//           <InputNumber {...inputProps} />
//         </Form.Item>

//         <Form.Item label="Toe Kick Height — " shouldUpdate>
//           {() => {
//             return (
//               <Form.Item name="toe_kick_height">
//                 <InputNumber
//                   {...inputProps}
//                   disabled={form.getFieldValue(["base_style"]) === "standard"}
//                 />
//               </Form.Item>
//             );
//           }}
//         </Form.Item>

//         <Divider className="measurement" />

//         <Form.Item label="Cabinet Side Height" shouldUpdate>
//           {() => {
//             return form.getFieldValue(["base_style"]) === "standard"
//               ? toFixed(safeNum(form.getFieldValue("cabinet_height")))
//               : toFixed(
//                   safeNum(form.getFieldValue("cabinet_height")) -
//                     safeNum(form.getFieldValue("toe_kick_height"))
//                 );
//           }}
//         </Form.Item>

//         <Title level={4}>Finished Ends</Title>

//         <Form.Item name="number_of_finished_ends" label="# of Finished Ends">
//           <Select style={{ width: "70px" }}>
//             {[0, 1, 2].map((value) => {
//               return (
//                 <Select.Option key={`${value}`} value={value}>
//                   {value}
//                 </Select.Option>
//               );
//             })}
//           </Select>
//         </Form.Item>
//       </Col>
//     </Row>
//   );
// }

// export default forwardRef(BaseCabinet);

// export const basePoints = [
//   { start: [1, 15], end: [1, 135] },

//   { start: [1, 165], end: [1, 205] },
//   { start: [1, 185], end: [100, 185] },

//   { start: [1, 215], end: [1, 260] },
//   { start: [1, 245], end: [130, 245] },

//   { start: [1, 285], end: [1, 475] },
//   { start: [1, 340], end: [180, 340] },

//   { start: [1, 500], end: [1, 605] },
//   { start: [1, 555], end: [200, 555] },
//   { start: [200, 555], end: [200, 480] },

//   { start: [530, 60], end: [530, 110] },
//   { start: [530, 85], end: [250, 85] },
//   { start: [250, 85], end: [250, 130] },

//   { start: [530, 150], end: [530, 230] },
//   { start: [530, 165], end: [330, 165] },
//   { start: [330, 165], end: [330, 205] },

//   { start: [530, 260], end: [530, 435] },
//   { start: [530, 300], end: [420, 300] },
//   { start: [420, 300], end: [420, 230] },

//   { start: [530, 470], end: [530, 575] },
//   { start: [530, 530], end: [420, 530] },
//   { start: [420, 530], end: [420, 470] },
// ];
