import { PlusOutlined } from "@ant-design/icons";
import { Button, Popover, Table } from "antd";
import React from "react";
import { Link, useParams } from "react-router-dom";
import NewJobForm from "../newjobform";

import { getClientJobs, selectJobs } from "features/job";
import { useAppDispatch, useAppState } from "store/index";
import "./clientjoblist.scss";

const columns = [
  {
    title: "ID",
    dataIndex: "reference_no",
    key: "reference_no",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",

    render(col, row: { id: any }) {
      return <Link to={`/jobs/${row.id}`}>{col}</Link>;
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
  },
  {
    title: "# Rooms",
    dataIndex: "number_of_rooms",
    key: "number_of_rooms",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

function ClientJobList() {
  const [visible, setVisible] = React.useState(false);
  const { data: jobs } = useAppState(selectJobs);
  const dispatch = useAppDispatch();

  const params = useParams<{ id?: string }>();

  React.useEffect(() => {
    dispatch(getClientJobs(params.id));
  }, []);

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Popover
        visible={visible}
        onVisibleChange={setVisible}
        trigger="click"
        placement="right"
        content={<NewJobForm onClose={onClose} />}
      >
        <Button size="small" className="jig-button" icon={<PlusOutlined />}>
          Add Job
        </Button>
      </Popover>

      <br />
      <br />
      <Table
        columns={columns}
        //@ts-ignore
        dataSource={jobs?.[0] ?? []}
        pagination={false}
        rowKey="id"
        className="clientjobstable clickablerows"
      />
    </>
  );
}

ClientJobList.defaultProps = {};

export default ClientJobList;
