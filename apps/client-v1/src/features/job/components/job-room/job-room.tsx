import Icon, { PlusOutlined } from "@ant-design/icons";
import { Button, Popover, Row, Table, Typography } from "antd";
import { Link, useParams } from "react-router-dom";

import DeleteSVG from "assets/images/delete";
import { PageSkeleton } from "components/skeleton";
import { useCreateRoom, useDeleteRoom, useQueryRooms } from "hooks/queries";
import { NewRoom } from "./components";

import "./roomlist.scss";

const { Paragraph } = Typography;

export function JobRoomList() {
  const { id: jobId } = useParams();

  const { data: rooms, isLoading, isError } = useQueryRooms(jobId);

  const { mutate: createRoom } = useCreateRoom(jobId);

  const { mutate: deleteRoom } = useDeleteRoom();

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (isError) {
    // TODO
    return <div>There was an error fetching a job for you</div>;
    // return <ErrorScreen/>
  }

  const defaultColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",

      render(name: string, row: { id: string }) {
        return <Link to={`/rooms/${row.id}`}>{name}</Link>;
      },
    },
    {
      title: "Elevation",
      dataIndex: "elevation",
      key: "elevation",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      width: 200,
      render(_, room) {
        return (
          <Row align="middle" className="actions">
            <Button size="small" onClick={() => createRoom(room)}>
              Duplicate Room
            </Button>
            <Icon
              component={DeleteSVG}
              onClick={() => deleteRoom(room.id)}
              style={{ marginLeft: "10px" }}
            />
          </Row>
        );
      },
    },
  ];

  return (
    <>
      <Paragraph strong>
        Add Rooms by clicking on Add button, then enter Room name and optional
        Elevation name.
      </Paragraph>
      <Popover trigger="click" placement="right" content={<NewRoom />}>
        <Button size="small" className="jig-button" icon={<PlusOutlined />}>
          Add a Room
        </Button>
      </Popover>

      <br />
      <br />
      <Table
        columns={defaultColumns}
        dataSource={rooms}
        pagination={false}
        rowKey="id"
        className="roomlisttable clickablerows"
      />
    </>
  );
}
