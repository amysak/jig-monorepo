import { Link } from "@tanstack/react-location";
import { Select, Table } from "antd";
import { DEFAULT_PAGE_SIZE } from "type-defs";

// wtf?
// import { tableProps } from "../../cabinet-setup/utils";

import { useJobsPaginated } from "hooks/queries";
import { useSearch } from "hooks/router";
import { UILayout } from "layouts/ui";
import { JOB_STATUSES_OPTIONS } from "lib/constants";
import { dayjs } from "lib/dayjs";

// export const  JobsFilterRow() {
//   return (
//     <Row className="cabinets-filter-row">
//       <Form.Item name="name">
//         <Input style={{ minWidth: "300px" }} placeholder="Name" />
//       </Form.Item>

//       <Form.Item name="status">
//         <Select style={{ minWidth: "200px" }} allowClear placeholder="Status">
//           {JOB_STATUSES_OPTIONS.map((option) => (
//             <Select.Option key={nanoid()} value={option.value}>
//               {option.label}
//             </Select.Option>
//           ))}
//         </Select>
//       </Form.Item>
//     </Row>
//   );
// }

// TODO: decompose
const columns = [
  {
    title: "Jobs",
    dataIndex: "name",
    key: "name",
    width: 200,

    render(name, job: { id: any }) {
      return <Link to={`/jobs/${job.id}`}>{name}</Link>;
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

export const JobsList = () => {
  const search = useSearch();

  const { data, isLoading } = useJobsPaginated(search);

  return (
    <UILayout>
      {/* <JobsFilterRow /> */}

      <Table
        // {...tableProps}
        loading={isLoading}
        columns={columns}
        dataSource={data?.data}
        // onChange={onPaginate}
        pagination={{
          total: data?.count,
          pageSize: DEFAULT_PAGE_SIZE,
          size: "small",
          showSizeChanger: false,
          current: search.pagination?.page,
        }}
        rowKey="id"
        className="clickablerows"
      />
    </UILayout>
  );
};

export default JobsList;