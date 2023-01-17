import { Col } from "antd";
import { useParams } from "react-router-dom";

import { PageHeader } from "components/molecules/pageheader";
import { NewJobPopover } from "components/popover-form";
import UILayout from "components/templates/uilayout";
import { cleanParam } from "utilities";

import { Job as JobFeature } from "features/job";

const initial = {
  title: "Jobs",
  path: "/jobs",
};

export const Job = () => {
  const params = useParams<{ id?: string; tabName?: string }>();

  return (
    <UILayout
      ToolbarContent={
        <PageHeader
          label={cleanParam(params?.tabName ?? "")}
          initial={initial}
          component={<NewJobPopover />}
        />
      }
    >
      <Col className="pagewrapper__maincontent nomargin">
        <JobFeature />
      </Col>
    </UILayout>
  );
};

export default Job;
