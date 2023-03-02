import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Button, Card, Input, Space, Table, Typography } from "antd";

import { api } from "lib/api";
import { roomRoute } from "pages/routes";

const { Paragraph } = Typography;

export function RoomPanels() {
  const params = useParams({ from: roomRoute.id });

  const { data: userPanels } = useQuery({
    queryKey: ["panels"],
    queryFn: () => api.panels.getAll(),
  });

  const { data: room } = useQuery({
    queryKey: ["rooms", params.roomId],
    queryFn: () => api.rooms.getById(params.roomId),
  });

  if (!room) return null;

  return (
    <Card>
      {/* Add from dimensions and panel qty */}
      <Space direction="vertical">
        <Input />
        <Input />
        <Input />
      </Space>
      <Button>Add</Button>

      {/* Popover with adding panel */}
      <Button type="primary">From existing</Button>
      <RoomEndPanels />

      {/* Group by type */}
      <Table dataSource={room.panels} pagination={false}></Table>
    </Card>
  );
}

function RoomEndPanels() {
  return (
    <>
      <Paragraph>Add end panels for your cabinets</Paragraph>
      <Button type="primary">Add end panel</Button>
    </>
  );
}
