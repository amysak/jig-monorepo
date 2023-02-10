import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { Tabs } from "antd";

import {
  JobClientForm,
  JobInfoForm,
  JobNoteForm,
  JobRoomList,
} from "features/job";
import { UILayout } from "layouts/ui";
import { api } from "lib/api";
import { JobTab } from "lib/validation";

import { jobRoute, jobsRoute } from "./routes";

const panes = [
  { label: "Job Info", children: <JobInfoForm />, key: "info" },
  { label: "Client Info", children: <JobClientForm />, key: "client" },
  { label: "Rooms", children: <JobRoomList />, key: "rooms" },
  { label: "Notes", children: <JobNoteForm />, key: "notes" },
];

export default function JobPage() {
  const params = useParams({ from: jobRoute.id });
  const search = useSearch({ from: jobRoute.id });
  const navigate = useNavigate();

  const { data: job } = useQuery({
    queryKey: ["jobs", params.jobId],
    queryFn: () => api.jobs.getById(params.jobId),
  });

  return (
    <UILayout title={job?.name}>
      <Tabs
        className="pagewrapper__maincontent nomargin"
        defaultActiveKey={search.tabName}
        onChange={(tabName) =>
          navigate({
            from: jobsRoute.id,
            to: jobRoute.id,
            params: {
              jobId: params.jobId,
            },
            search: {
              tabName: tabName as JobTab,
            },
            replace: true,
          })
        }
        activeKey={search.tabName}
        style={{ width: "100%" }}
        items={panes}
      />
    </UILayout>
  );
}
