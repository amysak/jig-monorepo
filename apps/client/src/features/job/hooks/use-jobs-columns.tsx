import { Link } from "@tanstack/react-router";
import { Select, TableProps } from "antd";
import { CompletionStatus, Job, MaterialSet, Room } from "type-defs";

import { RoomProgress } from "features/room";
import { JOB_STATUSES_OPTIONS } from "lib/constants";
import { dayjs } from "lib/dayjs";

export const useJobsColumns = () => {
  const columns: TableProps<Job>["columns"] = [
    {
      title: "Jobs",
      dataIndex: "name",
      key: "name",
      width: 200,

      render(name, job: { id: number }) {
        return (
          <Link
            to="/jobs/$jobId"
            params={{ jobId: job.id }}
            search={{ tabName: "info" }}
          >
            {name}
          </Link>
        );
      },
    },
    {
      title: "Client Name",
      dataIndex: "client",
      key: "client",
      width: 400,

      render(client?: { name: string }) {
        return client?.name;
      },
    },
    {
      title: "Estimate Date",
      dataIndex: "estimateDate",
      key: "estimateDate",
      width: 200,

      render(date) {
        return <>{dayjs(date).format("MM-DD-YYYY")}</>;
      },
    },
    {
      title: "Proposal Date",
      dataIndex: "proposalDate",
      key: "proposalDate",
      width: 200,

      render(date) {
        return <>{dayjs(date).format("MM-DD-YYYY")}</>;
      },
    },
    {
      title: "Subdivision",
      dataIndex: "subdivision",
      key: "subdivision",
    },
    {
      title: "Lot #",
      dataIndex: "lot_number",
      key: "lot_number",
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 200,

      render(jobStatus) {
        return (
          <Select value={jobStatus} style={{ width: "100%" }}>
            {JOB_STATUSES_OPTIONS.map((status, key) => (
              <Select.Option key={key} value={status.value}>
                {status.label}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
  ];

  const roomColumns: TableProps<Room>["columns"] = [
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
      render: (name: string, room) => (
        <Link
          to="/rooms/$roomId"
          params={{ roomId: room.id }}
          search={{ tabName: "summary" }}
        >
          {name}
        </Link>
      ),
    },
    {
      key: "materialSet",
      dataIndex: "materialSet",
      title: "Used material set",
      render: (materialSet: MaterialSet) =>
        materialSet ? materialSet.name : "N/A",
    },
    {
      key: "totalPrice",
      dataIndex: "totalPrice",
      title: "Room total price",
      render: (totalPrice: number) => totalPrice.toFixed(2),
    },
    {
      key: "status",
      dataIndex: "status",
      title: "Status",
      render: (status: CompletionStatus) => (
        <RoomProgress type="inline" status={status} />
      ),
    },
    {
      key: "updatedAt",
      dataIndex: "updatedAt",
      title: "Latest update",
      render: (updatedAt: Date) => dayjs(updatedAt).format("MM-DD-YYYY"),
    },
  ];

  return [columns, roomColumns] as const;
};
