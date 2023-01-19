export {};
// import {
//   Form,
//   Input,
//   InputNumber,
//   message,
//   Row,
//   Select,
//   Table,
//   Tooltip,
// } from "antd";
// import debounce from "lodash-es";
// import merge from "lodash-es";
// import React, { useEffect, useState } from "react";
// import { Link } from "@tanstack/react-location";

// import { api } from "api/Api";
// import { getMaterialTypes } from "../../../api/material-types";
// import {
//   getSetupMaterials,
//   TGetSetupMaterialsData,
//   updateOneMaterialSetup,
// } from "../../../api/materials";
// import { getVendors } from "../../../api/vendors";
// import PaginateTableMetaData from "../../../components/molecules/paginate-table-header";
// import { tableSelectStyle } from "../../../components/molecules/roomtabs/utils";
// import UILayout from "../../../components/templates/uilayout";
// import useFilter from "../../../hooks/useFilter";
// import { inputNumberCostProps } from "../../../utilities";
// import {
//   ACTIVE_INACTIVE_STATUSES_OPTIONS,
//   MATERIAL_PURPOSES_OPTIONS,
// } from "../../../utilities/constants";
// import { capitalize, getQueryString, shortId } from "../../../utilities/utils";
// import { defaultPagination, tableProps } from "../utils";
// import { PageHeader } from "./components";

// interface MaterialFilterRowProps {
//   materialTypes: any[];
// }

// function MaterialFilterRow({ materialTypes }: MaterialFilterRowProps) {
//   const [vendors, setVendors] = useState([]);

//   const getData = async () => {
//     try {
//       const vendors = await getVendors();

//       setVendors(vendors[0]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <Row className="cabinets-filter-row">
//       <Form.Item name="purpose">
//         <Select style={{ minWidth: "200px" }} allowClear placeholder="Purpose">
//           {MATERIAL_PURPOSES_OPTIONS.map((option) => (
//             <Select.Option value={option.value} key={shortId()}>
//               {option.label}
//             </Select.Option>
//           ))}
//         </Select>
//       </Form.Item>

//       <Form.Item name="name">
//         <Input style={{ minWidth: "300px" }} placeholder="Name" />
//       </Form.Item>

//       <Form.Item name="vendor">
//         <Select style={{ minWidth: "200px" }} allowClear placeholder="Vendor">
//           {vendors.map((option) => (
//             <Select.Option key={shortId()} value={option.id}>
//               {option.name}
//             </Select.Option>
//           ))}
//         </Select>
//       </Form.Item>

//       <Form.Item name="type">
//         <Select style={{ minWidth: "200px" }} allowClear placeholder="Type">
//           {materialTypes.map((option) => (
//             <Select.Option key={shortId()} value={option.id}>
//               {option.name}
//             </Select.Option>
//           ))}
//         </Select>
//       </Form.Item>

//       <Form.Item name="status">
//         <Select style={{ minWidth: "200px" }} allowClear placeholder="Status">
//           {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((option) => (
//             <Select.Option key={shortId()} value={option.value}>
//               {option.label}
//             </Select.Option>
//           ))}
//         </Select>
//       </Form.Item>
//     </Row>
//   );
// }

// export default function MaterialList() {
//   const [filterForm] = Form.useForm();
//   const [tableForm] = Form.useForm();
//   const [types, setTypes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [materials, setMaterials] = useState<TGetSetupMaterialsData>([[], 0]);
//   const [filters, setFilters] = useFilter("materials-setup", {
//     pageSize: 20,
//     current: 1,
//   });

//   const getMaterials = async (queryFilters = filters) => {
//     try {
//       setLoading(true);

//       getTypes(queryFilters.purpose);
//       const query = getQueryString(queryFilters);
//       const materials = await getSetupMaterials(query);

//       setFilters(queryFilters);
//       setMaterials(materials);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onTableValuesChange = debounce(async (value) => {
//     try {
//       const [id, patch] = Object.entries(value)[0];

//       const material = materials[0].find((mat: { id: any }) => mat.id === id);

//       const payload = merge(material, patch);

//       await updateOneMaterialSetup(id, payload);
//     } catch (error) {
//       message.error("Failed to update!");
//     }
//   }, 1000);

//   const onPaginate = (config: { pageSize: number; current: number }) => {
//     const queryFilters = { ...filters, ...api.paginateObj(config) };

//     getMaterials(queryFilters);
//   };

//   const getTypes = async (purpose) => {
//     try {
//       if (!purpose) return;

//       const types = await getMaterialTypes(`?purpose=${purpose}`);

//       setTypes(types[0]);
//     } catch (error) {}
//   };

//   const onValuesChange = debounce(() => {
//     getMaterials({
//       ...defaultPagination,
//       ...filterForm.getFieldsValue(),
//     });

//     getTypes(filterForm.getFieldValue("purpose"));
//   }, 1000);

//   useEffect(() => {
//     getMaterials();
//   }, []);

//   const columns = [
//     {
//       title: "Material Name",
//       key: "name",
//       dataIndex: "name",

//       render(category, row: { id: any }) {
//         return (
//           <Link to={`/cabinet-setup/materials/${row.id}`}>{category}</Link>
//         );
//       },
//     },
//     {
//       title: "Purpose",
//       key: "purpose",
//       dataIndex: "purpose",

//       render(category: string) {
//         return capitalize(category, true);
//       },
//     },
//     {
//       title: "Vendor",
//       key: "vendor",
//       dataIndex: "vendor",

//       render(vendor: { name: any }) {
//         return vendor?.name ?? "";
//       },
//     },
//     {
//       title: "Type",
//       key: "type",
//       dataIndex: "type",

//       render(type: { name: any }) {
//         return type?.name ?? "";
//       },
//     },
//     {
//       title: "Description",
//       key: "description",
//       dataIndex: "description",
//     },
//     {
//       title: "Thickness",
//       key: "thickness",
//       dataIndex: "thickness",
//     },
//     {
//       title: "Outsourced Material $",
//       key: "outsourced_cost",
//       dataIndex: "outsourced_cost",
//       width: 400,

//       render(
//         value,
//         row: {
//           purpose: string;
//           cost_per_drawer_box: { [x: string]: any };
//           id: any;
//         }
//       ) {
//         const isDrawerBox = row?.purpose?.toLowerCase() === "drawer box";

//         if (isDrawerBox) {
//           const keys = {
//             "2_3": { value: "2_3", label: '2" - 3"' },
//             "3_4": { value: "3_4", label: '3.5" - 4"' },
//             "4_6": { value: "4_6", label: '4.5" - 6"' },
//             "6_8": { value: "6_8", label: '6.5" - 8"' },
//             "8_10": { value: "8_10", label: '8.5" - 10"' },
//             "10_12": { value: "10_12", label: '10.5" - 12"' },
//           };

//           const drawerBoxCosts = row.cost_per_drawer_box ?? {};

//           return (
//             <Row>
//               {Object.keys(keys).map((key) => {
//                 return (
//                   <Tooltip key={key} title={keys[key]?.label}>
//                     <Form.Item
//                       // @ts-expect-error TS(2322): Type '{ children: Element; placeholder: string; in... Remove this comment to see the full error message
//                       placeholder={`${key}`}
//                       initialValue={drawerBoxCosts[key]}
//                       key={key}
//                       name={[`${row.id}`, "cost_per_drawer_box", key]}
//                     >
//                       {/*@ts-ignore  */}
//                       <InputNumber
//                         className="input-60"
//                         //@ts-ignore
//                         value={`${row.cost_per_drawer_box?.[key] ?? 0}`}
//                         {...inputNumberCostProps}
//                       />
//                     </Form.Item>
//                   </Tooltip>
//                 );
//               })}
//             </Row>
//           );
//         }

//         return (
//           <Form.Item
//             initialValue={value}
//             name={[`${row.id}`, "outsourced_cost"]}
//           >
//             <InputNumber {...inputNumberCostProps} />
//           </Form.Item>
//         );
//       },
//     },
//     {
//       title: "Inhouse Material $",
//       key: "in_house_material_cost",
//       dataIndex: "in_house_material_cost",

//       render(value, row: { id: any }) {
//         return (
//           <Form.Item
//             initialValue={value}
//             name={[`${row.id}`, "in_house_material_cost"]}
//           >
//             <InputNumber {...inputNumberCostProps} />
//           </Form.Item>
//         );
//       },
//     },
//     {
//       title: "Inhouse Labor $",
//       key: "in_house_labor_cost",
//       dataIndex: "in_house_labor_cost",

//       render(value, row: { id: any }) {
//         return (
//           <Form.Item
//             initialValue={value}
//             name={[`${row.id}`, "in_house_labor_cost"]}
//           >
//             <InputNumber {...inputNumberCostProps} />
//           </Form.Item>
//         );
//       },
//     },
//     {
//       title: "Source",
//       key: "source",
//       dataIndex: "source",

//       render(currentSource: string, row: { id: any }) {
//         return (
//           <Form.Item
//             initialValue={currentSource?.toLowerCase()}
//             name={[`${row.id}`, "source"]}
//           >
//             <Select style={tableSelectStyle}>
//               {["in", "out"].map((source) => (
//                 <Select.Option key={shortId()} value={source}>
//                   {capitalize(source)}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//         );
//       },
//     },
//     {
//       title: "Status",
//       key: "status",
//       dataIndex: "status",

//       render(currentStatus: string, row: { id: any }) {
//         return (
//           <Form.Item
//             initialValue={currentStatus?.toLowerCase()}
//             name={[`${row.id}`, "status"]}
//           >
//             <Select style={tableSelectStyle}>
//               {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((status) => (
//                 <Select.Option key={shortId()} value={status.value}>
//                   {status.label}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//         );
//       },
//     },
//   ];

//   return (
//     <UILayout ToolbarContent={<PageHeader label="Materials" />}>
//       <Form
//         initialValues={filters}
//         form={filterForm}
//         onValuesChange={onValuesChange}
//         layout="inline"
//       >
//         <MaterialFilterRow materialTypes={types} />
//       </Form>

//       <Form
//         initialValues={filters}
//         form={tableForm}
//         onValuesChange={onTableValuesChange}
//       >
//         {/* @ts-ignore */}
//         <Table
//           columns={columns}
//           dataSource={materials[0]}
//           loading={loading}
//           {...tableProps}
//           title={() => (
//             <PaginateTableMetaData
//               data={materials}
//               count={100}
//               filters={filters}
//             />
//           )}
//           onChange={onPaginate}
//           pagination={{
//             total: materials[1],
//             pageSize: filters.pageSize,
//             size: "small",
//             showSizeChanger: false,
//             current: filters.current,
//           }}
//           className="pagewrapper__maincontent nomargin"
//         />
//       </Form>
//     </UILayout>
//   );
// }
