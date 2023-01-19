export {};
// import { CloseOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
// import {
//   Button,
//   Checkbox,
//   Col,
//   Form,
//   Input,
//   InputNumber,
//   Popconfirm,
//   Radio,
//   Row,
//   Select,
//   Table,
//   Typography,
// } from "antd";
// import React, { useContext, useEffect, useState } from "react";
// import { Link } from "@tanstack/react-location";
// import {
//   createOneLinearInchPrice,
//   getAllLinearInchPrice,
//   TGetAllLinearInchPriceData,
//   updateOneLinearInchPrice,
// } from "../../../../api/linear-inch-price";
// import {
//   getSetupMaterialNames,
//   TGetSetupMaterialsData,
// } from "../../../../api/materials";
// import { DoorContext } from "../../../../store/door";
// import {
//   inputNumberCostProps,
//   inputNumberPercentProps,
// } from "../../../../utilities";
// import {
//   calcDiscount,
//   capitalize,
//   safeNum,
//   shortId,
//   toFixed,
// } from "../../../../utilities/utils";
// import DoorDrawerMaterials from "./DoorDrawerMaterials";

// interface DrawerBoxMaterialsProps {
//   door: any;
// }

// interface DrawerBoxOutsourceMatrixProps {
//   door: any;
// }

// const tableSelectStyle = {};
// const { Title, Text } = Typography;
// const compactRightInputStyle = { marginLeft: "10px" };

// export const JoinTypeLabel = () => <Title level={4}>Joint Type</Title>;

// export function JoinType() {
//   return (
//     <Col span={12}>
//       <Form.Item name="joint_type" label={<JoinTypeLabel />}>
//         <Radio.Group name="radiogroup">
//           {["dovetail", "rabbet", "butt"].map((joinType) => (
//             <Radio value={joinType} key={shortId()}>
//               {capitalize(joinType)}
//             </Radio>
//           ))}
//         </Radio.Group>
//       </Form.Item>
//     </Col>
//   );
// }

// function CostPerDrawerBox({ door, source }) {
//   return source === "in" ? (
//     <>
//       <Col xs={12} md={6} lg={4}>
//         <Form.Item label="In-House Labor Cost" name="in_house_labor_cost">
//           {/* @ts-expect-error TS(2322): Type '{ style: {}; min: number; step: number; cont... Remove this comment to see the full error message */}
//           <InputNumber {...inputNumberCostProps} style={tableSelectStyle} />
//         </Form.Item>
//       </Col>

//       <Col xs={12} md={6} lg={4}>
//         <Form.Item
//           label={`Minimum ${capitalize(door.category) || ""} Cost`}
//           name="minimum_cost"
//         >
//           {/* @ts-expect-error TS(2322): Type '{ style: {}; min: number; step: number; cont... Remove this comment to see the full error message */}
//           <InputNumber {...inputNumberCostProps} style={tableSelectStyle} />
//         </Form.Item>
//       </Col>
//     </>
//   ) : (
//     <>
//       <Col xs={12} md={6} lg={4}>
//         <Form.Item label="Assembly Cost" name="assembly_cost">
//           {/* @ts-expect-error TS(2322): Type '{ style: {}; min: number; step: number; cont... Remove this comment to see the full error message */}
//           <InputNumber {...inputNumberCostProps} style={tableSelectStyle} />
//         </Form.Item>
//       </Col>
//       <Col xs={12} md={6} lg={4}>
//         <Form.Item label="Prefinished Cost" name="prefinished_cost">
//           {/* @ts-expect-error TS(2322): Type '{ style: {}; min: number; step: number; cont... Remove this comment to see the full error message */}
//           <InputNumber {...inputNumberCostProps} style={tableSelectStyle} />
//         </Form.Item>
//       </Col>

//       <Col xs={12} md={6} lg={4}>
//         <Form.Item label="Minimum Linear Inches" name="minimum_linear_inches">
//           <InputNumber style={tableSelectStyle} />
//         </Form.Item>
//       </Col>
//       <Col xs={12} md={6} lg={4}>
//         <Form.Item label="Discount" name="discount_percentage">
//           {/* @ts-expect-error TS(2322): Type '{ style: {}; min: number; max: number; forma... Remove this comment to see the full error message */}
//           <InputNumber {...inputNumberPercentProps} style={tableSelectStyle} />
//         </Form.Item>
//       </Col>
//     </>
//   );
// }

// function DrawerBoxInOut({ source }) {
//   return (
//     <>
//       <Title level={4}>Options</Title>

//       <Form.Item label="Under mount Notching">
//         <Input.Group compact>
//           <Form.Item
//             name={["under_mount_notching", "checked"]}
//             valuePropName="checked"
//           >
//             <Checkbox />
//           </Form.Item>

//           <Form.Item
//             name={["under_mount_notching", "cost"]}
//             style={compactRightInputStyle}
//           >
//             {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
//             <InputNumber {...inputNumberCostProps} />
//           </Form.Item>
//         </Input.Group>
//       </Form.Item>

//       {source?.toLowerCase() === "in" ? (
//         <Form.Item label="Bread Box Top Routing">
//           <Input.Group compact>
//             <Form.Item
//               name={["bread_box_top_routing", "checked"]}
//               valuePropName="checked"
//             >
//               <Checkbox />
//             </Form.Item>

//             <Form.Item
//               name={["bread_box_top_routing", "cost"]}
//               style={compactRightInputStyle}
//             >
//               {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
//               <InputNumber {...inputNumberCostProps} />
//             </Form.Item>
//           </Input.Group>
//         </Form.Item>
//       ) : (
//         <Form.Item label="Breadboard Top Routing">
//           <Input.Group compact>
//             <Form.Item
//               name={["breadboard_top_routing", "checked"]}
//               valuePropName="checked"
//             >
//               <Checkbox />
//             </Form.Item>

//             <Form.Item
//               name={["breadboard_top_routing", "cost"]}
//               style={compactRightInputStyle}
//             >
//               {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
//               <InputNumber {...inputNumberCostProps} />
//             </Form.Item>
//           </Input.Group>
//         </Form.Item>
//       )}

//       <Form.Item label="Hand Pull">
//         <Input.Group compact>
//           <Form.Item name={["hand_pull", "checked"]} valuePropName="checked">
//             <Checkbox />
//           </Form.Item>

//           <Form.Item
//             name={["hand_pull", "cost"]}
//             style={compactRightInputStyle}
//           >
//             {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
//             <InputNumber {...inputNumberCostProps} />
//           </Form.Item>
//         </Input.Group>
//       </Form.Item>
//     </>
//   );
// }

// function DrawerBoxMaterials({ door }: DrawerBoxMaterialsProps) {
//   const doorCtx = useContext(DoorContext);

//   const columns = [
//     {
//       title: "Material Name",
//       dataIndex: "name",
//       key: "name",

//       render(name, row: { id: any }) {
//         return <Link to={`/cabinet-setup/materials/${row.id}`}>{name}</Link>;
//       },
//     },
//     {
//       title: "Material Cost",
//       dataIndex: "in_house_material_cost",
//       key: "in_house_material_cost",

//       render(cost) {
//         return `$${cost ?? 0}`;
//       },
//     },
//     {
//       title: "Waste Factor %",
//       dataIndex: "waste_factor",
//       key: "waste_factor",
//     },
//     {
//       title: "Material Cost with Waste Factor",
//       dataIndex: "material_cost_waste_factor",
//       key: "material_cost_waste_factor",

//       render(_, row: { in_house_material_cost: number; waste_factor: number }) {
//         return `${toFixed(
//           calcDiscount(row.in_house_material_cost, row.waste_factor) +
//             safeNum(row.in_house_material_cost)
//         )}`;
//       },
//     },
//     {
//       render(material: { id: any }) {
//         return (
//           <Button
//             type="link"
//             onClick={() => {
//               doorCtx.onRemoveDoorMaterial(door.id, material.id);
//             }}
//           >
//             Remove
//           </Button>
//         );
//       },
//     },
//   ];
//   //@ts-ignore
//   return <DoorDrawerMaterials columns={columns} door={door} />;
// }

// const EditableCell = ({
//   editing,

//   dataIndex,

//   title,

//   inputType,

//   materials,

//   children,
//   ...restProps
// }) => {
//   const itemName = inputType === "select" ? [dataIndex, "id"] : dataIndex;

//   return (
//     <td {...restProps}>
//       {editing ? (
//         <Form.Item
//           name={itemName}
//           style={{
//             margin: 0,
//           }}
//           rules={[
//             {
//               required: true,
//               message: `Please Input ${title}!`,
//             },
//           ]}
//         >
//           {inputType === "select" ? (
//             <Select>
//               {materials.map((option) => (
//                 <Select.Option key={option.id} value={option.id}>
//                   {option.name}
//                 </Select.Option>
//               ))}
//             </Select>
//           ) : (
//             <InputNumber />
//           )}
//         </Form.Item>
//       ) : (
//         children
//       )}
//     </td>
//   );
// };

// function DrawerBoxOutsourceMatrix({ door }: DrawerBoxOutsourceMatrixProps) {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [linearInchPrices, setLinearInchPrices] =
//     useState<TGetAllLinearInchPriceData>([[], 0]);
//   const [materials, setMaterials] = useState<TGetSetupMaterialsData>([[], 0]);
//   const [editingKey, setEditingKey] = useState("");
//   const [initialValue, setInitialValue] = useState({});

//   const isEditing = (record: { id: string }) => record.id === editingKey;

//   const onEdit = (record: { id: any }) => {
//     form.setFieldsValue(record);

//     setEditingKey(record.id);
//   };

//   const onCancel = () => {
//     setEditingKey("");
//   };

//   const getData = async () => {
//     try {
//       setLoading(true);

//       const [linearInchPrices, materials] = await Promise.all([
//         getAllLinearInchPrice(),
//         getSetupMaterialNames(),
//       ]);

//       setMaterials(materials);
//       setLinearInchPrices(linearInchPrices);
//     } catch {
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createEmptyLinearInchPrice = async () => {
//     try {
//       setLoading(true);

//       const createdLinearInchPrice = await createOneLinearInchPrice();

//       setLinearInchPrices([
//         [createdLinearInchPrice, ...linearInchPrices[0]],
//         linearInchPrices.length + 1,
//       ]);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onUpdate = async (id) => {
//     try {
//       setLoading(true);

//       const payload = await form.validateFields();

//       const material = materials[0].find(
//         (mat: { id: any }) => mat.id === payload.material?.id
//       );

//       await updateOneLinearInchPrice(id, payload);

//       const updatedLinearInchPrices = linearInchPrices[0].map(
//         (linearInchPrice: { id: any }) => {
//           if (id === linearInchPrice.id) {
//             return Object.assign({}, linearInchPrice, {
//               ...payload,
//               material,
//             });
//           }

//           return linearInchPrice;
//         }
//       );

//       setLinearInchPrices([
//         updatedLinearInchPrices,
//         updatedLinearInchPrices.length,
//       ]);
//       onCancel();
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const linearInch = linearInchPrices[0].find(
//       (l: { id: string }) => l.id === editingKey
//     );

//     setInitialValue(linearInch || {});
//   }, [editingKey]);

//   useEffect(() => {
//     getData();
//   }, []);

//   const columns = [
//     {
//       title: "Material Name",
//       key: "material",
//       dataIndex: "material",
//       editable: true,

//       render(material: { id: any; name: any }) {
//         return (
//           <Link to={`/cabinet-setup/materials/${material?.id ?? ""}`}>
//             {material?.name ?? ""}
//           </Link>
//         );
//       },
//     },
//     {
//       title: '2"-3"',
//       key: "2-3",
//       dataIndex: "2-3",
//       editable: true,

//       render: (value) => <Text>${value}</Text>,
//     },
//     {
//       title: '3 1/2"-4"',
//       key: "3.5-4",
//       dataIndex: "3.5-4",
//       editable: true,

//       render: (value) => <Text>${value}</Text>,
//     },
//     {
//       title: '4 1/2"-6"',
//       key: "4.5-6",
//       dataIndex: "4.5-6",
//       editable: true,

//       render: (value) => <Text>${value}</Text>,
//     },
//     {
//       title: '6 1/2"-8"',
//       key: "6.5-8",
//       dataIndex: "6.5-8",
//       editable: true,

//       render: (value) => <Text>${value}</Text>,
//     },
//     {
//       title: '8 1/2"-10"',
//       key: "8.5-10",
//       dataIndex: "8.5-10",
//       editable: true,

//       render: (value) => <Text>${value}</Text>,
//     },
//     {
//       title: '10 1/2"-12',
//       key: "10.5-12",
//       dataIndex: "10.5-12",
//       editable: true,

//       render: (value) => <Text>${value}</Text>,
//     },
//     {
//       dataIndex: "operation",

//       render: (_, record: { id: any }) => {
//         const editable = isEditing(record);

//         return editable ? (
//           <>
//             <Button
//               icon={<SaveOutlined />}
//               size="small"
//               type="link"
//               style={{ marginRight: 8 }}
//               onClick={() => onUpdate(record.id)}
//             />

//             <Popconfirm title="Sure to cancel?" onConfirm={onCancel}>
//               <Button icon={<CloseOutlined />} size="small" type="link" />
//             </Popconfirm>
//           </>
//         ) : (
//           <Button
//             icon={<EditOutlined />}
//             size="small"
//             type="link"
//             onClick={() => onEdit(record)}
//           />
//         );
//       },
//     },
//   ];

//   const mergedColumns = columns.map((col) => {
//     if (!col.editable) {
//       return col;
//     }

//     return {
//       ...col,

//       onCell: (record: { id: string }) => ({
//         record,
//         inputType: col.dataIndex === "material" ? "select" : "number",
//         dataIndex: col.dataIndex,
//         title: col.title,
//         editing: isEditing(record),
//         materials: materials[0],
//       }),
//     };
//   });

//   return (
//     <Form form={form} initialValues={initialValue} style={{ width: "100%" }}>
//       <Table
//         loading={loading}
//         columns={mergedColumns}
//         dataSource={linearInchPrices[0]}
//         pagination={false}
//         className="table-nopadding-cell"
//         rowKey="id"
//         title={function () {
//           return (
//             <Col>
//               <Row justify="space-between" align="middle">
//                 <Text strong>Total: {linearInchPrices[0].length}</Text>
//                 <Button
//                   size="small"
//                   className="jig-button"
//                   onClick={createEmptyLinearInchPrice}
//                 >
//                   Add Material Linear Inch Price
//                 </Button>
//               </Row>

//               <Row>
//                 <Col span={10}>
//                   <Text strong>{capitalize(door?.category)} Materials</Text>
//                 </Col>
//                 <Col span={14}>
//                   <Text strong>{capitalize(door?.category)} Heights</Text>
//                 </Col>
//               </Row>
//             </Col>
//           );
//         }}
//         style={{
//           height: "400px",
//           width: "100%",
//         }}
//         components={{
//           body: {
//             cell: EditableCell,
//           },
//         }}
//       />
//     </Form>
//   );
// }

// function DrawerBoxMaterialsMatrix({ source, door }) {
//   return source === "in" ? (
//     <DrawerBoxMaterials door={door} />
//   ) : (
//     <DrawerBoxOutsourceMatrix door={door} />
//   );
// }

// export default {
//   JoinType,
//   CostPerDrawerBox,
//   DrawerBoxInOut,
//   DrawerBoxMaterialsMatrix,
// };
