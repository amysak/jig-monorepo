import { Col, Radio, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneCabinet } from "../../../api/cabinets";
import { getMarkup } from "../../../api/markups";
import { getTaxByEntity } from "../../../api/taxes";

const getLaborKey = (category) => {
  switch (category) {
    case "base":
      return "base_cabinet";
    default:
      break;
  }
};

export default function Overview() {
  const params = useParams<{ cabinetId?: string }>();
  const [loading, setLoading] = useState(false);
  const [cabinet, setCabinet] = useState({});

  // @ts-expect-error TS(2339): Property 'room' does not exist on type 'DefaultRoo... Remove this comment to see the full error message
  const room = useSelector((state) => state.room);

  // @ts-expect-error TS(2339): Property 'category' does not exist on type '{}'.
  const laborKey = getLaborKey(cabinet?.category?.toLowerCase());
  const [, setJobMarkup] = useState({});
  const [jobTax, setJobTax] = useState({});

  const getCabinet = async () => {
    try {
      setLoading(true);

      const cabinet = await getOneCabinet(params.cabinetId);

      setCabinet(cabinet);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getJobData = async (jobId) => {
    try {
      // TODO: getMarkupByJob
      const jobMarkup = await getMarkup(jobId);
      const jobTax = await getTaxByEntity("jobs", jobId);

      setJobMarkup(jobMarkup);
      setJobTax(jobTax);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    getCabinet();
  }, []);

  useEffect(() => {
    const jobId = room?.job?.id;

    if (jobId) {
      getJobData(jobId);
    }
  }, [room]);

  console.log({ jobTax });

  const columns = [
    {
      title: "",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "",
      key: "cost",
      dataIndex: "cost",
    },
    {
      title: "Total Costs",
      key: "total_cost",
      dataIndex: "total_cost",
    },
    {
      title: "With Markup",
      key: "with_markup",
      dataIndex: "with_markup",
    },
    {
      title: "Sales Tax",
      key: "sales_tax",
      dataIndex: "sales_tax",
    },
    {
      title: "With Tax",
      key: "with_tax",
      dataIndex: "with_tax",
    },
  ];

  const data = [
    {
      // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
      name: cabinet.name,
    },
    {
      cost: "Material Cost",

      // @ts-expect-error TS(2339): Property 'sales_tax_rate' does not exist on type '... Remove this comment to see the full error message
      sales_tax: jobTax.sales_tax_rate,
    },
    {
      cost: "Shop Labor Cost",

      total_cost: room.shop_labor?.[laborKey],

      // @ts-expect-error TS(2339): Property 'sales_tax_rate' does not exist on type '... Remove this comment to see the full error message
      sales_tax: jobTax.sales_tax_rate,
      with_tax: 1,
    },
    {
      cost: "Installation Labor Cost",

      total_cost: room.installation_labor?.[laborKey],

      // @ts-expect-error TS(2339): Property 'sales_tax_rate' does not exist on type '... Remove this comment to see the full error message
      sales_tax: jobTax.sales_tax_rate,
      with_tax: 1,
    },
    {
      cost: "Total Cabinet Cost",
    },
    {
      name: "Quantity per Cabinet (1)",
      cost: "Total Cost",
    },
    {
      name: "Totals for one cabinet",
      total_cost: "$2000",
      with_markup: "$2000",
      sales_tax: "$2000",
      with_tax: "$2000",
    },
  ];

  return (
    <Row>
      <Col span={4}>
        <Row>
          <Col span={12}>Finished Interior</Col>

          <Col span={12}>
            {/* @ts-expect-error TS(2339): Property 'interior' does not exist on type '{}'. */}
            <Radio.Group value={cabinet.interior}>
              <Radio value="finished">F</Radio>
              <Radio value="unfinished">U</Radio>
            </Radio.Group>
          </Col>

          <Col span={12}>Category</Col>
          <Col span={12}>Cabinet</Col>
          <Col span={12}>Style</Col>

          {/* @ts-expect-error TS(2339): Property 'style' does not exist on type '{}'. */}
          <Col span={12}>{cabinet?.style}</Col>
          <Col span={12}>Type</Col>

          {/* @ts-expect-error TS(2339): Property 'category' does not exist on type '{}'. */}
          <Col span={12}>{cabinet?.category}</Col>
        </Row>
      </Col>

      <Col span={20}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered={false}
          rowKey="id"
          loading={loading}
        />
      </Col>
    </Row>
  );
}
