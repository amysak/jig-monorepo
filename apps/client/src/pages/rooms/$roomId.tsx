import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { Tabs } from "antd";
import { ReactNode } from "react";

import {
  RoomAccessory,
  RoomCabinets,
  RoomPanels,
  RoomSkeleton,
  RoomSummary,
  RoomUpcharges,
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
  { label: "Setup", children: <RoomCabinets />, key: "cabinets" },
  // Should be able to add all types of panels in here
  { label: "Panels", children: <RoomPanels />, key: "panels" },
  // Additional accesssory
  { label: "Accessory", children: <RoomAccessory />, key: "accessory" },
  // Editing and adding additional upcharges
  { label: "Upcharges", children: <RoomUpcharges />, key: "upcharges" },
  // { label: "Separate parts", children: <RoomMisc />, key: "misc" },
  // { label: "Prices", children: <RoomPrices />, key: "prices" },
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
