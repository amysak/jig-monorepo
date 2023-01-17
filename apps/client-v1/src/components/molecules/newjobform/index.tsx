import { Button, Form, Input, InputNumber, Row, Typography } from "antd";
import { createJob } from "features/job";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// TODO: Please remove this
import CreatableSelect from "react-select/creatable";
import { useAppDispatch } from "store/index";
import { getSubdivisions } from "../../../api/jobs";
interface NewJobFormProps {
  onClose: () => void;
}

const { Title } = Typography;
const layout = {
  wrapperCol: { span: 18 },
  labelCol: { span: 6 },
};

function NewJobForm({ onClose }: NewJobFormProps) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const params = useParams<{ id?: string }>();

  const [subdivisions, setSubdivisions] = useState([]);
  const [subdivision, setSubdivision] = useState("");

  const onFinish = async (payload) => {
    try {
      await dispatch(
        createJob({
          ...payload,
          subdivision,
          client: params.id,
        })
      );

      onClose();

      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  };

  const getSubdivisionsData = async () => {
    try {
      const subdivisions = await getSubdivisions();

      setSubdivisions(subdivisions);
    } catch (error) {
      console.log(error);
    }
  };

  const onCreateSubdivision = (subdivision) => {
    setSubdivision(subdivision);

    setSubdivisions([subdivision, ...subdivisions]);
  };

  const onChangeSubdivision = (subdivision) => {
    setSubdivision(subdivision.value);
  };

  useEffect(() => {
    getSubdivisionsData();
  }, []);

  return (
    <Form
      form={form}
      {...layout}
      onFinish={onFinish}
      style={{ height: "100%", width: "100%", minWidth: "600px" }}
    >
      <Title level={3} style={{ textAlign: "center" }}>
        Add a Job
      </Title>

      <Form.Item name="name" label="Job Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Subdivision">
        <CreatableSelect
          id="subdivision"
          value={{ label: subdivision, value: subdivision }}
          options={subdivisions.map((sub) => ({
            label: sub.subdivision,

            value: sub.subdivision,
          }))}
          onCreateOption={onCreateSubdivision}
          onChange={onChangeSubdivision}
        />
      </Form.Item>

      <Form.Item name="lot_number" label="Lot Number">
        <InputNumber />
      </Form.Item>

      <br />

      <Row justify="end">
        <Button size="small" htmlType="submit" className="jig-button">
          Add Job
        </Button>
      </Row>
    </Form>
  );
}

export default NewJobForm;
