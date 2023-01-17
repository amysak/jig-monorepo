import dayjs from "dayjs";
import { upperFirst } from "lodash";
import React from "react";

export const columns = [
  {
    title: "Jobs",
    dataIndex: "name",
    key: "name",
    width: 230,

    render(name) {
      return name;
    },
  },
  {
    title: "Client Name",
    dataIndex: "client",
    key: "client",
    width: 230,

    render(client: { name: any }) {
      return client.name;
    },
  },
  {
    title: "Estimate Date",
    dataIndex: "estimated_date",
    key: "estimated_date",
    width: 120,

    render(date) {
      return <>{dayjs(date).format("MM-DD-YYYY")}</>;
    },
  },
  {
    title: "Proposal Date",
    dataIndex: "proposed_date",
    key: "proposed_date",
    width: 120,

    render(date) {
      return <>{dayjs(date).format("MM-DD-YYYY")}</>;
    },
  },
  {
    title: "Subdivision",
    dataIndex: "subdivision",
    key: "subdivision",
    width: 50,
  },
  {
    title: "Lot #",
    dataIndex: "lot_number",
    key: "lot_number",
    width: 50,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 150,

    render(jobStatus) {
      return <span style={{ width: "100%" }}>{upperFirst(jobStatus)}</span>;
    },
  },
];
