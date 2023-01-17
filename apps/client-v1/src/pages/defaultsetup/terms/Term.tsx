import {
  Alert,
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import debounce from "lodash/debounce";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import UILayout from "../../../components/templates/uilayout";
import {
  ACTIVE_INACTIVE_STATUSES_OPTIONS,
  TERM_TYPES,
  TERM_TYPES_OPTIONS,
} from "../../../utilities/constants";
import {
  capitalize,
  setTableRowClass,
  shortId,
} from "../../../utilities/utils";

import {
  getDefaultTerms,
  getJustOneTerm,
  TGetDefaultTerms,
  updateTerms,
} from "../../../api/terms";
import { inputNumberPercentProps } from "../../../utilities";
import { PageHeader } from "./components";
import "./terms.scss";

function NetWithDiscount() {
  return (
    <>
      <Form.Item label="Discount %">
        <Input.Group compact>
          <Form.Item name="discount">
            {/* @ts-expect-error TS(2322): Type '{ min: number; max: number; formatter: (valu... Remove this comment to see the full error message */}
            <InputNumber {...inputNumberPercentProps} />
          </Form.Item>
          <Input style={{ width: "80%" }} disabled />
        </Input.Group>
      </Form.Item>

      <Form.Item label="Number of days that discount is available">
        <Input.Group compact>
          <Form.Item name="number_of_days_discount_is_available">
            <InputNumber />
          </Form.Item>
          <Input style={{ width: "80%" }} disabled />
        </Input.Group>
      </Form.Item>

      <Form.Item label="Number of days when the balance is due">
        <Input.Group compact>
          <Form.Item name="number_of_days_balance_is_due">
            <InputNumber />
          </Form.Item>
          <Input style={{ width: "80%" }} disabled />
        </Input.Group>
      </Form.Item>

      <Form.Item
        name="adjust_total"
        label="Adjust Total to compensate for discount amount"
      >
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        shouldUpdate
        label="These Terms for Estimates or Proposals will read as follows"
      >
        {(form) => {
          const discount = form.getFieldValue("discount") ?? 0;
          const discountDays =
            form.getFieldValue("number_of_days_discount_is_available") ?? 0;
          const dueDays =
            form.getFieldValue("number_of_days_balance_is_due") ?? 0;

          return `${discount}% discount may be taken if this invoice is paid within ${discountDays} days of delivery, net ${dueDays} days.`;
        }}
      </Form.Item>

      <Title level={4}>Optional</Title>
      <Form.Item
        name="customised_text"
        label="You may customize the text for these Terms by entering into the following field"
      >
        <Input.TextArea rows={4} />
      </Form.Item>
    </>
  );
}

function ThreePayment() {
  return (
    <>
      <Form.Item label="Enter the percentage of the first payment">
        <Input.Group compact>
          <Form.Item name="first_payment_percentage">
            {/* @ts-expect-error TS(2322): Type '{ min: number; max: number; formatter: (valu... Remove this comment to see the full error message */}
            <InputNumber {...inputNumberPercentProps} />
          </Form.Item>
          <Input style={{ width: "80%" }} disabled />
        </Input.Group>
      </Form.Item>

      <Form.Item label="Enter the percentage of the second payment">
        <Input.Group compact>
          <Form.Item name="second_payment_percentage">
            {/* @ts-expect-error TS(2322): Type '{ min: number; max: number; formatter: (valu... Remove this comment to see the full error message */}
            <InputNumber {...inputNumberPercentProps} />
          </Form.Item>
          <Input style={{ width: "80%" }} disabled />
        </Input.Group>
      </Form.Item>

      <Form.Item
        shouldUpdate
        label="These Terms for Estimates or Proposals will read as follows"
      >
        {(form) => {
          const firstPayment =
            form.getFieldValue("first_payment_percentage") ?? 0;
          const secondPayment =
            form.getFieldValue("second_payment_percentage") ?? 0;

          return `${firstPayment}% deposit required to place job into production schedule, ${secondPayment}% due upon delivery, ${secondPayment}% balance due upon completion.`;
        }}
      </Form.Item>

      <Title level={4}>Optional</Title>

      <Form.Item
        name="customised_text"
        label="You may customize the text for these Terms by entering into the following field"
      >
        <Input.TextArea
          rows={4}
          // @ts-expect-error TS(2322): Type '{ rows: number; help: string; }' is not assi... Remove this comment to see the full error message
          help="You must still enter the discount percentage above for calculation purposes."
        />
      </Form.Item>
    </>
  );
}

function TwoPayment() {
  return (
    <>
      <Form.Item label="Enter the percentage of the first payment">
        <Input.Group compact>
          <Form.Item name="first_payment_percentage">
            {/* @ts-expect-error TS(2322): Type '{ min: number; max: number; formatter: (valu... Remove this comment to see the full error message */}
            <InputNumber {...inputNumberPercentProps} />
          </Form.Item>
          <Input style={{ width: "80%" }} disabled />
        </Input.Group>
      </Form.Item>

      <Form.Item
        shouldUpdate
        label="These Terms for Estimates or Proposals will read as follows"
      >
        {(form) => {
          const value = form.getFieldValue("first_payment_percentage");

          return `${value}% deposit required to place job into production schedule, balance due prior to delivery.`;
        }}
      </Form.Item>

      <Title level={4}>Optional</Title>

      <Form.Item
        name="customised_text"
        help="You must still enter the discount percentage above for calculation purposes."
        label="You may customize the text for these Terms by entering into the following field"
      >
        <Input.TextArea rows={4} />
      </Form.Item>
    </>
  );
}

function NetNoDiscount() {
  return (
    <>
      <Form.Item
        name="number_of_days_balance_is_due"
        label="Number of days when the balance is due"
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item
        shouldUpdate
        label="These Terms for Estimates or Proposals will read as follows"
      >
        {(form) => {
          const days = form.getFieldValue("number_of_days_balance_is_due") ?? 0;

          return <Alert message={`Net ${days} days`} banner type="info" />;
        }}
      </Form.Item>

      <br />

      <Title level={4}>Optional</Title>

      <Form.Item
        name="customised_text"
        help="You must still enter the discount percentage above for calculation purposes."
        label="You may customize the text for these Terms by entering into the following field"
      >
        <Input.TextArea rows={4} />
      </Form.Item>
    </>
  );
}

function TermForm() {
  return (
    <>
      <Form.Item label="Term Name" name="name">
        <Input />
      </Form.Item>

      <Form.Item name="status" label="Status">
        <Select>
          {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((status) => (
            <Select.Option value={status.value} key={shortId()}>
              {status.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Term Type" name="term_type">
        <Select>
          {TERM_TYPES_OPTIONS.map((option) => (
            <Select.Option value={option.value} key={shortId()}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Enter the purpose of this set of terms and conditions."
        name="purpose_terms_and_conditions"
      >
        <Input.TextArea rows={6} />
      </Form.Item>
    </>
  );
}

const { Title } = Typography;
const formComponents = [
  NetNoDiscount,
  NetWithDiscount,
  ThreePayment,
  TwoPayment,
];

const subforms = TERM_TYPES.reduce((forms, label, index) => {
  forms[label] = formComponents[index];
  return forms;
}, {});

const cols = [
  {
    key: "name",
    dataIndex: "name",
  },
  {
    key: "term_type",
    dataIndex: "term_type",

    render(type: string) {
      return capitalize(type);
    },
  },
];

export default function Term() {
  const [form] = Form.useForm();
  const params = useParams<{ termId?: string }>();
  const navigate = useNavigate();
  const [estimateIsOpen, setEstimateIsOpen] = useState(false);
  const [proposalIsOpen, setProposalIsOpen] = useState(false);
  const [term, setTerm] = useState<{ name?: string; id?: string }>({});
  const [terms, setTerms] = useState<TGetDefaultTerms>();

  useEffect(() => {
    form.resetFields();
  }, [term]);

  const getTermData = async () => {
    try {
      const term = await getJustOneTerm(params.termId);

      setTerm(term);
    } catch (error) {
      console.log(error);
    }
  };

  const getTermsLists = async () => {
    try {
      const terms = await getDefaultTerms();

      setTerms(terms);
    } catch (error) {
      console.log(error);
    }
  };

  const onValuesChange = debounce(
    async (value, values: { is_default: boolean; status: any }) => {
      try {
        console.log(value);

        // await updateTerms(params.termId, values);

        toast.success("Updated.");
      } catch (error) {
        toast.error("Failed to update.");
        console.log(error);
      }
    },
    1000
  );

  useEffect(() => {
    getTermData();
    getTermsLists();
  }, []);

  const onRowClick = (row: { id: any }) => {
    navigate(`/default-setup/terms/${row.id}`);
  };

  return (
    <UILayout
      ToolbarContent={
        <PageHeader
          allowAlter
          label={term?.name}
          parent={{ label: "Terms", path: "/terms" }}
        />
      }
    >
      <Row className="pagewrapper">
        <Col span={6}>
          <div className="pagewrapper__leftside">
            <Title level={4}>Terms Options</Title>

            <Table
              columns={cols}
              dataSource={terms?.[0] ?? []}
              pagination={false}
              showHeader={false}
              rowKey="id"
              className="clickable-table-row"
              rowClassName={setTableRowClass(term.id)}
              size="small"
              onRow={(record) => {
                return {
                  onClick: () => onRowClick(record),
                };
              }}
            />
          </div>
        </Col>

        <Col
          xs={18}
          md={10}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="pagewrapper__maincontent">
            <Form
              form={form}
              onValuesChange={onValuesChange}
              initialValues={term}
              layout="vertical"
            >
              <Row justify="end">
                <Button
                  className="jig-button"
                  onClick={() => setEstimateIsOpen(true)}
                >
                  Estimate Conditions
                </Button>
                <Button
                  className="jig-button"
                  onClick={() => setProposalIsOpen(true)}
                >
                  Proposal Conditions
                </Button>
              </Row>

              <Modal
                footer={null}
                visible={estimateIsOpen}
                title="Estimate Conditions"
                onCancel={() => setEstimateIsOpen(false)}
              >
                <Form.Item name="estimate_conditions">
                  <Input.TextArea autoSize={{ minRows: 8, maxRows: 16 }} />
                </Form.Item>
              </Modal>

              <Modal
                footer={null}
                visible={proposalIsOpen}
                title="Proposal Conditions"
                onCancel={() => setProposalIsOpen(false)}
              >
                <Form.Item name="proposal_conditions">
                  <Input.TextArea autoSize={{ minRows: 8, maxRows: 16 }} />
                </Form.Item>
              </Modal>

              <TermForm />

              <Divider />

              <Form.Item shouldUpdate>
                {() => {
                  const termType = form.getFieldValue("term_type");

                  const SubForm = subforms[termType?.toLowerCase()];

                  return SubForm ? <SubForm /> : null;
                }}
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </UILayout>
  );
}
