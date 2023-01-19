import { useMatch, useNavigate } from "@tanstack/react-location";
import { Tabs } from "antd";

import { UILayout } from "components/layout";
import { useQueryJob } from "hooks/queries";
import { LocationGenerics } from "router";
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
  } = useMatch<LocationGenerics>();

  console.log("useMatch() => ", useMatch());

  const { data: job, isFetching } = useQueryJob(id);

  const navigate = useNavigate();

  return (
    <UILayout title={`${!isFetching && job ? job.name : "Job ..."}`}>
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
    </UILayout>
  );
};

export default Job;
