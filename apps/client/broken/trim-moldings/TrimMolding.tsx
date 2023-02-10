export {};
// import {
//   Col,
//   Divider,
//   Form,
//   Input,
//   InputNumber,
//   message,
//   Radio,
//   Row,
//   Select,
//   Table,
//   Typography,
// } from "antd";
// import debounce from "lodash-es";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate, useParams } from "@tanstack/react-router";
// import CreatableSelect from "react-select/creatable";
// import UILayout from "../../../components/templates/uilayout";

// import {
//   getOneTrimMolding,
//   getTrimMoldingSublassifications,
//   getTrims,
//   TGetTrimsData,
//   updateTrimMolding,
//   uploadTrimImage,
// } from "../../../api/trims";
// import UploadButton from "../../../components/atoms/upload-button";
// import useFilter from "../../../hooks/useFilter";
// import {
//   inputNumberCostProps,
//   inputNumberPercentProps,
// } from "../../../utilities";
// import {
//   ACTIVE_INACTIVE_STATUSES_OPTIONS,
//   TRIM_MOLDING_CLASSIFICATIONS_OPTIONS,
// } from "../../../utilities/constants";
// import {
//   calcDiscountSalePrice,
//   capitalize,
//   getQueryString,
//   safeNum,
//   setTableRowClass,
//   shortId,
//   sleep,
//   toFixed,
// } from "../../../utilities/utils";
// import { PageHeader } from "./components";
// interface BasicTrimFormProps {
//   trim: Record<string, unknown>;
//   trims: (number | any[])[];
//   classifications: { label: any; value: any }[];
//   subclassifications: any[];
//   onCreateSubClassification: (subclassification: any) => Promise<void>;
//   onUpdate: (value: any, values: any) => Promise<void>;
// }

// interface MeasurementTrimFormProps {
//   trim: Record<string, unknown>;
//   trims: (number | any[])[];
//   onUpdate: (value: any, values: any) => Promise<void>;
// }

// interface FilterProps {
//   trims: (number | any[])[];
//   classifications: { label: any; value: any }[];
//   subclassifications?: any[];
//   onQuery: (queryFilters?: any) => Promise<void>;
//   filters: any;
// }

// interface TrimFormProps {
//   trim: Record<string, unknown>;
//   trims: (number | any[])[];
//   classifications: { label: any; value: any }[];
//   subclassifications: any[];
//   onCreateSubClassification: (subclassification: any) => Promise<void>;
//   onUpdate: (value: any, values: any) => Promise<void>;
// }

// const { Title } = Typography;
// const input80PercentStyle = {
//   width: "80%",
// };
// const formLayout = {
//   wrapperCol: { span: 14 },
//   labelCol: { span: 10 },
// };

// interface RighTextAddonProps {
//   label: string;
// }

// const RighTextAddon = ({ label }: RighTextAddonProps) => <span>{label}</span>;

// function Illustation() {
//   const [loading, setLoading] = useState(false);

//   // @ts-expect-error TS(2339): Property 'trim' does not exist on type 'DefaultRoo... Remove this comment to see the full error message
//   const trim = useSelector((state) => state.trim);
//   const [url, setURL] = useState("");
//   const params = useParams<{ id?: string }>();

//   useEffect(() => {
//     setURL(trim.image_url);
//   }, [trim]);

//   const onChange = async (event: { target: { files: any[] } }) => {
//     const data = new FormData();

//     const file = event.target.files[0];

//     data.append("file", file);

//     data.append("trimId", params.id);

//     try {
//       setLoading(true);

//       const result = await uploadTrimImage(data);

//       setURL(result.url);

//       message.success(`${file.name} file uploaded successfully.`);
//     } catch (error) {
//       message.error(`${file.name} file upload failed.`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="profile-form" style={{ paddingTop: "24px" }}>
//       <UploadButton
//         onChange={onChange}
//         loading={loading}
//         forId="profileImage"
//       />

//       <div className="profile-image-wrapper">
//         <img src={url} />
//       </div>
//     </div>
//   );
// }

// function BasicTrimForm({
//   trim,

//   onUpdate,

//   onCreateSubClassification,

//   classifications,

//   subclassifications,
// }: BasicTrimFormProps) {
//   const [form] = Form.useForm();

//   useEffect(() => {
//     form.resetFields();
//   }, [trim]);

//   const onValuesChange = debounce(onUpdate, 1000);

//   return (
//     <Form
//       form={form}
//       onValuesChange={onValuesChange}
//       initialValues={trim}
//       layout="vertical"
//     >
//       <Row>
//         <Col span={12}>
//           <Form.Item label="Trim Name" name="name">
//             <Input style={input80PercentStyle} />
//           </Form.Item>
//         </Col>

//         <Col span={12}>
//           <Form.Item label="Classification" name="classification">
//             <Select style={input80PercentStyle}>
//               {classifications?.map((classification) => (
//                 <Select.Option
//                   key={shortId()}
//                   value={capitalize(classification.value, true)}
//                 >
//                   {classification.label}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Col>

//         <Col span={12}>
//           <Form.Item label="Subclassification">
//             <CreatableSelect
//               id="subclassification"
//               value={{
//                 value: trim?.subclassification,
//                 label: trim?.subclassification,
//               }}
//               onCreateOption={onCreateSubClassification}
//               options={subclassifications?.map(({ subclassification }) => ({
//                 value: subclassification,
//                 label: subclassification,
//               }))}
//               onChange={(subclass) =>
//                 onUpdate(null, {
//                   subclassification: subclass!.value,
//                 })
//               }
//             />
//           </Form.Item>
//         </Col>

//         <Col span={12}>
//           <Form.Item label="Unit of Measure" name="unit_of_measure">
//             <Select style={input80PercentStyle}>
//               {["Each", "Per Linear Foot"].map((unit) => (
//                 <Select.Option value={unit} key={shortId()}>
//                   {unit}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Col>

//         <Col span={12}>
//           <Form.Item label="Description" name="description">
//             <Input.TextArea style={input80PercentStyle} />
//           </Form.Item>
//         </Col>

//         <Col span={12}>
//           <Form.Item label="Internal Note (non-printable)" name="internal_note">
//             <Input.TextArea rows={2} style={input80PercentStyle} />
//           </Form.Item>
//         </Col>

//         <Col span={6}>
//           <Form.Item label="Square Feet" name="square_feet">
//             <InputNumber
//               style={input80PercentStyle}
//               addonAfter={<RighTextAddon label="per linear foot" />}
//             />
//           </Form.Item>
//         </Col>

//         <Col offset={6} span={6}>
//           <Form.Item label="Standard Length" name="standard_length">
//             <InputNumber
//               style={input80PercentStyle}
//               addonAfter={<RighTextAddon label="feet" />}
//             />
//           </Form.Item>
//         </Col>
//       </Row>
//     </Form>
//   );
// }

// function MeasurementTrimForm({ onUpdate, trim }: MeasurementTrimFormProps) {
//   const [form] = Form.useForm();

//   useEffect(() => {
//     form.resetFields();
//   }, [trim]);

//   const onValuesChange = debounce(onUpdate, 1000);

//   return (
//     <Form
//       form={form}
//       onValuesChange={onValuesChange}
//       initialValues={trim}
//       {...formLayout}
//     >
//       <Title level={4}>Materials Cost per Sq. Ft.</Title>

//       <Form.Item label="Material Cost" name="material_cost">
//         {/* @ts-expect-error TS(2322): Type '{ style: { width: string; }; min: number; st... Remove this comment to see the full error message */}
//         <InputNumber {...inputNumberCostProps} style={input80PercentStyle} />
//       </Form.Item>

//       <Form.Item label="Supplier Discount" name="supplier_discount">
//         {/* @ts-expect-error TS(2322): Type '{ style: { width: string; }; min: number; ma... Remove this comment to see the full error message */}
//         <InputNumber {...inputNumberPercentProps} style={input80PercentStyle} />
//       </Form.Item>

//       <Divider className="x5" />

//       <Form.Item shouldUpdate label="Discounted Material Cost">
//         {() => {
//           const materialCost = safeNum(form.getFieldValue("material_cost"));
//           const suppliersDiscount = safeNum(
//             form.getFieldValue("supplier_discount")
//           );
//           const discountedMatCost = calcDiscountSalePrice(
//             materialCost,
//             suppliersDiscount
//           );

//           return `$${toFixed(discountedMatCost)}`;
//         }}
//       </Form.Item>

//       <Form.Item label="Waste Factor % X" name="waster_factor">
//         {/* @ts-expect-error TS(2322): Type '{ style: { width: string; }; min: number; ma... Remove this comment to see the full error message */}
//         <InputNumber
//           addonBefore="+"
//           {...inputNumberPercentProps}
//           style={input80PercentStyle}
//         />
//       </Form.Item>

//       <Divider className="x5" />

//       <Form.Item shouldUpdate label="Material Cost with Waste Factor">
//         {() => {
//           const materialCost = safeNum(form.getFieldValue("material_cost"));
//           const suppliersDiscount = safeNum(
//             form.getFieldValue("supplier_discount")
//           );
//           const wasteFactor = safeNum(form.getFieldValue("waster_factor"));
//           const discountedMatCost = calcDiscountSalePrice(
//             materialCost,
//             suppliersDiscount
//           );

//           return `$${toFixed(
//             discountedMatCost + (discountedMatCost * wasteFactor) / 100
//           )}`;
//         }}
//       </Form.Item>

//       <br />

//       <Title level={4}>Labor Cost per Part</Title>

//       <Form.Item label="Shop Labor Cost" name="shop_labor_cost">
//         {/* @ts-expect-error TS(2322): Type '{ style: { width: string; }; min: number; st... Remove this comment to see the full error message */}
//         <InputNumber {...inputNumberCostProps} style={input80PercentStyle} />
//       </Form.Item>

//       <Form.Item label="Installation Labor Cost" name="installation_labor_cost">
//         {/* @ts-expect-error TS(2322): Type '{ style: { width: string; }; min: number; st... Remove this comment to see the full error message */}
//         <InputNumber {...inputNumberCostProps} style={input80PercentStyle} />
//       </Form.Item>

//       <Form.Item label="Trim Finish Type" name="trim_finish_type">
//         <Radio.Group>
//           <Radio value="complex">Complex</Radio>
//           <Radio value="simple">Simple</Radio>
//           <Radio value="none">None</Radio>
//         </Radio.Group>
//       </Form.Item>

//       <Form.Item label="# of Finished Slides" name="number_of_finished_sides">
//         <Select style={{ width: "100px" }}>
//           {[0, 1, 2].map((option) => (
//             <Select.Option key={shortId()} value={option}>
//               {option}
//             </Select.Option>
//           ))}
//         </Select>
//       </Form.Item>

//       <Form.Item label="Show on Reports" name="show_on_reports">
//         <Radio.Group>
//           <Radio value={true}>Yes</Radio>
//           <Radio value={false}>No</Radio>
//         </Radio.Group>
//       </Form.Item>
//     </Form>
//   );
// }

// function Filter({
//   filters,

//   onQuery,

//   trims,

//   classifications,

//   subclassifications,
// }: FilterProps) {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const params = useParams<{ id?: string }>();

//   const scrollToTrimMolding = () => {
//     const finRow = document.querySelector(`.selected-row`);

//     if (finRow) finRow.scrollIntoView();
//   };

//   useEffect(() => {
//     sleep(1000).then(scrollToTrimMolding);
//   }, []);

//   useEffect(() => {
//     form.resetFields();
//   }, [filters]);

//   const columns = [
//     {
//       dataIndex: "name",
//       key: "name",
//     },
//   ];

//   const onValuesChange = (
//     value: { classification: any },
//     filters: { subclassification: any }
//   ) => {
//     if (value.classification) {
//       filters.subclassification = undefined;
//     }

//     onQuery(filters);
//   };

//   return (
//     <Col span={6}>
//       <Form
//         form={form}
//         initialValues={filters}
//         onValuesChange={onValuesChange}
//         layout="vertical"
//         className="pagewrapper__leftside"
//       >
//         <Title level={4}>Trim and Molding Options</Title>

//         <Form.Item label="Status" name="status">
//           <Select allowClear>
//             {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((status) => (
//               <Select.Option key={shortId()} value={status.value}>
//                 {status.label}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item label="Classification" name="classification">
//           <Select allowClear>
//             {classifications?.map((classification) => (
//               <Select.Option value={classification.value} key={shortId()}>
//                 {classification.label}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item label="Subclassification" name="subclassification">
//           <Select allowClear>
//             {subclassifications?.map(
//               (subclassification: { subclassification: any }) => (
//                 <Select.Option
//                   value={subclassification.subclassification}
//                   key={shortId()}
//                 >
//                   {subclassification.subclassification}
//                 </Select.Option>
//               )
//             )}
//           </Select>
//         </Form.Item>

//         <Form.Item>
//           <Table
//             columns={columns}
//             // @ts-expect-error TS(2322): Type 'number | any[]' is not assignable to type 'r... Remove this comment to see the full error message
//             dataSource={trims?.[0]}
//             pagination={false}
//             showHeader={false}
//             rowKey="id"
//             style={{
//               height: window.innerHeight - 100,
//               overflow: "auto",
//             }}
//             size="small"
//             rowClassName={setTableRowClass(params.id)}
//             onRow={(row) => {
//               return {
//                 onClick: () =>
//                   navigate(`/cabinet-setup/trim-moldings/${row.id}`),
//               };
//             }}
//           />
//         </Form.Item>
//       </Form>
//     </Col>
//   );
// }

// function TrimForm({
//   onUpdate,

//   onCreateSubClassification,

//   trim,

//   trims,

//   classifications,

//   subclassifications,
// }: TrimFormProps) {
//   return (
//     <Col span={18}>
//       <div className="pagewrapper__maincontent">
//         <BasicTrimForm
//           trim={trim}
//           trims={trims}
//           classifications={classifications}
//           subclassifications={subclassifications}
//           onCreateSubClassification={onCreateSubClassification}
//           onUpdate={onUpdate}
//         />
//         <Divider />

//         <Row>
//           <Col span={12}>
//             <MeasurementTrimForm
//               trim={trim}
//               trims={trims}
//               onUpdate={onUpdate}
//             />
//           </Col>

//           <Col span={12}>
//             <div className="padded-content-left">
//               <Illustation />
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </Col>
//   );
// }

// export default function TrimMolding() {
//   const params = useParams<{ id?: string }>();
//   const [filters, setFilters] = useFilter("trim-moldings", {});
//   const [trim, setTrim] = useState({});
//   const [trims, setTrims] = useState<TGetTrimsData>([[], 0]);
//   const [classifications] = useState(TRIM_MOLDING_CLASSIFICATIONS_OPTIONS);
//   const [filterSubclassifications, setFilterSubClassifications] = useState();
//   const [subclassifications, setSubClassifications] = useState([]);

//   const getSubclassifications = async (queryFilters = {}) => {
//     try {
//       // @ts-expect-error TS(2339): Property 'classification' does not exist on type '... Remove this comment to see the full error message
//       if (!queryFilters.classification) {
//         return [];
//       }

//       const query = getQueryString(queryFilters);
//       const subclassifications = await getTrimMoldingSublassifications(query);

//       return subclassifications;
//     } catch (error) {
//       console.log(error);

//       return [];
//     }
//   };

//   const getFilterSubClassifications = async (
//     filters: Record<string, unknown> | undefined
//   ) => {
//     setFilterSubClassifications(await getSubclassifications(filters));
//   };

//   const getFormSubClassifications = async (filters: {
//     classification?: any;
//   }) => {
//     setSubClassifications(await getSubclassifications(filters));
//   };

//   const getTrimsWithFilters = async (queryFilters = filters) => {
//     try {
//       const allFilters = !queryFilters.classification ? {} : queryFilters;
//       const query = getQueryString(allFilters);
//       const trims = await getTrims(query);

//       setTrims(trims);
//       setFilters(allFilters);

//       await getFilterSubClassifications(allFilters);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handlePageData = async () => {
//     try {
//       const trim = await getOneTrimMolding(params.id);

//       setTrim(trim);

//       getFormSubClassifications({ classification: trim.classification });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const onCreateSubClassification = async (subclassification) => {
//     try {
//       await updateTrimMolding(params.id, { subclassification });

//       const updated = [{ subclassification }, ...subclassifications];

//       setSubClassifications(updated);
//       setTrim({ ...trim, subclassification });

//       await getFilterSubClassifications(filters);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const onUpdate = async (value: { classification?: any }, values) => {
//     try {
//       // @ts-expect-error TS(2339): Property 'id' does not exist on type '{}'.
//       await updateTrimMolding(trim.id, values);

//       if (Object.keys(value || {})[0] === "classification") {
//         getFormSubClassifications(value);
//       }

//       setTrim({ ...trim, ...values });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     handlePageData();
//     getTrimsWithFilters();
//   }, []);

//   return (
//     <UILayout
//       ToolbarContent={
//         <PageHeader
//           allowAlter
//           // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
//           label={trim?.name}
//           parent={{ label: "Trims/Moldings", path: "/trim-moldings" }}
//         />
//       }
//     >
//       <Row className="pagewrapper">
//         <Filter
//           trims={trims}
//           classifications={classifications}
//           subclassifications={filterSubclassifications}
//           onQuery={getTrimsWithFilters}
//           filters={filters}
//         />

//         <TrimForm
//           trim={trim}
//           trims={trims}
//           classifications={classifications}
//           subclassifications={subclassifications}
//           onCreateSubClassification={onCreateSubClassification}
//           onUpdate={onUpdate}
//         />
//       </Row>
//     </UILayout>
//   );
// }
