import { useMatch, useNavigate } from "@tanstack/react-location";
import { Col, Row, Tabs } from "antd";

import { UILayout } from "components/layout";
import { NewJobPopover } from "components/popover-form";
import { LocationGenerics } from "router";
import { cleanParam } from "utilities";
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
  const navigate = useNavigate();

  return (
    <UILayout
    // ToolbarContent={
    // <PageHeader
    //   label={cleanParam(tabName ?? "")}
    //   component={<NewJobPopover />}
    // />
    // }
    >
      <Col className="pagewrapper__maincontent nomargin">
        <Row>
          <Tabs
            defaultActiveKey="info"
            onChange={(tabName) => navigate({ to: `/jobs/${id}/${tabName}` })}
            activeKey={tabName}
            style={{ width: "100%" }}
            items={panes}
          />
        </Row>
      </Col>
    </UILayout>
  );
};

export default Job;
