export {};
// import { Form, Input, Row, Select, Table } from "antd";
// import React, { useEffect, useState } from "react";
// import { Link } from "@tanstack/react-router";

// import { api } from "api/Api";
// import {
//   getDefaultLaborRates,
//   getLaborRateTypes,
//   TGetDefaultLaborRatesData,
// } from "../../../api/labor-rates";
// import PaginateTableMetaData from "../../../components/molecules/paginate-table-header";
// import UILayout from "../../../components/templates/uilayout";
// import useFilter from "../../../hooks/useFilter";
// import {
//   LABOR_RATE_CATEGORIES_OPTIONS,
//   LABOR_TYPES_OPTIONS,
// } from "../../../utilities/constants";
// import { capitalize, getQueryString, shortId } from "../../../utilities/utils";
// import { defaultPagination, tableProps } from "../utils";
// import { PageHeader } from "./components";

// function LaborRatesRow() {
//   const [, setLaborRateTypes] = useState([]);

//   const getData = async () => {
//     try {
//       const laborRateTypes = await getLaborRateTypes();

//       setLaborRateTypes(laborRateTypes);
//     } catch {}
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <Row className="cabinets-filter-row">
//       <Form.Item name="category">
//         <Select style={{ minWidth: "200px" }} allowClear placeholder="Category">
//           {LABOR_RATE_CATEGORIES_OPTIONS.map((option) => (
//             <Select.Option value={option.value} key={shortId()}>
//               {option.label}
//             </Select.Option>
//           ))}
//         </Select>
//       </Form.Item>

//       <Form.Item name="type">
//         <Select style={{ minWidth: "200px" }} allowClear placeholder="Type">
//           {LABOR_TYPES_OPTIONS.map((option) => (
//             <Select.Option key={shortId()} value={option.value}>
//               {option.label}
//             </Select.Option>
//           ))}
//         </Select>
//       </Form.Item>

//       <Form.Item name="name">
//         <Input style={{ minWidth: "300px" }} placeholder="Name" />
//       </Form.Item>
//     </Row>
//   );
// }

// export default function LaborRatesList() {
//   const [form] = Form.useForm();
//   const [laborRates, setLaborRates] = useState<TGetDefaultLaborRatesData>([
//     [],
//     0,
//   ]);
//   const [loading, setLoading] = useState(false);
//   const [filters, setFilters] = useFilter("laborrates", {
//     pageSize: 20,
//     current: 1,
//   });

//   const getLaborRates = async (queryFilters = filters) => {
//     try {
//       setLoading(true);

//       const query = getQueryString(queryFilters);
//       const laborRates = await getDefaultLaborRates(query);

//       setFilters(queryFilters);
//       setLaborRates(laborRates);
//     } catch {
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onPaginate = (config: { pageSize: number; current: number }) => {
//     const queryFilters = { ...filters, ...api.paginateObj(config) };

//     getLaborRates(queryFilters);
//   };

//   const onValuesChange = () => {
//     getLaborRates({
//       ...defaultPagination,
//       ...form.getFieldsValue(),
//     });
//   };

//   useEffect(() => {
//     getLaborRates();
//   }, []);

//   const columns = [
//     {
//       title: "Name",
//       key: "name",
//       dataIndex: "name",

//       render(name: string, row: { id: any }) {
//         return (
//           <Link to={`/cabinet-setup/labor-rates/${row.id}`}>
//             {capitalize(name)}
//           </Link>
//         );
//       },
//     },
//     {
//       title: "Category",
//       key: "category",
//       dataIndex: "category",

//       render(category: string) {
//         return capitalize(category);
//       },
//     },
//     {
//       title: "Type",
//       key: "type",
//       dataIndex: "type",

//       render(type: string) {
//         return capitalize(type);
//       },
//     },
//     {
//       title: "Description",
//       key: "internal_note",
//       dataIndex: "internal_note",
//     },
//     {
//       title: "Amount",
//       key: "amount",
//       dataIndex: "amount",

//       render(amount) {
//         return amount ? `$${amount}` : "";
//       },
//     },
//     {
//       title: "Unit of Measure",
//       key: "unit_of_measure",
//       dataIndex: "unit_of_measure",

//       render(unit_of_measure: string) {
//         return capitalize(unit_of_measure);
//       },
//     },
//   ];

//   return (
//     <UILayout ToolbarContent={<PageHeader label="Labor Rates" />}>
//       <Form
//         form={form}
//         initialValues={filters}
//         onValuesChange={onValuesChange}
//         layout="inline"
//       >
//         {/* @ts-expect-error TS(2322): Type '{ onFilter: (queryFilters?: any) => Promise<... Remove this comment to see the full error message */}
//         <LaborRatesRow onFilter={getLaborRates} />
//       </Form>
//       {/* @ts-ignore */}
//       <Table
//         loading={loading}
//         columns={columns}
//         dataSource={laborRates[0]}
//         {...tableProps}
//         title={() => (
//           <PaginateTableMetaData
//             data={laborRates}
//             count={100}
//             filters={filters}
//           />
//         )}
//         onChange={onPaginate}
//         pagination={{
//           total: laborRates[1],
//           pageSize: filters.pageSize,
//           size: "small",
//           showSizeChanger: false,
//           current: filters.current,
//         }}
//         className="pagewrapper__maincontent nomargin"
//       />
//     </UILayout>
//   );
// }
