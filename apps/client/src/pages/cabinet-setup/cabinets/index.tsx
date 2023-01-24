import {
  CopyOutlined,
  DeleteOutlined,
  StarOutlined,
  StarTwoTone,
} from "@ant-design/icons";
import { Link, useSearch } from "@tanstack/react-location";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Col, Row, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { capitalize } from "lodash-es";

import { PageSkeleton } from "@jigbid/ui";
import { api } from "api";
import { UILayout } from "components/layout";
import { useSetSearch } from "hooks";
import {
  useCabinetDeletion,
  useCabinetMutation,
  useCabinetsPaginated,
} from "hooks/queries";
import { LocationGenerics } from "router";
import {
  Cabinet,
  CabinetSpecifications,
  CabinetType,
  CABINET_TYPE,
  WithCountDto,
} from "type-defs";

import { tableProps } from "../utils";

import "./cabinet.scss";

// const isMeasured = (category: string) =>
//     ['base', 'upper', 'tall', 'vanity'].includes(
//         category?.toLowerCase()?.replace(/ +(?= )/g, '')
//     )

// const isPanel = (category: string) =>
//     ['appliance panel', 'end panel', 'wainscot panel'].includes(
//         category?.toLowerCase()?.replace(/ +(?= )/g, '')
//     )

// const isFiller = (category: string) =>
//     ['filler'].includes(category?.toLowerCase()?.replace(/ +(?= )/g, ''))

// const isToeBoardOrToeSkin = (category: string) =>
//     ['toe board', 'toe skin'].includes(
//         category?.toLowerCase()?.replace(/ +(?= )/g, '')
//     )

// const isPlatform = (category: string) =>
//     ['toe platform'].includes(category?.toLowerCase()?.replace(/ +(?= )/g, ''))

const { Title } = Typography;

// function CabinetsFilterRow() {
//   return (
//     <Row className="cabinets-filter-row">
//       <Form.Item name="category">
//         <Select style={{ minWidth: "200px" }} allowClear placeholder="Category">
//           {CABINET_PARTS_GROUPED.map((options) => (
//             <Select.OptGroup key={shortId()} label={<Divider className="x5" />}>
//               {options.map((option) => (
//                 <Select.Option value={option} key={shortId()}>
//                   {capitalize(option)}
//                 </Select.Option>
//               ))}
//             </Select.OptGroup>
//           ))}
//         </Select>
//       </Form.Item>

//       <Form.Item name="name">
//         <Input style={{ minWidth: "300px" }} placeholder="Name" />
//       </Form.Item>

//       <Form.Item name="style">
//         <Select style={{ minWidth: "200px" }} allowClear placeholder="Style">
//           {["full access", "face frame"].map((option) => (
//             <Select.Option key={shortId()} value={option}>
//               {capitalize(option)}
//             </Select.Option>
//           ))}
//         </Select>
//       </Form.Item>

//       <Form.Item name="status">
//         <Select style={{ minWidth: "200px" }} allowClear placeholder="Status">
//           {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((option) => (
//             <Select.Option key={shortId()} value={option.value}>
//               {option.label}
//             </Select.Option>
//           ))}
//         </Select>
//       </Form.Item>
//     </Row>
//   );
// }

// TODO: Allow user to choose quantity
const CABINETS_LIMIT = 30;

export const CabinetsPage = () => {
  const search = useSearch<LocationGenerics>();
  const [setSearch] = useSetSearch();

  const queryClient = useQueryClient();

  const { data: cabinets, isLoading } = useCabinetsPaginated(
    { ...search, pagination: { ...search.pagination, limit: CABINETS_LIMIT } },
    {
      keepPreviousData: true,
    }
  );

  const { mutateAsync: mutateCabinetAsync } = useCabinetMutation();

  const { mutateAsync: deleteCabinetAsync } = useCabinetDeletion();

  // TODO: can be omitted like in jobs, prefetch with react-location
  if (isLoading) {
    return <PageSkeleton />;
  }

  if (!cabinets) {
    return null;
  }

  const columns: ColumnsType<Cabinet> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      width: "20%",
      render(cabinetName: string, row: { id: number }) {
        if (Object.values(CABINET_TYPE).includes(cabinetName as CabinetType)) {
          return <Title level={4}>{capitalize(cabinetName)}</Title>;
        }

        return (
          <Row
            justify="space-between"
            align="middle"
            className="cabinet-list-name-col"
          >
            <Col>
              <Link to={`/cabinet-setup/cabinets/${row.id}`}>
                {cabinetName}
              </Link>
            </Col>

            {/* <Col className="cabinet-dub-btn-wrapper">
              <Tooltip title="Duplicate Cabinet">
                <Button
                  onClick={() => duplicateCabinet(row)}
                  className="cabinet-dub-btn"
                  icon={<CopyOutlined />}
                />
              </Tooltip>
            </Col> */}
          </Row>
        );
      },
    },
    {
      key: "favourite",
      dataIndex: "favourite",
      title: <StarTwoTone />,
      width: "3%",
      render(favourite: boolean, row) {
        const handleClick = async () => {
          await mutateCabinetAsync({
            id: row.id,
            values: {
              favourite: !favourite,
            },
          });
          await queryClient.invalidateQueries(["cabinets", search]);
        };

        if (favourite) {
          return <StarTwoTone twoToneColor="#00a6fb" onClick={handleClick} />;
        }

        return <StarOutlined onClick={handleClick} />;
      },
    },
    {
      key: "type",
      dataIndex: "type",
      title: "Type",
      width: "7%",
      filters: Object.values(CABINET_TYPE).map((type) => ({
        text: capitalize(type),
        value: type,
      })),
      filteredValue: search.filters?.type,
      render: (type: CabinetType) => <Tag className="type-tag">{type}</Tag>,
    },
    {
      key: "style",
      dataIndex: "specifications",
      title: "Style",
      width: "10%",
      render: (specifications: CabinetSpecifications) => (
        <Tag className="style-tag">
          {specifications.isFramed ? "Face Frame" : "Full Access"}
        </Tag>
      ),
    },
    {
      key: "dimensions",
      title: "Cabinet Dimensions",
      width: "17%",
      children: [
        {
          dataIndex: "specifications",
          title: "Height",
          render: (specifications: CabinetSpecifications) =>
            specifications.dimensions.height,
        },
        {
          key: "depth",
          dataIndex: "specifications",
          title: "Depth",
          render: (specifications: CabinetSpecifications) =>
            specifications.dimensions.depth,
        },
        {
          key: "elevation",
          dataIndex: "specifications",
          title: "Elevation",
          render: (specifications: CabinetSpecifications) =>
            specifications.dimensions.elevation,
        },
        {
          key: "toeKickHeight",
          dataIndex: "specifications",
          title: "Toe Kick Height",
          render: (specifications: CabinetSpecifications) =>
            specifications.dimensions.toeKickHeight,
        },
      ],
    },
    {
      title: "Required Parts",
      width: "17%",
      children: [
        {
          key: "doorCount",
          dataIndex: "specifications",
          title: "Door Count",
          render: (specifications: CabinetSpecifications) =>
            specifications.partCounts.doors,
        },
        {
          key: "drawerCount",
          dataIndex: "specifications",
          title: "Drawers",
          render: (specifications: CabinetSpecifications) =>
            specifications.partCounts.drawers,
        },
        {
          key: "drawerFrontCount",
          dataIndex: "specifications",
          title: "Drawer Fronts",
          render: (specifications: CabinetSpecifications) =>
            specifications.partCounts.drawerFronts,
        },
        {
          key: "trayCount",
          dataIndex: "specifications",
          title: "Tray Count",
          render: (specifications: CabinetSpecifications) =>
            specifications.partCounts.trays,
        },
      ],
    },
    {
      key: "sideCount",
      dataIndex: "specifications",
      title: "Side Count",
      width: "5%",
      render: (specifications: CabinetSpecifications) =>
        specifications.partCounts.sides,
    },
    {
      title: "Actions",
      key: "actions",
      width: "20%",
      render: (_, row) => (
        <Space size="middle">
          <DeleteOutlined
            className="actions-icon"
            onClick={async () => {
              await deleteCabinetAsync(row.id);
              await queryClient.invalidateQueries(["cabinets", search]);
            }}
          />
          <CopyOutlined
            className="actions-icon"
            onClick={() => {
              const { id: _, ...rest } = row;
              api.cabinets.create(rest);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <UILayout>
      {/* <Form
        initialValues={filters}
        form={form}
        onValuesChange={onValuesChange}
        layout="inline"
      >
        <CabinetsFilterRow />
      </Form> */}

      <Table
        columns={columns}
        loading={isLoading}
        dataSource={cabinets.data}
        {...tableProps}
        onChange={(pagination, filters) => {
          setSearch({
            pagination: {
              page: pagination.current,
            },
            filters,
          });
        }}
        pagination={{
          // onChange: (page) => setSearch({ page }),
          total: cabinets.count,
          pageSize: CABINETS_LIMIT,
          size: "small",
          showSizeChanger: false,
          current: search.pagination?.page,
        }}
        className="pagewrapper__maincontent nomargin"
      />
    </UILayout>
  );
};
export default CabinetsPage;
