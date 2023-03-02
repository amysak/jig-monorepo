import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Radio } from "antd";
import { useState } from "react";

import { RoomCabinetsAndPanels } from "./cabinets";
import { CabinetAppliances } from "./appliances";
import { CabinetAccessory } from "./accessory";
import { CabinetMoldings } from "./moldings";
import { api } from "lib/api";
import { roomRoute } from "pages/routes";

const cabinetryMap = new Map([
  ["cabinets", RoomCabinetsAndPanels],
  ["appliances", CabinetAppliances],
  ["accessory", CabinetAccessory],
  ["moldings", CabinetMoldings],
]);

export function RoomCabinetry() {
  const params = useParams({ from: roomRoute.id });
  const [tab, setTab] = useState("cabinets");

  const { data: room } = useQuery({
    queryKey: ["rooms", params.roomId],
    queryFn: () => api.rooms.getById(params.roomId),
  });

  const Component = cabinetryMap.get(tab);

  return (
    <>
      <Radio.Group
        onChange={(e) => setTab(e.target.value)}
        defaultValue="cabinets"
      >
        <Radio.Button value="cabinets">Cabinets & Panels</Radio.Button>
        <Radio.Button value="appliances">Cabinet Appliances</Radio.Button>
        <Radio.Button value="accessory">Accessory & Hardware</Radio.Button>
        <Radio.Button value="moldings">Trims & Moldings</Radio.Button>
      </Radio.Group>

      {Component && <Component />}
    </>
  );
}
