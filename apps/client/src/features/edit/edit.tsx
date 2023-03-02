import { useMatch, useNavigate } from "@tanstack/react-router";
import { Modal } from "antd";
import { FC, ReactElement } from "react";

// const panes = [
//   {
//     tab: "Cabinet Specifications",
//     children: <CabinetSpecifications />,
//     route: "cabinet-specifications",
//   },
//   {
//     tab: "Door Specifications",
//     children: <DoorSpecification />,
//     route: "door-specifications",
//   },
//   {
//     tab: "Metal Drawer System",
//     children: <MetalDrawerSystem />,
//     route: "metal-drawer-system",
//   },
//   {
//     tab: "Five Part Drawer Box",
//     children: <FivePartDrawerBox />,
//     route: "five-part-drawer-box",
//   },
//   {
//     tab: "Metal Tray System",
//     children: <MetalTraySystem />,
//     route: "metal-tray-system",
//   },
//   {
//     tab: "Five Part Tray Box",
//     children: <FivePartTrayBox />,
//     route: "five-part-tray-box",
//   },
//   {
//     tab: "Face Frame Specifications",
//     children: <FaceFrameSpecification />,
//     route: "face-frame-specifications",
//   },
// ];

type EditModalProps = {
  content: ReactElement | ReactElement[];
};

export const EditModal: FC<EditModalProps> = ({ content }) => {
  const parent = useMatch().parentMatch;
  const splitParent = parent?.id.split("/");
  const entityName =
    splitParent?.filter(Boolean).at(-1)?.replace(/s$/, "") || "item";

  const navigate = useNavigate();
  const onCancel = () =>
    navigate({ to: parent ? (parent.id as any) : "/setup" });

  return (
    <Modal
      title={`Edit ${entityName}`}
      open={true}
      onCancel={onCancel}
      footer={null}
      width="90%"
      style={{ maxWidth: "1200px" }}
    >
      {content}
    </Modal>
  );
};

// TODO: UPCHARGES

//     <Title level={4}>Additional Costs</Title>
//     <Form.Item
//       name="additional_material_cost"
//       label="Additional Material Cost"
//     >
//       {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
//       <InputNumber {...inputNumberCostProps} />
//     </Form.Item>
//     <Form.Item
//       name="additional_installation_cost"
//       label="Additional Installation Labor"
//     >
//       <InputNumber {...inputNumberCostProps} />
//     </Form.Item>
//     <Form.Item name="additional_shop_labor" label="Additional Shop Labor">
//       <InputNumber {...inputNumberCostProps} />
//     </Form.Item>
//   </>
