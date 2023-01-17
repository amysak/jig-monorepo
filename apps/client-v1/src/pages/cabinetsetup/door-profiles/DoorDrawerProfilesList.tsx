import { Form, Input, message, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";

import { api } from "api/Api";
import { Link } from "react-router-dom";
import { getDoorProfiles, TGetDoorProfilesData } from "../../../api/doors";
import { updateProfile } from "../../../api/profiles";
import { getVendors, TGetVendorsData } from "../../../api/vendors";
import PaginateTableMetaData from "../../../components/molecules/paginate-table-header";
import UILayout from "../../../components/templates/uilayout";
import useFilter from "../../../hooks/useFilter";
import {
  ACTIVE_INACTIVE_STATUSES_OPTIONS,
  DOOR_PROFILES_OPTIONS,
} from "../../../utilities/constants";
import { getQueryString, shortId } from "../../../utilities/utils";
import { defaultPagination, tableProps } from "../utils";
import { PageHeader } from "./components";

function DrawerProfileFilterRow() {
  const [vendors, setVendors] = useState<TGetVendorsData>([[], 0]);

  const getData = async () => {
    try {
      const vendors = await getVendors();

      setVendors(vendors);
    } catch {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Row justify="start" className="cabinets-filter-row">
      <Form.Item name="category">
        <Select style={{ minWidth: "200px" }} allowClear placeholder="Category">
          {DOOR_PROFILES_OPTIONS.map((option) => (
            <Select.Option value={option.value} key={shortId()}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="name" label="Name">
        <Input style={{ minWidth: "300px" }} />
      </Form.Item>

      <Form.Item name="vendor">
        <Select style={{ minWidth: "200px" }} allowClear placeholder="Vendor">
          {vendors[0].map((option: { id: any; name: any }) => (
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

export default function DoorDrawerProfilesList() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState<TGetDoorProfilesData>([[], 0]);
  const [filters, setFilters] = useFilter("profiles", {
    pageSize: 20,
    current: 1,
  });

  const getDoorProfilesData = async (queryFilters = filters) => {
    try {
      setLoading(true);

      const query = getQueryString(queryFilters);
      const profiles = await getDoorProfiles(query);

      setFilters(queryFilters);
      setProfiles(profiles);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onRowChange = async (value: string, row: { id: any }, key: string) => {
    try {
      setLoading(true);
      const payload = { [key]: value };

      await updateProfile(row.id, payload);

      const updatedProfiles = profiles[0].map((profile: { id: any }) => {
        if (profile.id === row.id) {
          return { ...profile, ...payload };
        }

        return profile;
      });

      setProfiles([updatedProfiles, profiles[1]] as TGetDoorProfilesData);
      message.success("Status updated!");
    } catch (error) {
      console.error(error);
      message.error("Failed to update status!");
    } finally {
      setLoading(false);
    }
  };

  const onPaginate = (config: { pageSize: number; current: number }) => {
    const queryFilters = { ...filters, ...api.paginateObj(config) };

    getDoorProfilesData(queryFilters);
  };

  const onValuesChange = () => {
    getDoorProfilesData({
      ...defaultPagination,
      ...form.getFieldsValue(),
    });
  };

  React.useEffect(() => {
    getDoorProfilesData();
  }, []);

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",

      render(name, row: { id: any }) {
        return (
          <Link to={`/cabinet-setup/door-drawer-profiles/${row.id}`}>
            {name}
          </Link>
        );
      },
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
    },
    {
      title: "Vendor",
      key: "vendor",
      dataIndex: "vendor",

      render(vendor: { name: any }) {
        return vendor?.name ?? "";
      },
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
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
        <DrawerProfileFilterRow />
      </Form>
      {/* @ts-ignore */}
      <Table
        title={() => (
          <PaginateTableMetaData
            data={profiles}
            count={100}
            filters={filters}
          />
        )}
        columns={columns}
        dataSource={profiles[0]}
        loading={loading}
        {...tableProps}
        onChange={onPaginate}
        pagination={{
          total: profiles[1],
          pageSize: filters.pageSize,
          size: "small",
          showSizeChanger: false,
          current: filters.current,
        }}
        className="pagewrapper__maincontent nomargin"
      />
    </UILayout>
  );
}
