export {};
// import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "@tanstack/react-router";

// import {
//   Col,
//   Divider,
//   Form,
//   Input,
//   InputNumber,
//   Radio,
//   Row,
//   Select,
//   Table,
//   Typography,
// } from "antd";
// import debounce from "lodash-es";
// import pluralize from "pluralize";

// import { sendNotificationRequest } from "../../../actions/notification";
// import { getDoorsDrawers, TGetDoorsDrawersData } from "../../../api/doors";
// import { getMaterialTypes } from "../../../api/material-types";
// import {
//   getOneMaterialSetup,
//   getSetupMaterials,
//   TGetSetupMaterialsData,
//   updateOneMaterialSetup,
// } from "../../../api/materials";
// import { getVendors } from "../../../api/vendors";
// import UILayout from "../../../components/templates/uilayout";
// import useFilter from "../../../hooks/useFilter";
// import { store } from "../../../store";
// import {
//   buildSelectOptions,
//   inputNumberCostProps,
//   inputNumberPercentProps,
// } from "../../../utilities";
// import {
//   ACTIVE_INACTIVE_STATUSES_OPTIONS,
//   IN_OUT_SOURCE,
//   IN_OUT_SOURCE_OPTIONS,
//   MATERIAL_PURPOSES_OPTIONS,
// } from "../../../utilities/constants";
// import {
//   calcDiscount,
//   capitalize,
//   getQueryString,
//   lowerCase,
//   safeNum,
//   setTableRowClass,
//   shortId,
//   sleep,
//   toFixed,
// } from "../../../utilities/utils";
// import { JoinType } from "../door-drawers/categories/DrawerBox";
// import { PageHeader } from "./components";
// import OutsourcedDrawerBox from "./components/OutsourcedDrawerBox";

// interface MaterialFormProps {
//   material: Record<string, any>;
//   setMaterial: Dispatch<SetStateAction<Record<string, any>>>;
// }

// const { Title } = Typography;

// const inputStyle = {
//   width: "80%",
// };

// function Filters() {
//   const [form] = Form.useForm();
//   const params = useParams<{ id?: string }>();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [materials, setMaterials] = useState<TGetSetupMaterialsData>([[], 0]);
//   const [types, setTypes] = useState([]);
//   const [filters, setFilters] = useFilter("materials-setup", {});

//   const scrollToMaterial = () => {
//     const matRow = document.querySelector(`.selected-row`);

//     if (matRow) matRow.scrollIntoView();
//   };

//   const getTypes = async (purpose) => {
//     try {
//       if (!purpose) return;

//       const types = await getMaterialTypes(`?purpose=${purpose}`);

//       setTypes(types[0]);
//     } catch (error) {}
//   };

//   const getData = async (queryFilters = filters) => {
//     try {
//       setLoading(true);

//       getTypes(queryFilters.purpose);

//       const query = getQueryString(queryFilters);
//       const materialList = await getSetupMaterials(query);

//       setFilters(queryFilters);
//       setMaterials(materialList);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onValuesChange = (_, filters) => {
//     getData(filters);
//   };

//   useEffect(() => {
//     getData();

//     sleep(1000).then(scrollToMaterial);
//   }, []);

//   const columns = [
//     {
//       dataIndex: "name",
//       key: "name",
//     },
//   ];

//   useEffect(() => form.resetFields(), [materials]);

//   return (
//     <Col span={6}>
//       <Form
//         initialValues={filters}
//         form={form}
//         onValuesChange={onValuesChange}
//         layout="vertical"
//         className="pagewrapper__leftside"
//       >
//         <Title level={4}>Materials</Title>
//         <Form.Item label="Status" name="status">
//           <Select allowClear>
//             {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((status) => (
//               <Select.Option key={shortId()} value={status.value}>
//                 {status.label}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item label="Purpose" name="purpose">
//           <Select allowClear>
//             {MATERIAL_PURPOSES_OPTIONS.map((option) => (
//               <Select.Option value={option.value} key={shortId()}>
//                 {option.label}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item
//           label="Material Type"
//           name={["type"]}
//           // @ts-expect-error TS(2322): Type '{ children: Element; label: string; name: st... Remove this comment to see the full error message
//           notFoundContent=""
//         >
//           <Select allowClear>
//             {types.map((option) => (
//               <Select.Option value={option.id} key={shortId()}>
//                 {option.name}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item>
//           <Table
//             columns={columns}
//             dataSource={materials[0]}
//             pagination={false}
//             showHeader={false}
//             loading={loading}
//             rowKey="id"
//             rowClassName={setTableRowClass(params.id)}
//             style={{
//               height: window.innerHeight - 100,
//               overflow: "auto",
//             }}
//             size="small"
//             onRow={(row) => {
//               return {
//                 onClick: () => navigate(`/cabinet-setup/materials/${row.id}`),
//               };
//             }}
//           />
//         </Form.Item>
//       </Form>
//     </Col>
//   );
// }

// function MaterialForm({ material }: MaterialFormProps) {
//   const [form] = Form.useForm();
//   const [vendors, setVendors] = useState([]);
//   const [types, setTypes] = useState([]);
//   const [doors, setDoors] = useState<TGetDoorsDrawersData>([[], 0]);

//   useEffect(() => {
//     form.resetFields();
//   }, [material, types]);

//   const getVendorsData = async (purpose) => {
//     try {
//       const vendors = await getVendors(`?purpose=${purpose}`);

//       setVendors(vendors[0]);
//     } catch (error) {}
//   };

//   const getTypes = async (purpose) => {
//     try {
//       if (!purpose) return;

//       const types = await getMaterialTypes(`?purpose=${purpose}`);

//       setTypes(types[0]);
//     } catch (error) {}
//   };

//   const onValuesChange = debounce(
//     async (
//       value,
//       values: {
//         source: any;
//         in_house_material_cost: number;
//         waste_factor: number;
//         out_material_cost_per_sq_feet: number;
//         supplier_discount: number;
//         purpose: any;
//       }
//     ) => {
//       try {
//         const in_discounted_cost =
//           lowerCase(values.source) === IN_OUT_SOURCE[0] || !values.source
//             ? calcDiscount(values.in_house_material_cost, values.waste_factor) +
//               safeNum(values.in_house_material_cost)
//             : material.in_discounted_cost;

//         const out_discounted_cost =
//           lowerCase(values.source) === IN_OUT_SOURCE[1]
//             ? safeNum(values.out_material_cost_per_sq_feet) -
//               calcDiscount(
//                 values.out_material_cost_per_sq_feet,
//                 values.supplier_discount
//               )
//             : material.out_discounted_cost;

//         const payload = Object.assign({}, values, {
//           in_discounted_cost,
//           out_discounted_cost,
//         });

//         await updateOneMaterialSetup(material.id, payload);

//         if (material?.purpose !== values.purpose) {
//           getTypes(values.purpose);
//         }

//         store.dispatch(
//           sendNotificationRequest({
//             message: "Update successful.",
//             type: "success",
//           })
//         );
//       } catch (e) {
//         console.log(e);
//         store.dispatch(
//           sendNotificationRequest({
//             message: "Update failed.",
//             type: "error",
//           })
//         );
//       }
//     },
//     1000
//   );

//   const getDoorsUsingMaterialType = async () => {
//     try {
//       const filter = {
//         category: material?.purpose,
//         material: material?.id,
//       };

//       if (!filter.material) return;

//       const query = getQueryString(filter);
//       const doors = await getDoorsDrawers(query);

//       setDoors(doors);
//     } catch (error) {
//       console.error(error);
//     } finally {
//     }
//   };

//   useEffect(() => {
//     getDoorsUsingMaterialType();
//     getTypes(material?.purpose);
//     getVendorsData(material.purpose);
//   }, [material]);

//   const doorModelTableColumns = [
//     {
//       title: "Model Number",
//       dataIndex: "model_number",
//       key: "model_number",

//       render(modelNumber, row: { id: any; name: any; category: any }) {
//         return (
//           <Link to={`/cabinet-setup/door-drawers/${row.id}`}>
//             {row.name} ({row.category})
//           </Link>
//         );
//       },
//     },
//     {
//       title: "Material Type",
//       dataIndex: "material_type",
//       key: "material_type",

//       render(materialType: { name: any }) {
//         return materialType?.name ?? "";
//       },
//     },
//     {
//       title: "Vendor",
//       dataIndex: "vendor",
//       key: "vendor",

//       render(vendor: { name: any }) {
//         return vendor?.name ?? "";
//       },
//     },
//   ];

//   return (
//     <Col span={18}>
//       <div className="pagewrapper__maincontent">
//         <Form
//           onValuesChange={onValuesChange}
//           form={form}
//           initialValues={material}
//           layout="vertical"
//         >
//           <Title level={4}>Rules for entering materials</Title>
//           <Row>
//             <Col span={6}>
//               <Form.Item label="Material Name" name="name">
//                 <Input style={inputStyle} />
//               </Form.Item>
//             </Col>

//             <Col span={6}>
//               <Form.Item label="Material Type" name={["type", "id"]}>
//                 <Select style={inputStyle} placeholder="Material type">
//                   {buildSelectOptions(types, material.type).map((option) => (
//                     <Select.Option value={option.id} key={shortId()}>
//                       {option.name}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>

//             <Col span={6}>
//               <Form.Item label="Purpose" name="purpose">
//                 <Select style={inputStyle}>
//                   {MATERIAL_PURPOSES_OPTIONS.map((option) => (
//                     <Select.Option value={option.value} key={shortId()}>
//                       {option.label}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>

//             <Col span={6}>
//               <Form.Item label="Status" name="status">
//                 <Select style={inputStyle}>
//                   {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((option) => (
//                     <Select.Option value={option.value} key={shortId()}>
//                       {option.label}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>

//             <Col span={6}>
//               <Form.Item label="Vendor" name={["vendor", "id"]}>
//                 <Select style={inputStyle} placeholder="Vendor">
//                   {buildSelectOptions(vendors, material.vendor).map(
//                     (option) => (
//                       <Select.Option value={option.id} key={shortId()}>
//                         {option.name}
//                       </Select.Option>
//                     )
//                   )}
//                 </Select>
//               </Form.Item>
//             </Col>

//             <Col span={6}>
//               <Form.Item label="Finished/Unfinished" name="finish">
//                 <Radio.Group>
//                   <Radio value="finished">F</Radio>
//                   <Radio value="unfinished">U</Radio>
//                 </Radio.Group>
//               </Form.Item>
//             </Col>

//             <Col span={6}>
//               <Form.Item shouldUpdate>
//                 {() => {
//                   const isEdgebanding =
//                     form.getFieldValue("purpose")?.toLowerCase() ===
//                     "edgebanding";

//                   if (isEdgebanding) return null;

//                   return (
//                     <Form.Item label="Material Thickness" name="thickness">
//                       <InputNumber style={inputStyle} />
//                     </Form.Item>
//                   );
//                 }}
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row>
//             <Col span={6}>
//               <Form.Item label="Description" name="description">
//                 <Input.TextArea rows={6} style={inputStyle} />
//               </Form.Item>
//             </Col>

//             <Col span={6}>
//               <Form.Item
//                 label="Internal Note (non-printable)"
//                 name="internal_note"
//               >
//                 <Input.TextArea rows={6} />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Form.Item shouldUpdate>
//             {() => {
//               const isDraweBox =
//                 form.getFieldValue("purpose")?.toLowerCase() === "drawer box";

//               if (!isDraweBox) return null;

//               return (
//                 <>
//                   <Divider />
//                   <JoinType />
//                 </>
//               );
//             }}
//           </Form.Item>

//           <Divider />

//           <Form.Item shouldUpdate>
//             {() => {
//               const purpose = form.getFieldValue("purpose")?.toLowerCase();
//               const isEdgeBanding = purpose === "edgebanding";

//               if (!purpose) return null;
//               if (isEdgeBanding) return null;

//               return (
//                 <Col span={6}>
//                   <Form.Item label="Material Source" name="source">
//                     <Radio.Group>
//                       {IN_OUT_SOURCE_OPTIONS.map((option) => (
//                         <Radio.Button key={shortId()} value={option.value}>
//                           {option.label}
//                         </Radio.Button>
//                       ))}
//                     </Radio.Group>
//                   </Form.Item>
//                 </Col>
//               );
//             }}
//           </Form.Item>

//           <Row>
//             <Col span={12} className="bordered-row">
//               <Form.Item shouldUpdate>
//                 {() => {
//                   const source = form.getFieldValue("source")?.toLowerCase();
//                   const purpose = form.getFieldValue("purpose")?.toLowerCase();
//                   const isIn = source === "in";
//                   const isEdgeBanding = purpose === "edgebanding";

//                   if (!purpose) return null;

//                   if (isEdgeBanding) {
//                     return (
//                       <>
//                         <Title level={4}>Edgebanding</Title>

//                         <Form.Item
//                           name="length_of_roll"
//                           className="width-100 row"
//                           label="Length of Roll (feet)"
//                           labelCol={{ span: 6 }}
//                           wrapperCol={{ span: 18 }}
//                         >
//                           <InputNumber />
//                         </Form.Item>

//                         <Form.Item
//                           name="edgebanding_cost_per_roll"
//                           className="width-100 row"
//                           label="Edgebanding Cost per Roll"
//                           labelCol={{ span: 6 }}
//                           wrapperCol={{ span: 18 }}
//                         >
//                           <InputNumber {...inputNumberCostProps} />
//                         </Form.Item>

//                         <Form.Item
//                           shouldUpdate
//                           label="Edgebanding Cost per Foot"
//                           className="width-100 row"
//                           labelCol={{ span: 6 }}
//                           wrapperCol={{ span: 18 }}
//                         >
//                           {() => {
//                             const costPerRoll = safeNum(
//                               form.getFieldValue("edgebanding_cost_per_roll")
//                             );
//                             const lengthOfRoll = safeNum(
//                               form.getFieldValue("length_of_roll")
//                             );

//                             return `$${toFixed(costPerRoll / lengthOfRoll)}`;
//                           }}
//                         </Form.Item>

//                         <Form.Item
//                           name="waste_factor"
//                           label="Waste Factor % X"
//                           className="width-100 row"
//                           wrapperCol={{ span: 18 }}
//                           labelCol={{ span: 6 }}
//                         >
//                           <InputNumber {...inputNumberPercentProps} />
//                         </Form.Item>

//                         <Divider />

//                         <Form.Item
//                           shouldUpdate
//                           label="Edgebanding cost w/Waste"
//                           className="width-100 row"
//                           wrapperCol={{ span: 18 }}
//                           labelCol={{ span: 6 }}
//                         >
//                           {() => {
//                             const costPerRoll = safeNum(
//                               form.getFieldValue("edgebanding_cost_per_roll")
//                             );
//                             const lengthOfRoll = safeNum(
//                               form.getFieldValue("length_of_roll")
//                             );
//                             const wasteFactor = safeNum(
//                               form.getFieldValue("waste_factor")
//                             );
//                             const costPerFoot = costPerRoll / lengthOfRoll;

//                             return `$${toFixed(
//                               costPerFoot + (costPerFoot * wasteFactor) / 100
//                             )}`;
//                           }}
//                         </Form.Item>
//                       </>
//                     );
//                   }

//                   if (!isIn) return;

//                   return (
//                     <>
//                       <Title level={4}>In House</Title>

//                       <Form.Item
//                         help="X"
//                         name="in_house_material_cost"
//                         className="width-100 row"
//                         label="Material Cost per Sq. Ft."
//                         labelCol={{ span: 6 }}
//                         wrapperCol={{ span: 18 }}
//                       >
//                         <InputNumber {...inputNumberCostProps} />
//                       </Form.Item>

//                       <Form.Item
//                         name="waste_factor"
//                         className="width-100 row"
//                         label="Waste Factor %"
//                         labelCol={{ span: 6 }}
//                         wrapperCol={{ span: 18 }}
//                       >
//                         <InputNumber {...inputNumberPercentProps} />
//                       </Form.Item>

//                       <Divider />

//                       <Form.Item
//                         shouldUpdate
//                         className="width-100 row"
//                         label="Discounted Material Cost"
//                         labelCol={{ span: 6 }}
//                         wrapperCol={{ span: 18 }}
//                       >
//                         {() => {
//                           const sqFtCost = safeNum(
//                             form.getFieldValue("in_house_material_cost")
//                           );
//                           const wasteFactor =
//                             sqFtCost *
//                             (safeNum(form.getFieldValue("waste_factor")) / 100);

//                           return `$${toFixed(sqFtCost + wasteFactor)}`;
//                         }}
//                       </Form.Item>

//                       <Form.Item
//                         name="in_house_labor_cost"
//                         className="width-100 row"
//                         label="In House Labor Cost"
//                         labelCol={{ span: 6 }}
//                         wrapperCol={{ span: 18 }}
//                       >
//                         <InputNumber {...inputNumberCostProps} />
//                       </Form.Item>
//                     </>
//                   );
//                 }}
//               </Form.Item>

//               <Form.Item shouldUpdate>
//                 {() => {
//                   const source = form.getFieldValue("source")?.toLowerCase();
//                   const purpose = form.getFieldValue("purpose")?.toLowerCase();
//                   const isIn = source === "in";
//                   const isDrawerBox = purpose === "drawer box";

//                   if (!purpose) return null;

//                   if (!isIn && isDrawerBox) return <OutsourcedDrawerBox />;

//                   return null;
//                 }}
//               </Form.Item>

//               <Form.Item shouldUpdate>
//                 {() => {
//                   const source = form.getFieldValue("source")?.toLowerCase();
//                   const purpose = form.getFieldValue("purpose")?.toLowerCase();
//                   const isIn = source === "in";
//                   const isDrawerBox = purpose === "drawer box";

//                   if (!purpose) return null;

//                   if (!isIn && !isDrawerBox) {
//                     return (
//                       <>
//                         <Title level={4}>Out-Source</Title>

//                         <Form.Item
//                           name="out_material_cost_per_sq_feet"
//                           className="width-100 row"
//                           label="Material Cost per Sq. Ft."
//                           labelCol={{ span: 6 }}
//                           wrapperCol={{ span: 18 }}
//                         >
//                           <InputNumber {...inputNumberCostProps} />
//                         </Form.Item>

//                         <Form.Item
//                           name="supplier_discount"
//                           className="width-100 row"
//                           label="Supplier Discount % X"
//                           labelCol={{ span: 6 }}
//                           wrapperCol={{ span: 18 }}
//                         >
//                           <InputNumber
//                             min={0}
//                             max={100}
//                             {...inputNumberPercentProps}
//                           />
//                         </Form.Item>

//                         <Divider />

//                         <Form.Item
//                           shouldUpdate
//                           className="width-100 row"
//                           label="Discounted Material Cost"
//                           labelCol={{ span: 6 }}
//                           wrapperCol={{ span: 18 }}
//                         >
//                           {() => {
//                             const sqFtCost = safeNum(
//                               form.getFieldValue(
//                                 "out_material_cost_per_sq_feet"
//                               )
//                             );
//                             const supplierDiscount =
//                               sqFtCost *
//                               (safeNum(
//                                 form.getFieldValue("supplier_discount")
//                               ) /
//                                 100);

//                             return `$${toFixed(sqFtCost - supplierDiscount)}`;
//                           }}
//                         </Form.Item>
//                       </>
//                     );
//                   }

//                   return null;
//                 }}
//               </Form.Item>
//             </Col>

//             <Col span={12} className="bordered-row">
//               <Form.Item shouldUpdate>
//                 {() => {
//                   return (
//                     <Table
//                       title={() => (
//                         <Title level={4}>
//                           {capitalize(pluralize(material?.purpose ?? ""))} using
//                           this Material
//                         </Title>
//                       )}
//                       columns={doorModelTableColumns}
//                       dataSource={doors[0]}
//                       pagination={false}
//                       rowKey="id"
//                       size="small"
//                       bordered={false}
//                     />
//                   );
//                 }}
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//       </div>
//     </Col>
//   );
// }

// export default function Material() {
//   const params = useParams<{ id?: string }>();
//   const [material, setMaterial] = useState<{ name?: string }>({});

//   const getFieldsData = async () => {
//     try {
//       const material = await getOneMaterialSetup(params.id);

//       setMaterial(material);
//     } catch (error) {}
//   };

//   useEffect(() => {
//     getFieldsData();
//   }, []);

//   return (
//     <UILayout
//       ToolbarContent={
//         <PageHeader
//           allowAlter
//           label={material?.name}
//           parent={{ label: "Materials", path: "/materials" }}
//         />
//       }
//     >
//       <Row className="pagewrapper">
//         <Filters />

//         <MaterialForm material={material} setMaterial={setMaterial} />
//       </Row>
//     </UILayout>
//   );
// }
