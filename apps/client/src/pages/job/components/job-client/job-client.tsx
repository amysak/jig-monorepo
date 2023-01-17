import { LinkOutlined } from "@ant-design/icons";
import { Client } from "type-defs";
import { Alert, Button, Col, FormInput, PageSkeleton, Row } from "@jigbid/ui";
import { useMatch } from "@tanstack/react-location";
import { Divider, Form, message, Typography } from "antd";
import { debounce } from "lodash-es";

import { api } from "api";
// import {
//   MailingAddressForm,
//   PhysicalAddressForm,
// } from "components/molecules/addressforms";
import { useMutateClient, useQueryJob } from "hooks/queries";
import { LocationGenerics } from "router";
import { ClientsSelect } from "../clientsSelect/ClientsSelect";

const { Title } = Typography;

const footerStyle = {};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export function JobClientForm() {
  const [form] = Form.useForm<Client>();
  const {
    params: { id: jobId },
  } = useMatch<LocationGenerics>();

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
              <Form.Item>
                <ClientsSelect
                  selectedClient={client}
                  updateJobsClient={(data) =>
                    api.clients.updateById(client.id, data)
                  }
                />
              </Form.Item>
            </Row>
          </Col>
        </Row>

        <Divider />

        <Row>
          <Row>
            <Col span={11}>
              <Title level={4}>Billing Address</Title>
              {/* <MailingAddressForm title="Billing Address" requireContact /> */}
            </Col>

            <Col offset={2} span={11}>
              <Title level={4}>Shipping Address</Title>
              {/* <PhysicalAddressForm
                title="Shipping Address"
                useCopyAddressbtn={false}
                requireContact
              /> */}
            </Col>
          </Row>

          <Col span={11} style={footerStyle}>
            <Alert
              type="warning"
              message="Changing the billing address will change the information in the client file."
            />
          </Col>

          <Col offset={2} span={11} style={footerStyle}>
            <Alert
              type="warning"
              message="You may change the shipping address independently for each job. This will not change the client file."
            />
          </Col>
        </Row>
      </Form>
    </>
  );
}
