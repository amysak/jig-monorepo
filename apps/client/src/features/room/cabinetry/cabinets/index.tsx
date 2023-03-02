import { Space } from "antd";
import { RoomCabinets } from "./cabinets";
import { RoomPanels } from "./panels";

export function RoomCabinetsAndPanels() {
  return (
    <Space>
      <RoomCabinets />
      <RoomPanels />
    </Space>
  );
}
