import { LinkOutlined } from "@ant-design/icons";
import { useParams } from "@tanstack/react-router";
import { Alert, Button, Col, Divider, Form, message, Row } from "antd";
import { debounce } from "lodash-es";
import { Client } from "type-defs";

import { FormInput, PageSkeleton } from "@jigbid/ui";
import { useMutateClient, useQueryJob } from "lib/hooks/queries";
import { jobRoute } from "pages/jobs";

import { AddressForm } from "./components";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export function JobClientForm() {
  const [form] = Form.useForm<Client>();
  const { jobId } = useParams({ from: jobRoute.id });

  const {
    data: job,
    isLoading,
    isError,
  } = useQueryJob(jobId, {
    onSuccess: (data) => {
      form.setFieldsValue(data.client);
    },
  });

  const { mutate: mutateClient } = useMutateClient(job?.client.id || 0);

  if (isLoading) {
    // TODO
    return <PageSkeleton />;
  }

  if (isError) {
    // TODO
    return <div>There was an error fetching a job for you</div>;
    // return <ErrorScreen/>
  }

  const client = job?.client;

  return (
    <>
      <Form
        {...layout}
        form={form}
        // TODO: apply debounce only if not updating the id of related entity
        onValuesChange={debounce((changedValues) => {
          mutateClient({
            ...changedValues,
          });
        }, 500)}
      >
        <Row>
          <Col span={12}>
            <Row justify="center" align="top" gutter={[10, 10]}>
              <Col span={22}>
                <FormInput name="name" label="Client name" />
              </Col>

              <Button
                onClick={() => {
                  navigator.clipboard.writeText(client.name);

                  message.success("Copied!");
                }}
                icon={<LinkOutlined />}
              />
            </Row>
          </Col>

          <Col span={3} push={9}>
            <Row>
              <Form.Item>{/* TODO: clients select */}</Form.Item>
            </Row>
          </Col>
        </Row>

        <Divider />

        <Row justify="space-between" style={{ padding: "0 2rem" }}>
          <Col span={11}>
            <AddressForm title={"Billing Address"} />
          </Col>

          <Col span={11}>
            <AddressForm title={"Shipping Address"} />
          </Col>
        </Row>

        <Divider />

        <Alert
          type="warning"
          message="Changing this will not affect the client's information. This overrides the address for this job only."
        />
      </Form>
    </>
  );
}
