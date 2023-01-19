export {};
// import { Form, Input, message, Row, Select, Table } from "antd";
// import React, { useEffect, useState } from "react";
// import { Link } from "@tanstack/react-location";

// import { api } from "api/Api";
// import {
//   getTrimMoldingSublassifications,
//   getTrims,
//   TGetTrimsData,
//   updateTrimMolding,
// } from "../../../api/trims";
// import PaginateTableMetaData from "../../../components/molecules/paginate-table-header";
// import { tableSelectStyle } from "../../../components/molecules/roomtabs/utils";
// import UILayout from "../../../components/templates/uilayout";
// import useFilter from "../../../hooks/useFilter";
// import {
//   ACTIVE_INACTIVE_STATUSES_OPTIONS,
//   TRIM_MOLDING_CLASSIFICATIONS_OPTIONS,
// } from "../../../utilities/constants";
// import { capitalize, getQueryString, shortId } from "../../../utilities/utils";
// import { defaultPagination, tableProps } from "../utils";
// import { PageHeader } from "./components";

// interface TrimMoldingFilterRowProps {
//   subclassifications: any[];
// }

// function TrimMoldingFilterRow({
//   subclassifications,
// }: TrimMoldingFilterRowProps) {
//   return (
//     <Row className="cabinets-filter-row">
//       <Form.Item name="classification">
//         <Select
//           style={{ minWidth: "200px" }}
//           allowClear
//           placeholder="Classification"
//         >
//           {TRIM_MOLDING_CLASSIFICATIONS_OPTIONS.map((option) => (
//             <Select.Option value={option.value} key={shortId()}>
//               {option.label}
//             </Select.Option>
//           ))}
//         </Select>
//       </Form.Item>

//       <Form.Item shouldUpdate>
//         {(form) => {
//           const classification = form.getFieldValue("classification");
//           const placeholder =
//             !classification && !subclassifications?.length
//               ? "Select a Classification first"
//               : "Subclassification";

//           return (
//             <Form.Item name="subclassification">
//               <Select
//                 style={{ minWidth: "200px" }}
//                 allowClear
//                 placeholder={placeholder}
//               >
//                 {subclassifications.map((option) => (
//                   <Select.Option
//                     key={shortId()}
//                     value={option.subclassification}
//                   >
//                     {capitalize(option.subclassification)}
//                   </Select.Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           );
//         }}
//       </Form.Item>

//       <Form.Item name="name">
//         <Input style={{ minWidth: "300px" }} placeholder="Name" />
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

// export default function TrimMoldingList() {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [subclassifications, setSubcassifications] = useState([]);
//   const [trims, setTrims] = useState<TGetTrimsData>([[], 0]);
//   const [filters, setFilters] = useFilter("trim-moldings", {
//     pageSize: 20,
//     current: 1,
//   });

//   const getSubclassification = async (filters: { classification?: any }) => {
//     try {
//       let subclassifications = [];

//       if (filters.classification) {
//         const query = getQueryString(filters);

//         subclassifications = await getTrimMoldingSublassifications(query);
//       } else {
//         setFilters({ ...filters, subclassification: null });
//         form.resetFields();
//       }

//       setSubcassifications(subclassifications);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getTrimsData = async (queryFilters = filters) => {
//     try {
//       setLoading(true);

//       const query = getQueryString(queryFilters);
//       const trims = await getTrims(query);

//       setFilters(queryFilters);
//       setTrims(trims);

//       getSubclassification(queryFilters);
//     } catch (error) {
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getTrimsData();
//   }, []);

//   const onRowChange = async (value: string, row: { id: any }, key: string) => {
//     try {
//       setLoading(true);
//       const payload = { [key]: value };

//       await updateTrimMolding(row.id, payload);

//       const updatedTrims = trims[0].map((trim: { id: any }) => {
//         if (trim.id === row.id) {
//           return { ...trim, ...payload };
//         }

//         return trim;
//       });

//       setTrims([updatedTrims, trims[1]] as TGetTrimsData);
//       message.success("Status updated!");
//     } catch (error) {
//       message.error("Failed to update status!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onPaginate = (config: { pageSize: number; current: number }) => {
//     const queryFilters = { ...filters, ...api.paginateObj(config) };

//     getTrimsData(queryFilters);
//   };

//   const onValuesChange = () => {
//     getTrimsData({
//       ...defaultPagination,
//       ...form.getFieldsValue(),
//     });
//   };

//   const columns = [
//     {
//       title: "Name",
//       key: "name",
//       dataIndex: "name",

//       render(name, row: { id: any }) {
//         return (
//           <Link to={`/cabinet-setup/trim-moldings/${row.id}`}>{name}</Link>
//         );
//       },
//     },
//     {
//       title: "Classification",
//       key: "classification",
//       dataIndex: "classification",
//     },
//     {
//       title: "Subclassification",
//       key: "subclassification",
//       dataIndex: "subclassification",

//       render(subclassification: string) {
//         return capitalize(subclassification);
//       },
//     },
//     {
//       title: "Description",
//       key: "description",
//       dataIndex: "description",
//     },
//     {
//       title: "Status",
//       key: "status",
//       dataIndex: "status",

//       render(currentStatus: string, row) {
//         return (
//           <Select
//             onChange={(value) => onRowChange(value, row, "status")}
//             value={currentStatus?.toLowerCase()}
//             style={tableSelectStyle}
//           >
//             {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((status) => (
//               <Select.Option key={shortId()} value={status.value}>
//                 {status.label}
//               </Select.Option>
//             ))}
//           </Select>
//         );
//       },
//     },
//   ];

//   return (
//     <UILayout ToolbarContent={<PageHeader label="Trims/Moldings" />}>
//       <Form
//         initialValues={filters}
//         form={form}
//         onValuesChange={onValuesChange}
//         layout="inline"
//       >
//         <TrimMoldingFilterRow subclassifications={subclassifications} />
//       </Form>
//       {/* @ts-ignore */}
//       <Table
//         columns={columns}
//         dataSource={trims[0]}
//         loading={loading}
//         {...tableProps}
//         title={() => (
//           <PaginateTableMetaData data={trims} count={100} filters={filters} />
//         )}
//         onChange={onPaginate}
//         pagination={{
//           total: trims[1],
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
