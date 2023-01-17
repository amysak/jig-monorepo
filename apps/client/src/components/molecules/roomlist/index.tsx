import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Input, Row, Select, Table } from "antd";
import { useState } from "react";
import { Link } from "@tanstack/react-location";
import { nanoid } from "nanoid";

import { api } from "api";
import { UILayout } from "components/layout";
import { JOB_STATUSES_OPTIONS } from "../../../utilities/constants";
import { getQueryString } from "../../../utilities/utils";

function RoomsFilterRow() {
  return (
    <Row className="cabinets-filter-row">
      <Form.Item name="name">
        <Input style={{ minWidth: "300px" }} placeholder="Name" />
      </Form.Item>

      <Form.Item name="status">
        <Select style={{ minWidth: "200px" }} allowClear placeholder="Status">
          {JOB_STATUSES_OPTIONS.map((option) => (
            <Select.Option key={nanoid()} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Row>
  );
}

const columns = [
  {
    title: "Sort #",
    dataIndex: "sort_order",
    key: "sort_order",
    width: 100,
  },
  {
    title: "Room",
    dataIndex: "name",
    key: "name",

    render(name, room: { id: any }) {
      return <Link to={`/rooms/${room.id}`}>{name}</Link>;
    },
  },
  {
    title: "Job",
    dataIndex: "job",
    key: "job",

    render(job: { name: any }) {
      return job?.name;
    },
  },
  {
    title: "Elevation",
    dataIndex: "elevation",
    key: "elevation",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",

    render(rowStatus) {
      return (
        <Select value={rowStatus} style={{ width: "100%" }}>
          {JOB_STATUSES_OPTIONS.map((status) => (
            <Select.Option value={status.value} key={nanoid()}>
              {status.label}
            </Select.Option>
          ))}
        </Select>
      );
    },
  },
];

function RoomList() {
  const [form] = Form.useForm();
  // Make it a convention (limit, skip)
  const [filters, setFilters] = useState({ limit: 20, skip: 1 });

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ["rooms", filters],
    () => api.rooms.getAll(getQueryString(filters)),
    {
      onError: (error) => console.error(error),
    }
  );

  const onValuesChange = () => {
    queryClient.invalidateQueries(["rooms", filters]);
  };

  const initialPath = {
    title: "Rooms",
    path: "/rooms",
  };

  return (
    <UILayout
    // ToolbarContent={<AppHeader label="Rooms" initial={initialPath} />}
    >
      <Form form={form} onValuesChange={onValuesChange} layout="inline">
        <RoomsFilterRow />
      </Form>

      <Table
        loading={isLoading}
        // title={() => (
        //   <PaginateTableMetaData
        //     data={data?.rooms}
        //     count={data?.count}
        //     filters={filters}
        //   />
        // )}
        columns={columns}
        dataSource={data?.rooms}
        // onChange={onPaginate}
        pagination={{
          total: data?.count,
          pageSize: filters.limit,
          size: "small",
          showSizeChanger: false,
          current: filters.skip,
        }}
        className="clickablerows pagewrapper__maincontent nomargin"
        rowKey="id"
      />
    </UILayout>
  );
}

export default RoomList;
