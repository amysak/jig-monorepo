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
// import { useNavigate, useParams } from "@tanstack/react-location";
// import CreatableSelect from "react-select/creatable";
// import { sendNotificationRequest } from "../../../actions/notification";
// import {
//   createAccessoryClassification,
//   getAccessoryCategories,
//   getAccessoryClassification,
//   getDefaultAccessories,
//   getOneAccessorySetup,
//   getUnits,
//   updateAccessory,
//   uploadAccessoryImage,
// } from "../../../api/accessories";
// import UploadButton from "../../../components/atoms/upload-button";
// import UILayout from "../../../components/templates/uilayout";
// import useFilter from "../../../hooks/useFilter";
// import { store } from "../../../store";
// import {
//   inputNumberCostProps,
//   inputNumberPercentProps,
// } from "../../../utilities";
// import {
//   ACTIVE_INACTIVE_STATUSES_OPTIONS,
//   HARDWARE_CATEGORIES_OPTIONS,
// } from "../../../utilities/constants";
// import {
//   calcDiscountSalePrice,
//   capitalize,
//   getQueryString,
//   safeNum,
//   setTableRowClass,
//   shortId,
//   toFixed,
// } from "../../../utilities/utils";
// import { PageHeader } from "./components";
// import "./styles.scss";
// interface IllustationProps {
//   imageURL: any;
// }

// const { Title } = Typography;

// const input80PercentStyle = {
//   width: "80%",
// };

// function Illustation({ imageURL }: IllustationProps) {
//   const [loading, setLoading] = useState(false);
//   const [url, setURL] = useState("");
//   const params = useParams<{ id?: string }>();

//   useEffect(() => {
//     setURL(imageURL);
//   }, [imageURL]);

//   const onChange = async (event: { target: { files: any[] } }) => {
//     const data = new FormData();

//     const file = event.target.files[0];

//     data.append("file", file);

//     data.append("accessoryId", params.id);

//     try {
//       setLoading(true);

//       const result = await uploadAccessoryImage(data);

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
// interface IAccessory {
//   id?: string;
//   name?: string;
//   unit_of_measurement?:
//     | any
//     | {
//         image_url: string;
//       };
//   classification?:
//     | any
//     | {
//         name?: string;
//         id?: string;
//       };
//   image_url?: string;
// }

// export default function AccessoryHardware() {
//   const [form] = Form.useForm();
//   const [filterForm] = Form.useForm();
//   const params = useParams<{ id?: string }>();
//   const navigate = useNavigate();
//   const [accessories, setAccessories] = useState<[any[], number]>([[], 0]);

//   const [accessory, setAccessory] = useState<IAccessory>({});

//   const [categories, setCategories] = useState([]);
//   const [classifications, setClassifications] = useState([]);
//   const [, setLoading] = useState(false);
//   const [filters, setFilters] = useFilter("accessories-hardwares", {});
//   const [units, setUnits] = useState([]);

//   useEffect(() => form.resetFields(), [accessory]);
//   useEffect(() => filterForm.resetFields(), [accessories]);

//   const getAccessoriesData = async (queryFilters = filters) => {
//     try {
//       setLoading(true);

//       const query = getQueryString(queryFilters);
//       const accessories = await getDefaultAccessories(query);
//       const units = await getUnits();

//       setFilters(queryFilters);
//       setAccessories(accessories);
//       setUnits(units);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getClassifications = async (category = "") => {
//     try {
//       const classifications = await getAccessoryClassification(category);

//       setClassifications(classifications);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getAccessory = async () => {
//     try {
//       const accessory = await getOneAccessorySetup(params.id);

//       setAccessory(accessory);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const onValuesChange = debounce(
//     async (
//       value,
//       values: {
//         [x: number]: any;
//         unit_of_measurement?: any;
//         classification?: any;
//       }
//     ) => {
//       console.log("values changeed", value);
//       try {
//         updateAccessory(accessory.id, values);

//         store.dispatch(
//           sendNotificationRequest({
//             message: "Update successfully.",
//             type: "success",
//           })
//         );
//       } catch (error) {
//         store.dispatch(
//           sendNotificationRequest({
//             message: "Failed to update.",
//             type: "error",
//           })
//         );
//       }
//     },
//     1000
//   );

//   const getCategories = async () => {
//     try {
//       const categories = await getAccessoryCategories();

//       setCategories(categories);
//     } catch {}
//   };

//   const onCreateUnitOption = async (unit: any) => {
//     try {
//       await updateAccessory(accessory.id, { unit_of_measurement: unit });
//       setAccessory({ ...accessory, unit_of_measurement: unit });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const onUnitChange = (unit: { value: any }) => {
//     onCreateUnitOption(unit.value);
//   };

//   const onCreateClassificationOption = async (name) => {
//     try {
//       const classification = await createAccessoryClassification({ name });

//       setClassifications([classification, ...classifications]);

//       await updateAccessory(accessory.id, {
//         classification: classification.id,
//       });
//       setAccessory({ ...accessory, classification: classification });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const onClassificationChange = (classification) => {
//     console.log(classification);
//   };

//   const onFilterChange = async (value, values) => {
//     getAccessoriesData(values);
//   };

//   useEffect(() => {
//     getAccessoriesData();
//     getCategories();
//     getClassifications();
//   }, []);

//   useEffect(() => {
//     getAccessory();
//   }, [params]);

//   const columns = [
//     {
//       dataIndex: "name",
//       key: "name",

//       render(name) {
//         return name || "Missing name";
//       },
//     },
//   ];

//   return (
//     <UILayout
//       ToolbarContent={
//         <PageHeader
//           allowAlter
//           label={accessory?.name}
//           parent={{
//             path: "/accessories-hardwares",
//             label: "Hardwares/Accessories",
//           }}
//         />
//       }
//     >
//       <Row className="pagewrapper">
//         <Col span={6}>
//           <Form
//             layout="vertical"
//             form={filterForm}
//             onValuesChange={onFilterChange}
//             className="pagewrapper__leftside"
//             initialValues={filters}
//           >
//             <Title level={4}>Profile Options</Title>

//             <Form.Item label="Status" name="status">
//               <Select allowClear>
//                 {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((status) => (
//                   <Select.Option key={shortId()} value={status.value}>
//                     {status.label}
//                   </Select.Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item label="Category" name="category">
//               <Select allowClear>
//                 {categories.map((option) => (
//                   <Select.Option value={option.category} key={shortId()}>
//                     {capitalize(option.category)}
//                   </Select.Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item label="Classifiction" name="classification">
//               <Select allowClear>
//                 {classifications.map((option) => (
//                   <Select.Option value={option.name} key={shortId()}>
//                     {option.name}
//                   </Select.Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Divider />

//             <Form.Item>
//               <Table
//                 columns={columns}
//                 dataSource={accessories[0]}
//                 pagination={false}
//                 showHeader={false}
//                 rowKey="id"
//                 rowClassName={setTableRowClass(accessory.id)}
//                 style={{
//                   height: window.innerHeight - 400,
//                   overflow: "auto",
//                 }}
//                 size="small"
//                 onRow={(row) => {
//                   return {
//                     onClick: () =>
//                       navigate(
//                         `/cabinet-setup/accessories-hardwares/${row.id}`
//                       ),
//                   };
//                 }}
//               />
//             </Form.Item>
//           </Form>
//         </Col>

//         <Col span={18}>
//           <Form
//             onValuesChange={onValuesChange}
//             layout="vertical"
//             form={form}
//             initialValues={accessory}
//           >
//             <div className="pagewrapper__maincontent">
//               <Row>
//                 <Col span={12}>
//                   <Form.Item label="Accessory Name" name="name">
//                     <Input style={input80PercentStyle} />
//                   </Form.Item>
//                 </Col>

//                 <Col span={12}>
//                   <Form.Item label="Category" name="category">
//                     <Select style={input80PercentStyle}>
//                       {HARDWARE_CATEGORIES_OPTIONS.map((category) => (
//                         <Select.Option key={shortId()} value={category.value}>
//                           {category.label}
//                         </Select.Option>
//                       ))}
//                     </Select>
//                   </Form.Item>
//                 </Col>

//                 <Col span={12}>
//                   <Form.Item label="Classification">
//                     <CreatableSelect
//                       id="classification"
//                       options={classifications?.map((classification) => ({
//                         value: classification.id,

//                         label: classification.name,
//                       }))}
//                       value={{
//                         label: capitalize(accessory?.classification?.name),

//                         value: accessory?.classification?.id,
//                       }}
//                       isClearable
//                       onCreateOption={onCreateClassificationOption}
//                       onChange={onClassificationChange}
//                     />
//                   </Form.Item>
//                 </Col>

//                 <Col span={12}>
//                   <Form.Item label="Unit">
//                     <CreatableSelect
//                       id="unit"
//                       value={{
//                         label: capitalize(accessory?.unit_of_measurement),
//                         value: accessory?.unit_of_measurement,
//                       }}
//                       options={units?.map((unit) => ({
//                         value: unit.unit?.toLowerCase(),

//                         label: capitalize(unit.unit),
//                       }))}
//                       onCreateOption={onCreateUnitOption}
//                       onChange={onUnitChange}
//                     />
//                   </Form.Item>
//                 </Col>

//                 <Col span={12}>
//                   <Form.Item label="Description" name="description">
//                     <Input.TextArea
//                       rows={1}
//                       style={{
//                         ...input80PercentStyle,
//                         height: "200px",
//                       }}
//                     />
//                   </Form.Item>
//                 </Col>

//                 <Col span={12}>
//                   <Form.Item
//                     label="Internal Note (non-printable)"
//                     name="internal_note"
//                   >
//                     <Input.TextArea
//                       rows={1}
//                       style={{
//                         ...input80PercentStyle,
//                         height: "200px",
//                       }}
//                     />
//                   </Form.Item>
//                 </Col>

//                 <Col span={6}>
//                   <Form.Item
//                     label="Published Material Cost"
//                     name="published_material_cost"
//                   >
//                     <InputNumber
//                       style={input80PercentStyle}
//                       {...inputNumberCostProps}
//                     />
//                   </Form.Item>
//                 </Col>

//                 <Col span={6}>
//                   <Form.Item
//                     label="Supplier Discount %"
//                     name="supplier_discount"
//                   >
//                     <InputNumber
//                       addonBefore="X"
//                       style={input80PercentStyle}
//                       {...inputNumberPercentProps}
//                     />
//                   </Form.Item>
//                 </Col>

//                 <Col span={6}>
//                   <Form.Item shouldUpdate label="Discounted Material Cost">
//                     {() => {
//                       const materialCost = safeNum(
//                         form.getFieldValue("published_material_cost")
//                       );
//                       const supplierDiscount = safeNum(
//                         form.getFieldValue("supplier_discount")
//                       );
//                       const discountedMatCost = calcDiscountSalePrice(
//                         materialCost,
//                         supplierDiscount
//                       );

//                       return `$${toFixed(discountedMatCost)}`;
//                     }}
//                   </Form.Item>
//                 </Col>

//                 <Col span={6}>
//                   <Form.Item label="Shop Labor" name="shop_labor_cost">
//                     <InputNumber
//                       style={input80PercentStyle}
//                       {...inputNumberCostProps}
//                     />
//                   </Form.Item>
//                 </Col>

//                 <Col span={6}>
//                   <Form.Item
//                     label="Installation Labor"
//                     name="installation_labor_cost"
//                   >
//                     <InputNumber
//                       style={input80PercentStyle}
//                       {...inputNumberCostProps}
//                     />
//                   </Form.Item>
//                 </Col>

//                 <Col span={6}>
//                   <Form.Item label="Show on Reports" name="show_on_reports">
//                     <Radio.Group>
//                       <Radio value={true}>Yes</Radio>
//                       <Radio value={false}>No</Radio>
//                     </Radio.Group>
//                   </Form.Item>
//                 </Col>
//               </Row>

//               <Divider />

//               <Row>
//                 <Col span={12}>
//                   <Illustation imageURL={accessory?.image_url} />
//                 </Col>
//               </Row>
//             </div>
//           </Form>
//         </Col>
//       </Row>
//     </UILayout>
//   );
// }
