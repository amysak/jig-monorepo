// import {
//   Checkbox,
//   Col,
//   Form,
//   Input,
//   InputNumber,
//   Radio,
//   Row,
//   Select,
//   Tabs,
//   Typography,
// } from "antd";
// import debounce from "lodash-es";
// import React, { useContext, useEffect } from "react";
// import { Route, useNavigate, useParams } from "@tanstack/react-location";

// import DoorSpecification from "./tabs/DoorSpecification";
// import FaceFrameSpecification from "./tabs/FaceFrameSpecification";
// import FivePartDrawerBox from "./tabs/FivePartDrawerBox";
// import FivePartTrayBox from "./tabs/FivePartTrayBox";
// import MetalDrawerSystem from "./tabs/MetalDrawerSystem";
// import MetalTraySystem from "./tabs/MetalTraySystem";
// import CabinetSpecifications from "./tabs/specifications";

// import { CabinetContext } from "../../../store/cabinets";
// import { inputNumberCostProps } from "../../../utilities";
// import {
//   ACTIVE_INACTIVE_STATUSES_OPTIONS,
//   CABINET_STYLES,
// } from "../../../utilities/constants";
// import { capitalize, shortId } from "../../../utilities/utils";
// import "./cabinet.scss";

// const { Title } = Typography;
// const formLayout = {
//   labelCol: { span: 10 },
//   wrapperCol: { span: 14 },
// };

// export default function MeasuredCabinet() {
//   const navigate = useNavigate();
//   const params = useParams<{ id?: string; cabinetTab?: string }>();

//   const panes = [
//     {
//       tab: "Cabinet Specifications",
//       Component: CabinetSpecifications,
//       route: "cabinet-specifications",
//     },
//     {
//       tab: "Door Specifications",
//       Component: DoorSpecification,
//       route: "door-specifications",
//     },
//     {
//       tab: "Metal Drawer System",
//       Component: MetalDrawerSystem,
//       route: "metal-drawer-system",
//     },
//     {
//       tab: "Five Part Drawer Box",
//       Component: FivePartDrawerBox,
//       route: "five-part-drawer-box",
//     },
//     {
//       tab: "Metal Tray System",
//       Component: MetalTraySystem,
//       route: "metal-tray-system",
//     },
//     {
//       tab: "Five Part Tray Box",
//       Component: FivePartTrayBox,
//       route: "five-part-tray-box",
//     },
//     {
//       tab: "Face Frame Specifications",
//       Component: FaceFrameSpecification,
//       route: "face-frame-specifications",
//     },
//   ];

//   return (
//     <Row className="pagewrapper">
//       <Col span={5}>
//         <LeftSide />
//       </Col>
//       <Col span={19}>
//         <div className="pagewrapper__maincontent">
//           <Tabs
//             defaultActiveKey="cabinet-pecifications"
//             activeKey={params.cabinetTab}
//             onChange={(cabinetTab) =>
//               navigate(`/cabinet-setup/cabinets/${params.id}/${cabinetTab}`)
//             }
//             style={{ width: "100%" }}
//           >
//             {panes.map((pane) => (
//               <Tabs.TabPane key={pane.route} tab={pane.tab}>
//                 <Route
//                   path={`/cabinet-setup/cabinets/:id?/${pane.route}`}
//                   element={<pane.Component />}
//                 />
//               </Tabs.TabPane>
//             ))}
//           </Tabs>
//         </div>
//       </Col>
//     </Row>
//   );
// }
export {};
