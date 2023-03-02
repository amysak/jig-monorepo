import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { Tabs } from "antd";
import { ReactNode } from "react";

import {
  RoomCabinetry,
  RoomSkeleton,
  RoomSummary,
  RoomTotal,
} from "features/room";
import { UILayout } from "layouts/ui";
import { api } from "lib/api";
import { RoomTab } from "lib/validation";
import { roomRoute } from "./routes";

const panes: { key: RoomTab; label: string; children: ReactNode }[] = [
  {
    label: "Summary",
    children: <RoomSummary />,
    key: "summary",
  },
  { label: "Cabinetry", children: <RoomCabinetry />, key: "cabinetry" },
  // View totals and edit upcharges
  { label: "Total", children: <RoomTotal />, key: "total" },
];

export default function RoomPage() {
  const params = useParams({ from: roomRoute.id });
  const search = useSearch({ from: roomRoute.id });
  const navigate = useNavigate({ from: roomRoute.id });

  const { data: room } = useQuery({
    queryKey: ["rooms", params.roomId],
    queryFn: () => api.rooms.getById(params.roomId),
  });

  return (
    <UILayout title={room?.name}>
      {room ? (
        <Tabs
          defaultActiveKey={search.tabName}
          onChange={(tabName) =>
            navigate({
              to: roomRoute.id,
              params: {
                roomId: params.roomId,
              },
              search: {
                tabName: tabName as RoomTab,
              },
              replace: true,
            })
          }
          activeKey={search.tabName}
          items={panes}
        />
      ) : (
        <RoomSkeleton />
      )}
    </UILayout>
  );
}
