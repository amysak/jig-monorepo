import { UILayout } from "components/layout";
import { JobList } from "./components";

function JobsPage() {
  return (
    <UILayout
    // ToolbarContent={
    //   <PageHeader initial={initialPath} component={<NewJobPopover />} />
    // }
    >
      <JobList />
    </UILayout>
  );
}

export default JobsPage;
