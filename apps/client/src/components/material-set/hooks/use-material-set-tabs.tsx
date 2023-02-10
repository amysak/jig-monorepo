import { Divider, Space } from "antd";
import { AppliedPart } from "../components";

export const useMaterialSetTabs = () => {
  return {
    interior: [
      {
        key: "materials",
        label: "Materials",
        children: <div>Materials</div>,
      },
      {
        key: "notes",
        label: "Notes",
        children: <div>Notes</div>,
      },
    ],
    exterior: [
      {
        key: "openings",
        label: "Openings",
        children: (
          <>
            <Divider orientation="right">Door materials</Divider>
            <AppliedPart name={["exterior", "openings", "door"]} />
            <Divider orientation="right">Drawer materials</Divider>
            <AppliedPart name={["exterior", "openings", "drawer"]} />
          </>
        ),
      },
      {
        key: "panels",
        label: "Panels",
        children: <div>Panels</div>,
      },
      {
        key: "fillers",
        label: "Fillers",
        children: <div>Fillers</div>,
      },
      {
        key: "toes",
        label: "Toe Boards",
        children: <div>Toe Boards</div>,
      },
      {
        key: "molding",
        label: "Moldings",
        children: <div>Moldings</div>,
      },
      {
        key: "faceFrame",
        label: "Face Frames",
        children: <div>Face frames</div>,
      },
      {
        key: "edgebanding",
        label: "Edgebanding",
        children: <div>Edgebanding</div>,
      },
    ],
  };
};
