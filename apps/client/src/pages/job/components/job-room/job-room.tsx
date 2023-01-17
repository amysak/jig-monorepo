import Icon, { PlusOutlined } from "@ant-design/icons";
import { Room } from "type-defs";
import { PageSkeleton } from "@jigbid/ui";
import { Link } from "@tanstack/react-location";
import { Button, Popover, Row, Table, Typography } from "antd";
import { ColumnType } from "antd/es/table";

import DeleteSVG from "assets/images/delete";
import { useMatch } from "hooks";
import { useCreateRoom, useDeleteRoom, useQueryRooms } from "hooks/queries";
import { NewRoom } from "./components";

import "./roomlist.scss";

const { Paragraph } = Typography;

export function JobRoomList() {
  const {
    params: { id: jobId },
  } = useMatch();

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

  const defaultColumns: ColumnType<Room>[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",

      render(name, room) {
        return <Link to={`/rooms/${room.id}`}>{name}</Link>;
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
              onClick={() => deleteRoom(room.id.toString())}
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
