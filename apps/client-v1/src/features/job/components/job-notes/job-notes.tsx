import { Button, Form, Typography } from "antd";
import { useParams } from "react-router-dom";

import { FormInput } from "components/form";
import { PageSkeleton } from "components/skeleton";
import { Job } from "entities";
import { useMutateJob, useQueryJob } from "hooks/queries";

const { Paragraph } = Typography;

export function JobNoteForm() {
  const [form] = Form.useForm<Job>();
  const { id } = useParams();

  const {
    data: job,
    isLoading,
    isError,
  } = useQueryJob(id, {
    onSuccess: (data) => {
      form.setFieldsValue(data);
    },
  });

  const { mutate: mutateJob } = useMutateJob(id);

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
        inputStyle={{ height: 150 }}
        label="External Note: this note can be printed with Estimates and Proposals."
        name={["notes", "external"]}
      />

      <FormInput
        textarea={{ rows: 3 }}
        inputStyle={{ height: 150 }}
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
