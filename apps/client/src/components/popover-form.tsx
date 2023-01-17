import { Button, Divider, Form, Popover, Row, Typography } from "antd";
import { capitalize } from "lodash-es";

import { PageSkeleton, FormInput, FormSelect } from "@jigbid/ui";
import { useCreateJob, useQueryClients } from "hooks/queries";
import { JOB_STATUSES } from "../utilities/constants";

const { Title } = Typography;

function NewJobForm() {
  const [form] = Form.useForm();

  const { data: clients, isLoading } = useQueryClients();

  const { mutate: createJob, isLoading: isCreatingJob } = useCreateJob();

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (!clients) {
    return <PageSkeleton />;
  }

  return (
    <Form
      form={form}
      onFinish={createJob}
      className="new-cabinet-setup-form"
      wrapperCol={{ span: 16 }}
      labelCol={{ span: 8 }}
    >
      <Title level={4}>New Job</Title>

      <Divider className="x5" />

      <FormInput
        label="Name"
        name="name"
        rules={[{ required: true, message: "Name is required." }]}
      />

      <FormSelect
        label="Client"
        name="clientId"
        rules={[
          {
            required: true,
            message: "Please select a client to create a Job",
          },
        ]}
        options={clients.map((client) => ({
          label: client.name,
          value: client.id,
        }))}
      />

      <FormInput label="Subdivision" name="subdivision" />

      <FormSelect
        label="Status"
        name="status"
        initialValue={JOB_STATUSES[0]}
        options={JOB_STATUSES.map((status) => ({
          label: capitalize(status),
          value: status,
        }))}
      />

      <Row justify="end">
        <Button
          size="small"
          loading={isCreatingJob}
          htmlType="submit"
          className="jig-button"
        >
          Submit
        </Button>
      </Row>
    </Form>
  );
}

export function NewJobPopover() {
  return (
    <Popover placement="leftTop" content={<NewJobForm />} trigger="click">
      <Button size="small" className="jig-button">
        Create Job
      </Button>
    </Popover>
  );
}
