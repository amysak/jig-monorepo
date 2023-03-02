import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Button, Card, Table, Typography } from "antd";

import { api } from "lib/api";
import { roomRoute } from "pages/routes";

const { Paragraph } = Typography;

export function CabinetAppliances() {
  const params = useParams({ from: roomRoute.id });

  const { data: userPanels } = useQuery({
    queryKey: ["accessory"],
    queryFn: () => api.equipment.getAll(),
  });

  const { data: room } = useQuery({
    queryKey: ["rooms", params.roomId],
    queryFn: () => api.rooms.getById(params.roomId),
  });

  if (!room) return null;

  return (
    <Card>
      {/* Popover with adding accessory, filter */}
      <Button type="primary">Add accessory</Button>

      {/* Show table with accessory */}
      {/* Show cabinets that already include accessory */}
      <Table dataSource={room.panels} pagination={false}></Table>
    </Card>
  );
}
