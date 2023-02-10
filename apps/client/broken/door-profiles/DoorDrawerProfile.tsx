export {};
// import {
//   Col,
//   Divider,
//   Form,
//   Input,
//   InputNumber,
//   message,
//   Row,
//   Select,
//   Table,
//   Typography,
// } from "antd";
// import debounce from "lodash-es";
// import React, { useEffect, useState } from "react";

// import { useNavigate, useParams } from "@tanstack/react-router";
// import { sendNotificationRequest } from "../../../actions/notification";
// import { getDoorProfiles, TGetDoorProfilesData } from "../../../api/doors";
// import {
//   getProfile,
//   updateProfile,
//   uploadProfileImage,
// } from "../../../api/profiles";
// import { getVendors } from "../../../api/vendors";
// import UploadButton from "../../../components/atoms/upload-button";
// import UILayout from "../../../components/templates/uilayout";
// import useFilter from "../../../hooks/useFilter";
// import { store } from "../../../store";
// import { inputNumberCostProps } from "../../../utilities";
// import {
//   ACTIVE_INACTIVE_STATUSES_OPTIONS,
//   DOOR_PROFILES_OPTIONS,
// } from "../../../utilities/constants";
// import {
//   getQueryString,
//   setTableRowClass,
//   shortId,
//   sleep,
// } from "../../../utilities/utils";
// import { PageHeader } from "./components";
// interface IllustationProps {
//   imageURL: any;
// }

// const { Title } = Typography;

// const formLayout = {
//   wrapperCol: { span: 18 },
//   labelCol: { span: 6 },
// };
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

//     data.append("profileId", params.id);

//     try {
//       setLoading(true);

//       const result = await uploadProfileImage(data);

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

// export default function DoorDrawerProfile() {
//   const params = useParams<{ id?: string }>();
//   const navigate = useNavigate();
//   const [form] = Form.useForm();
//   const [profile, setProfile] = useState<{ name?: string }>({});
//   const [profiles, setProfiles] = useState<TGetDoorProfilesData>([[], 0]);
//   const [vendors, setVendors] = useState([]);
//   const [filters, setFilters] = useFilter("profiles", {});

//   const getProfiles = async (query = "") => {
//     try {
//       const profiles = await getDoorProfiles(query);

//       setProfiles(profiles);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleGetProfile = async () => {
//     try {
//       const profile = await getProfile(params.id);

//       setProfile(profile);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const scrollToProfile = () => {
//     const profileRow = document.querySelector(`.selected-row`);

//     if (profileRow) profileRow.scrollIntoView();
//   };

//   const getProfileVendors = async () => {
//     const vendors = await getVendors();

//     setVendors(vendors[0]);
//   };

//   useEffect(() => form.resetFields(), [profile]);

//   useEffect(() => {
//     handleGetProfile();
//     getProfileVendors();
//     getProfiles();

//     sleep(1000).then(scrollToProfile);
//   }, []);

//   const columns = [
//     {
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       dataIndex: "category",
//       key: "category",
//     },
//   ];

//   const onFormValuesChange = debounce(
//     async (value, values: { [x: number]: any }) => {
//       try {
//         await updateProfile(params.id, values);

//         store.dispatch(
//           sendNotificationRequest({
//             message: "Updated successfully.",
//             type: "success",
//           })
//         );
//       } catch {
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

//   const onValuesChange = (filter) => {
//     const newFilters = { ...filters, ...filter };
//     const query = getQueryString(newFilters);

//     getProfiles(query);
//     setFilters(newFilters);
//   };

//   return (
//     <UILayout
//       ToolbarContent={
//         <PageHeader
//           allowAlter
//           label={profile?.name}
//           parent={{
//             path: "/door-drawer-profiles",
//             label: "Profiles",
//           }}
//         />
//       }
//     >
//       <Row className="pagewrapper">
//         <Col span={6} className="pagewrapper__leftside">
//           <Title level={4}>Profile Options</Title>

//           <Form layout="vertical" onValuesChange={onValuesChange}>
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
//               <Select>
//                 {DOOR_PROFILES_OPTIONS.map((profile) => (
//                   <Select.Option value={profile.value} key={shortId()}>
//                     {profile.label}
//                   </Select.Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item>
//               <Table
//                 columns={columns}
//                 dataSource={profiles[0]}
//                 pagination={false}
//                 showHeader={false}
//                 rowKey="id"
//                 size="small"
//                 // @ts-expect-error TS(2339): Property 'id' does not exist on type '{}'.
//                 rowClassName={setTableRowClass(profile.id)}
//                 style={{
//                   height: window.innerHeight - 250,
//                   overflow: "auto",
//                 }}
//                 onRow={(row) => {
//                   return {
//                     onClick: () =>
//                       navigate(`/cabinet-setup/door-drawer-profiles/${row.id}`),
//                   };
//                 }}
//               />
//             </Form.Item>
//           </Form>
//         </Col>
//         <Col span={18}>
//           <div className="pagewrapper__maincontent">
//             <Form
//               onValuesChange={onFormValuesChange}
//               form={form}
//               {...formLayout}
//               initialValues={profile}
//               className="pagewrapper__leftside"
//             >
//               <Row>
//                 <Col span={12}>
//                   <Form.Item label="Profile Name" name="name">
//                     <Input style={input80PercentStyle} />
//                   </Form.Item>
//                 </Col>

//                 <Col span={12}>
//                   <Form.Item
//                     label="Upcharge"
//                     name="upcharge"
//                     help="Per linear inch"
//                   >
//                     {/* @ts-expect-error TS(2322): Type '{ style: { width: string; }; min: number; st... Remove this comment to see the full error message */}
//                     <InputNumber
//                       {...inputNumberCostProps}
//                       style={input80PercentStyle}
//                     />
//                   </Form.Item>
//                 </Col>

//                 <Col span={12}>
//                   <Form.Item label="Category" name="category">
//                     <Select style={input80PercentStyle}>
//                       {DOOR_PROFILES_OPTIONS.map((profile) => (
//                         <Select.Option value={profile.value} key={shortId()}>
//                           {profile.label}
//                         </Select.Option>
//                       ))}
//                     </Select>
//                   </Form.Item>
//                 </Col>

//                 <Col span={12}>
//                   <Form.Item label="Vendor" name={["vendor", "id"]}>
//                     <Select style={input80PercentStyle}>
//                       {vendors.map((option) => (
//                         <Select.Option value={option.id} key={shortId()}>
//                           {option.name}
//                         </Select.Option>
//                       ))}
//                     </Select>
//                   </Form.Item>
//                 </Col>

//                 <Col span={12}>
//                   <Form.Item label="Description" name="description">
//                     <Input.TextArea rows={6} />
//                   </Form.Item>
//                 </Col>
//               </Row>
//             </Form>

//             <Divider />

//             <Row>
//               <Col span={12}>
//                 {/* @ts-expect-error TS(2339): Property 'image_url' does not exist on type '{}'. */}
//                 <Illustation imageURL={profile?.image_url} />
//               </Col>
//             </Row>
//           </div>
//         </Col>
//       </Row>
//     </UILayout>
//   );
// }
