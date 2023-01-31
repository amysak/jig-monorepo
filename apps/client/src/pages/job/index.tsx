import { Job } from "features/job";
import { useQueryJob } from "hooks/queries";
import { useMatch } from "hooks/router";
import UILayout from "layouts/ui";

const JobPage = () => {
  const {
    params: { id },
  } = useMatch();

  const { data: job } = useQueryJob(id);

  return (
    <UILayout title={job?.name}>
      <Job />
    </UILayout>
  );
};

// TODO: do we need this component?
export default JobPage;
