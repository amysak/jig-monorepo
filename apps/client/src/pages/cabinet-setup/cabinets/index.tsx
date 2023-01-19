import { CopyOutlined } from "@ant-design/icons";
import { Link, useMatch } from "@tanstack/react-location";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Col, Form, Row, Table, Tooltip, Typography } from "antd";

import { UILayout } from "components/layout";
import { useCabinetsPaginated } from "hooks/queries";
import { LocationGenerics } from "router";
import {
  Cabinet,
  CabinetType,
  CABINET_TYPE,
  DEFAULT_PAGE_SIZE,
} from "type-defs";

import { PageSkeleton } from "@jigbid/ui";
import type { ColumnsType } from "antd/es/table";
import { capitalize } from "lodash-es";
import { tableProps } from "../utils";

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

export const CabinetPage = (props: JSX.IntrinsicAttributes) => {
  const [form] = Form.useForm();

  const { search } = useMatch<LocationGenerics>();

  console.log("search => ", search);

  const queryClient = useQueryClient();

  const { data: cabinets, isLoading, error } = useCabinetsPaginated(search);

  console.log("cabinets => ", cabinets);

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (!cabinets) {
    return null;
  }

  // const onDuplicate = async (cabinetId) => {
  //   setLoading(true);

  //   try {
  //     const cabinet = await duplicateCabinetSetup({ cabinetId });

  //     navigate(`/cabinet-setup/cabinets/${cabinet.id}`);
  //   } catch {
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const onRowChange = async (value: boolean, row: { id: any }, key: string) => {
  //   try {
  //     setLoading(true);
  //     const payload = { [key]: value };

  //     await updateCabinet(row.id, payload);

  //     const updatedCabinets = cabinets[0].map((cabinet: { id: any }) => {
  //       if (cabinet.id === row.id) {
  //         return { ...cabinet, ...payload };
  //       }

  //       return cabinet;
  //     });

  //     setCabinets([updatedCabinets, cabinets[1]] as TGetSetupCabinets);
  //     message.success("Status updated!");
  //   } catch (error) {
  //     message.error("Failed to update status!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const onValuesChange = () => {
  //   queryClient.invalidateQueries(["cabinets", search]);
  // };

  const columns: ColumnsType<Cabinet> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
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

            <Col className="cabinet-dub-btn-wrapper">
              <Tooltip title="Duplicate Cabinet">
                <Button
                  // onClick={() => onDuplicate(row.id)}
                  className="cabinet-dub-btn"
                  icon={<CopyOutlined />}
                />
              </Tooltip>
            </Col>
          </Row>
        );
      },
    },
    // {
    //   key: "favourite",
    //   dataIndex: "favourite",
    //   title: <StarTwoTone />,
    //   render(favourite, row: { isCategory: any }) {
    //     if (row.isCategory) return null;

    //     const props = {
    //       // @ts-expect-error TS(2345): Argument of type '{ isCategory: any; }' is not ass... Remove this comment to see the full error message
    //       onClick: () => onRowChange(!favourite, row, "favourite"),
    //     };

    //     return favourite ? (
    //       <StarTwoTone
    //         twoToneColor="#00a6fb"
    //         // @ts-expect-error TS(2322): Type '{ onClick: () => Promise<void>; twoToneColor... Remove this comment to see the full error message
    //         fill="#00a6fb"
    //         {...props}
    //       />
    //     ) : (
    //       <StarOutlined {...props} />
    //     );
    //   },
    // },
    // {
    //   title: "Floor to Bottom of Upper",
    //   key: "floor_to_bottom_of_upper",
    //   dataIndex: "floor_to_bottom_of_upper",
    // },
    // {
    //   title: "Floor to Top of Cabinet",
    //   key: "cabinet_height",
    //   dataIndex: "cabinet_height",
    // },
    // {
    //   title: "Cabinet Height",
    //   key: "cabinet_height",
    //   dataIndex: "cabinet_height",
    // },
    // {
    //   title: "Toe Kick Height",
    //   key: "toe_kick_height",
    //   dataIndex: "toe_kick_height",
    // },
    // {
    //   title: "Cabinet Depth",
    //   key: "cabinet_depth",
    //   dataIndex: "cabinet_depth",
    // },
    // {
    //   title: "Qty Parts",
    //   key: "quantity_parts",
    //   dataIndex: "quantity_parts",
    // },
    // {
    //   title: "Stacked Height",
    //   key: "stacked_height",
    //   dataIndex: "stacked_height",
    // },
    // {
    //   title: "Cabinet Side Height",
    //   key: "cabinet_side_height",
    //   dataIndex: "cabinet_side_height",

    //   render(
    //     _,
    //     cabinet: {
    //       [x: string]: { base_style: string };
    //       isCategory?: any;
    //       cabinet_height?: any;
    //       toe_kick_height?: any;
    //       category?: any;
    //     }
    //   ) {
    //     if (cabinet.isCategory) return null;

    //     const { category } = cabinet;

    //     return cabinet?.[category]?.base_style === "standard"
    //       ? safeNum(cabinet.cabinet_height)
    //       : safeNum(cabinet.cabinet_height) - safeNum(cabinet.toe_kick_height);
    //   },
    // },
    // {
    //   title: "Cabinet Back Height",
    //   key: "cabinet_back_height",
    //   dataIndex: "cabinet_back_height",

    //   render(
    //     _,
    //     cabinet: {
    //       [x: string]: { base_style: string };
    //       isCategory?: any;
    //       cabinet_height?: any;
    //       toe_kick_height?: any;
    //       category?: any;
    //     }
    //   ) {
    //     if (cabinet.isCategory) return null;

    //     const { category } = cabinet;

    //     return cabinet?.[category]?.base_style !== "standard"
    //       ? safeNum(cabinet?.cabinet_height) - safeNum(cabinet?.toe_kick_height)
    //       : safeNum(cabinet?.cabinet_height);
    //   },
    // },
    // {
    //   title: "Filler Width",
    //   key: "filler_width",
    //   dataIndex: "filler_width",
    // },
    // {
    //   title: "Toe Bd Length",
    //   key: "toe_board_width",
    //   dataIndex: "toe_board_width",
    // },
    // {
    //   title: "End Panel Height",
    //   key: "end_panel_height",
    //   dataIndex: "end_panel_height",
    // },
    // {
    //   title: "Appliance Panel Height",
    //   key: "appliance_panel_height",
    //   dataIndex: "appliance_panel_height",
    // },
    // {
    //   title: "Wainscot Height",
    //   key: "wainscot_height",
    //   dataIndex: "wainscot_height",
    // },
    // {
    //   title: "Base Doors",
    //   key: "base_doors",
    //   dataIndex: "base_doors",
    // },
    // {
    //   title: "Upper Doors",
    //   key: "upper_doors",
    //   dataIndex: "upper_doors",
    // },
    // {
    //   title: "DF",
    //   key: "df",
    //   dataIndex: "df",
    // },
    // {
    //   title: "Drawers",
    //   key: "number_of_drawers",
    //   dataIndex: "number_of_drawers",
    // },
    // {
    //   title: "Trays",
    //   key: "number_of_rollout_trays",
    //   dataIndex: "number_of_rollout_trays",
    // },
    // {
    //   title: "Sides",
    //   key: "number_of_cabinet_sides",
    //   dataIndex: "number_of_cabinet_sides",

    //   render(
    //     _,
    //     cabinet: {
    //       [x: string]: { number_of_cabinet_sides: any };
    //       isCategory: any;
    //       // @ts-ignore
    //       category: string | number;
    //     }
    //   ) {
    //     if (cabinet.isCategory) return null;

    //     return cabinet[cabinet.category]?.number_of_cabinet_sides;
    //   },
    // },
    // {
    //   title: "Status",
    //   key: "status",
    //   dataIndex: "status",
    //   render(currentStatus: string, row: { isCategory: any }) {
    //     if (row.isCategory) return null;

    //     return (
    //       <Select
    //         style={{ width: "100px" }}
    //         onChange={(value) => onRowChange(value, row, "status")}
    //         value={currentStatus?.toLowerCase()}
    //       >
    //         {Object.values(RECORD_STATUS).map((status) => (
    //           <Select.Option key={nanoid()} value={status}>
    //             {capitalize(status)}
    //           </Select.Option>
    //         ))}
    //       </Select>
    //     );
    //   },
    // },
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
        pagination={{
          total: cabinets.count,
          pageSize: DEFAULT_PAGE_SIZE,
          size: "small",
          showSizeChanger: false,
          current: search.page,
        }}
        className="pagewrapper__maincontent nomargin"
      />
    </UILayout>
  );
};
export default CabinetPage;
