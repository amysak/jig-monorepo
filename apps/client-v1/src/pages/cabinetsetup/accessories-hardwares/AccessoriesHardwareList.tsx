import { Form, Input, message, Row, Select, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { api } from "api/Api";
import {
  getAccessoryClassification,
  getDefaultAccessories,
  updateAccessory,
} from "../../../api/accessories";
import PaginateTableMetaData from "../../../components/molecules/paginate-table-header";
import { tableSelectStyle } from "../../../components/molecules/roomtabs/utils";
import UILayout from "../../../components/templates/uilayout";
import useFilter from "../../../hooks/useFilter";
import {
  ACTIVE_INACTIVE_STATUSES_OPTIONS,
  HARDWARE_CATEGORIES_OPTIONS,
} from "../../../utilities/constants";
import {
  calcDiscountSalePrice,
  capitalize,
  getQueryString,
  safeNum,
  shortId,
} from "../../../utilities/utils";
import { defaultPagination, tableProps } from "../utils";
import { PageHeader } from "./components";

const { Paragraph, Text } = Typography;

type ITableProps = typeof tableProps & {
  size: "small";
};

function AccessoriesFilterRow() {
  const [classifications, setCassifications] = useState([]);

  const getData = async () => {
    try {
      const classifications = await getAccessoryClassification();

      setCassifications(classifications);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Row className="cabinets-filter-row">
      <Form.Item name="category">
        <Select style={{ minWidth: "200px" }} allowClear placeholder="Category">
          {HARDWARE_CATEGORIES_OPTIONS.map((option) => (
            <Select.Option value={option.value} key={shortId()}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="classification">
        <Select
          style={{ minWidth: "200px" }}
          allowClear
          placeholder="Classifications"
        >
          {classifications.map((option) => (
            <Select.Option key={shortId()} value={option.name}>
              {option.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="name">
        <Input style={{ minWidth: "300px" }} placeholder="Name" />
      </Form.Item>

      <Form.Item name="status">
        <Select style={{ minWidth: "200px" }} allowClear placeholder="Status">
          {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((option) => (
            <Select.Option key={shortId()} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Row>
  );
}

export default function AccessoriesHardwareList() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [accessories, setAccessories] = useState<[Array<any>, number]>([[], 0]);
  const [filters, setFilters] = useFilter("accessories-hardwares", {
    pageSize: 20,
    current: 1,
  });

  const getAccessoriesData = async (queryFilters = filters) => {
    try {
      setLoading(true);

      const query = getQueryString(queryFilters);
      const accessories = await getDefaultAccessories(query);

      setFilters(queryFilters);
      setAccessories(accessories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getAccessoriesData();
  }, []);

  const onRowChange = async (value: string, row: { id: any }, key: string) => {
    try {
      setLoading(true);
      const payload = { [key]: value };

      await updateAccessory(row.id, payload);

      const updatedAccessories = accessories[0].map(
        (accessory: { id: any }) => {
          if (accessory.id === row.id) {
            return { ...accessory, ...payload };
          }

          return accessory;
        }
      );

      setAccessories([updatedAccessories, accessories[1]]);
      message.success("Status updated!");
    } catch (error) {
      message.error("Failed to update status!");
    } finally {
      setLoading(false);
    }
  };

  const onPaginate = (config: { pageSize: number; current: number }) => {
    const queryFilters = { ...filters, ...api.paginateObj(config) };

    getAccessoriesData(queryFilters);
  };

  const onValuesChange = () => {
    getAccessoriesData({
      ...defaultPagination,
      ...form.getFieldsValue(),
    });
  };

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",

      render(name, row: { id: any }) {
        return (
          <Link to={`/cabinet-setup/accessories-hardwares/${row.id}`}>
            {name || "Missing name"}
          </Link>
        );
      },
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",

      render(value: string) {
        return capitalize(value);
      },
    },
    {
      title: "Classification",
      key: "classification",
      dataIndex: "classification",

      render(classification: { name: any }) {
        return classification?.name;
      },
    },
    {
      title: "Unit of Measure",
      key: "unit_of_measurement",
      dataIndex: "unit_of_measurement",
    },
    {
      title: "Material Cost",
      key: "material_cost",
      dataIndex: "material_cost",
    },
    {
      title: "Supplier Discount %",
      key: "supplier_discount",
      dataIndex: "supplier_discount",
    },
    {
      title: "Discounted Material Cost",
      key: "discounted_material_cost",
      dataIndex: "discounted_material_cost",

      render(_, row: { published_material_cost: any }) {
        const materialCost = safeNum(row.published_material_cost);
        //@ts-ignore
        const supplierDiscount = safeNum(form.supplier_discount);
        const discountedMatCost = calcDiscountSalePrice(
          materialCost,
          supplierDiscount
        );

        return `$${discountedMatCost}`;
      },
    },
    {
      title: "Shop Labor Cost",
      key: "shop_labor_cost",
      dataIndex: "shop_labor_cost",
    },
    {
      title: "Installation Labor Cost",
      key: "installation_labor_cost",
      dataIndex: "installation_labor_cost",
    },
    {
      title: "Time",
      key: "time",
      dataIndex: "time",
    },
    {
      title: "Report",
      key: "show_on_reports",
      dataIndex: "show_on_reports",

      render(report) {
        return report ? "Yes" : "No";
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",

      render(currentStatus: string, row) {
        return (
          <Select
            onChange={(value) => onRowChange(value, row, "status")}
            value={currentStatus.toLowerCase()}
            style={tableSelectStyle}
          >
            {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((status) => (
              <Select.Option key={shortId()} value={status.value}>
                {status.label}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
  ];

  return (
    <UILayout ToolbarContent={<PageHeader label="Hardwares/Accessories" />}>
      <Form
        initialValues={filters}
        form={form}
        onValuesChange={onValuesChange}
        layout="inline"
      >
        {/* @ts-expect-error TS(2322): Type '{ getAccessoriesData: (queryFilters?: any) =... Remove this comment to see the full error message */}
        <AccessoriesFilterRow getAccessoriesData={getAccessoriesData} />
      </Form>

      <Table
        columns={columns}
        dataSource={accessories[0]}
        loading={loading}
        {...(tableProps as ITableProps)}
        title={() => (
          <PaginateTableMetaData
            data={accessories}
            count={100}
            filters={filters}
          />
        )}
        onChange={onPaginate}
        pagination={{
          total: accessories[1],
          pageSize: filters.pageSize,
          size: "small",
          showSizeChanger: false,
          current: filters.current,
        }}
        expandable={{
          expandedRowRender: (record) => (
            <Paragraph style={{ margin: 0 }}>
              <Text strong>Description:</Text>
              <Text> {record.description}</Text>
            </Paragraph>
          ),
          rowExpandable: (record) => !!record.description,
        }}
        className="pagewrapper__maincontent nomargin"
      />
    </UILayout>
  );
}
