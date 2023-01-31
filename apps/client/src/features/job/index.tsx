import { Tabs } from "antd";

import { useQueryJob } from "hooks/queries";
import { useMatch, useNavigate } from "hooks/router";
import { UILayout } from "layouts/ui";

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
  const {
    params: { id, tabName },
  } = useMatch();

  const navigate = useNavigate();

  return (
    <Tabs
      className="pagewrapper__maincontent nomargin"
      defaultActiveKey={tabName}
      onChange={(tabName) =>
        navigate({ to: `/jobs/${id}/${tabName}`, replace: true })
      }
      activeKey={tabName}
      style={{ width: "100%" }}
      items={panes}
    />
  );
};

export default Job;
