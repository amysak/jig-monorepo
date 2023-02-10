import { FormInput, PageSkeleton } from "@jigbid/ui";
import { useParams } from "@tanstack/react-router";
import { Button, Form, Typography } from "antd";
import { Job } from "type-defs";

import { useMutateJob, useQueryJob } from "lib/hooks/queries";
import { jobRoute } from "pages/routes";

const { Paragraph } = Typography;

export function JobNoteForm() {
  const [form] = Form.useForm<Job>();
  const { jobId } = useParams({ from: jobRoute.id });

  const {
    data: job,
    isLoading,
    isError,
  } = useQueryJob(jobId, {
    onSuccess: (data) => {
      form.setFieldsValue(data);
    },
  });

  const { mutate: mutateJob } = useMutateJob(jobId);

  if (isLoading) {
    // TODO
    return <PageSkeleton />;
  }

  if (isError) {
    // TODO
    return <div>There was an error fetching a job for you</div>;
    // return <ErrorScreen/>
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={job}
      onFinish={mutateJob}
    >
      <Paragraph strong>
        Enter any job specific notes in the appropriate box below
      </Paragraph>

      <FormInput
        textarea={{ rows: 3 }}
        input={{ height: 150 }}
        label="External Note: this note can be printed with Estimates and Proposals."
        name={["notes", "external"]}
      />

      <FormInput
        textarea={{ rows: 3 }}
        input={{ height: 150 }}
        label="Internal Note: this note do not print on any report."
        name={["notes", "internal"]}
      />

      <Form.Item>
        <Button className="jig-button" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
}
