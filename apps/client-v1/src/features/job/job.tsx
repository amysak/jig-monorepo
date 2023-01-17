import { Row, Tabs } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import {
  JobClientForm,
  JobInfoForm,
  JobNoteForm,
  JobRoomList,
} from "./components";

const panes = [
  { label: "Job Info", children: <JobInfoForm />, key: "info" },
  { label: "Client Info", children: <JobClientForm />, key: "client" },
  { label: "Rooms", children: <JobRoomList />, key: "rooms" },
  { label: "Notes", children: <JobNoteForm />, key: "notes" },
];

export const Job = () => {
  const navigate = useNavigate();

  const { id, tabName } = useParams<{ id: string; tabName?: string }>();

  return (
    <Row>
      <Tabs
        defaultActiveKey="info"
        onChange={(tabName) => navigate(`/jobs/${id}/${tabName}`)}
        activeKey={tabName}
        style={{ width: "100%" }}
        items={panes}
      />
    </Row>
  );
};
