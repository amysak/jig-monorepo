import debounce from "lodash/debounce";
import React, { useEffect } from "react";

import {
  Col,
  DatePicker,
  Form,
  FormItem,
  Input,
  Row,
  useForm,
} from "@jigbid/ui";
import { selectJob, updateJob } from "features/job";
import { useAppDispatch, useAppState } from "store/index";

const tailLayout = {
  wrapperCol: { span: 14 },
  labelCol: { span: 10 },
};

function SetupJobTabs() {
  const [form] = useForm();
  const { data: job } = useAppState(selectJob);
  const dispatch = useAppDispatch();

  const onChange = debounce(async (value, payload) => {
    try {
      dispatch(updateJob({ jobId: job.id.toString(), payload }));
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    form.resetFields();
  }, [job]);

  return (
    <Form form={form} initialValues={job} onValuesChange={onChange}>
      <Row className="bordered-row">
        <Col span={11}>
          <FormItem label="Job" name="name">
            <Input />
          </FormItem>
        </Col>
        <Col offset={1} span={12}>
          <FormItem {...tailLayout} label="Subdivision" name="subdivision">
            <Input />
          </FormItem>
        </Col>

        <Col span={11}>
          <FormItem
            {...tailLayout}
            label="Estimated Date"
            name="estimated_date"
          >
            <DatePicker style={{ width: "100%" }} />
          </FormItem>
        </Col>

        <Col offset={1} span={12}>
          <FormItem {...tailLayout} label="Proposed Date" name="proposed_date">
            <DatePicker style={{ width: "100%" }} />
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
}

export default SetupJobTabs;
