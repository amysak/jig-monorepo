import { Col, Form, InputNumber, Radio, Select, Typography } from "antd";
import debounce from "lodash/debounce";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  createMarkup,
  getDefaultMarkups,
  getMarkup,
  updateMarkup,
} from "../../../api/markups";
import { inputNumberPercentProps } from "../../../utilities";

const { Title, Text } = Typography;

const layout = {
  wrapperCol: { span: 14 },
  labelCol: { span: 10 },
};

const tailLayout = {
  wrapperCol: { span: 24 },
};

export function MarkupForm() {
  const [form] = Form.useForm();
  const [markup, setMarkup] = useState(null);
  const [markups, setMarkups] = useState<any[]>([[]]);
  const params = useParams<{ id?: string }>();

  const getFormData = async () => {
    try {
      const markups = await getDefaultMarkups();

      setMarkups(markups[0]);
      const markup = await getMarkup(params.id);

      setMarkup(markup);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateMarkup = async (payload: {
    is_default: boolean;
    status: any;
  }) => {
    try {
      const markup = await createMarkup({
        ...payload,
        //@ts-ignore
        client: params.id,
      });

      setMarkup(markup);
    } catch (Error) {
      // eslint-disable-next-line no-undef
      console.error();
    }
  };

  const onValuesChange = debounce(
    async (value: { is_default: boolean; status: any }, _values) => {
      try {
        if (!markup) {
          return handleCreateMarkup(value);
        }

        await updateMarkup(markup.id, value);
      } catch (error) {
        console.error(error);
      }
    },
    1000
  );

  useEffect(() => {
    getFormData();
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [markup]);

  return (
    <Form
      form={form}
      {...layout}
      style={{ width: "100%" }}
      onValuesChange={onValuesChange}
      initialValues={markup}
    >
      <Col span={24}>
        <Title level={3}> Markups</Title>
        <Text>
          Select the Default Markups for this Client (enter percentages as
          decimals i.e, .25 = 25%)
        </Text>

        <Form.Item {...tailLayout} name="name">
          <Select style={{ width: "70%" }}>
            {markups.map((markup, key) => (
              //@ts-ignore
              <Select.Option value={markup.id} key={key}>
                {/*//@ts-ignore */}
                {markup.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Sales Commission %" name="sales_commission">
          {/*//@ts-ignore */}
          <InputNumber {...inputNumberPercentProps} />
        </Form.Item>

        <Form.Item label="Design Fee %" name="design_engineer_fee">
          {/*//@ts-ignore */}
          <InputNumber {...inputNumberPercentProps} />
        </Form.Item>

        <Form.Item
          label="Show design fee on Estimate"
          name="show_design_on_estimated_fee"
        >
          <Radio.Group>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Overhead Markup %" name="overhead_markup">
          {/*//@ts-ignore */}
          <InputNumber {...inputNumberPercentProps} />
        </Form.Item>

        <Form.Item label="Markup %" name="profit_markup">
          {/*//@ts-ignore */}
          <InputNumber {...inputNumberPercentProps} />
        </Form.Item>

        <Form.Item label="Additional">
          <Form.Item name="additional">
            {/*//@ts-ignore */}
            <InputNumber {...inputNumberPercentProps} />
          </Form.Item>

          <Form.Item name="additional_method">
            <Radio.Group>
              <Radio value="add">Add</Radio>
              <Radio value="subtract">Subtract</Radio>
            </Radio.Group>
          </Form.Item>
        </Form.Item>
      </Col>
    </Form>
  );
}
