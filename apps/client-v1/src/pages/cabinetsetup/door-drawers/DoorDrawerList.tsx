import { Form, message, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import {
  getDoorsDrawers,
  TGetDoorsDrawersData,
  updateOne,
} from "../../../api/doors";
import { getMaterialTypes } from "../../../api/material-types";
import PaginateTableMetaData from "../../../components/molecules/paginate-table-header";
import UILayout from "../../../components/templates/uilayout";
import useFilter from "../../../hooks/useFilter";
import {
  ACTIVE_INACTIVE_STATUSES_OPTIONS,
  DRAWER_CATEGORIES_OPTIONS,
} from "../../../utilities/constants";
import { capitalize, getQueryString, shortId } from "../../../utilities/utils";
import { defaultPagination, tableProps } from "../utils";
import { PageHeader } from "./components";

function DrawerFilterRow() {
  const [materialTypes, setMaterialTypes] = useState<[Array<any>, number]>([
    [],
    0,
  ]);

  const getData = async () => {
    try {
      const materialTypes = await getMaterialTypes();

      setMaterialTypes(materialTypes);
    } catch {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Row className="cabinets-filter-row">
      <Form.Item name="category">
        <Select style={{ minWidth: "200px" }} allowClear placeholder="Category">
          {DRAWER_CATEGORIES_OPTIONS.map((option) => (
            <Select.Option value={option.value} key={shortId()}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="type">
        <Select
          style={{ minWidth: "200px" }}
          allowClear
          placeholder="Material Type"
        >
          {materialTypes[0].map((option: { id: any; name: any }) => (
            <Select.Option key={shortId()} value={option.id}>
              {option.name}
            </Select.Option>
          ))}
        </Select>
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

export default function DoorDrawerList() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [doors, setDoors] = useState<TGetDoorsDrawersData>([[], 0]);
  const [filters, setFilters] = useFilter("door-drawers", {
    pageSize: 20,
    current: 1,
  });

  async function getAllDoorDrawers(queryFilters = filters) {
    try {
      setLoading(true);

      const query = getQueryString(queryFilters);
      const doors = await getDoorsDrawers(query);

      setFilters(queryFilters);
      setDoors(doors);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const onRowChange = async (value: string, row: { id: any }, key: string) => {
    try {
      setLoading(true);
      const payload = { [key]: value };

      await updateOne(row.id, payload);

      const updatedDoors = doors[0].map((door: { id: any }) => {
        if (door.id === row.id) {
          return { ...door, ...payload };
        }

        return door;
      });

      setDoors([updatedDoors, doors[1]] as TGetDoorsDrawersData);
      message.success("Status updated!");
    } catch (error) {
      message.error("Failed to update status!");
    } finally {
      setLoading(false);
    }
  };

  const onPaginate = () => {
    // @ts-expect-error TS(2304): Cannot find name 'api'.
    // eslint-disable-next-line no-undef
    const queryFilters = { ...filters, ...api.paginateObj(config) };

    getAllDoorDrawers(queryFilters);
  };

  const onValuesChange = () => {
    getAllDoorDrawers({
      ...defaultPagination,
      ...form.getFieldsValue(),
    });
  };

  React.useEffect(() => {
    getAllDoorDrawers();
  }, []);

  const columns = [
    {
      title: "Model Name",
      key: "name",
      dataIndex: "name",

      render(name, row: { id: any }) {
        return (
          <Link to={`/cabinet-setup/door-drawers/${row.id}`}>
            {name || "Missing name"}
          </Link>
        );
      },
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",

      render(category: string) {
        return capitalize(category);
      },
    },
    {
      title: "Material Type",
      key: "material_type",
      dataIndex: "material_type",

      render(materialType: { name: any }) {
        return materialType?.name;
      },
    },
    {
      title: "Vendor",
      key: "vendor",
      dataIndex: "vendor",
    },
    {
      title: "Total outsourced cost",
      key: "outsourced_cost",
      dataIndex: "outsourced_cost",
    },
    {
      title: "Supplier Discount",
      key: "discount_percentage",
      dataIndex: "discount_percentage",
    },
    {
      title: "Discounted Cost",
      key: "discount_cost",
      dataIndex: "discount_cost",
    },
    {
      title: "In-house Labor Cost",
      key: "in_house_labor_cost",
      dataIndex: "in_house_labor_cost",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",

      render(currentStatus: string, row) {
        return (
          <Select
            onChange={(value) => onRowChange(value, row, "status")}
            value={currentStatus?.toLowerCase()}
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
    <UILayout ToolbarContent={<PageHeader />}>
      <Form
        initialValues={filters}
        form={form}
        onValuesChange={onValuesChange}
        layout="inline"
      >
        {/* @ts-expect-error TS(2322): Type '{ onFilter: (queryFilters?: any) => Promise<... Remove this comment to see the full error message */}
        <DrawerFilterRow onFilter={getAllDoorDrawers} />
      </Form>
      {/* @ts-ignore */}
      <Table
        columns={columns}
        dataSource={doors[0]}
        loading={loading}
        {...tableProps}
        title={() => (
          <PaginateTableMetaData data={doors} count={100} filters={filters} />
        )}
        onChange={onPaginate}
        pagination={{
          total: doors[1],
          pageSize: 20,
          size: "small",
          showSizeChanger: false,
          current: filters.current,
        }}
        className="pagewrapper__maincontent nomargin"
      />
    </UILayout>
  );
}
