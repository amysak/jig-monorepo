import { FormInput, FormSelect, Row } from "@jigbid/ui";
import { Form } from "antd";

import {
  ACTIVE_INACTIVE_STATUSES_OPTIONS,
  TRIM_MOLDING_CLASSIFICATIONS_OPTIONS,
} from "../../../utilities/constants";

interface TrimMoldingFilterRowProps {
  subclassifications: any[];
}

function TrimMoldingFilterRow({
  subclassifications,
}: TrimMoldingFilterRowProps) {
  return (
    <Row className="cabinets-filter-row">
      <FormSelect
        options={TRIM_MOLDING_CLASSIFICATIONS_OPTIONS}
        name="classification"
        select={{
          allowClear: true,
          placeholder: "Classification",
          style: { minWidth: "200px" },
        }}
      />

      <Form.Item shouldUpdate>
        {(form) => {
          const classification = form.getFieldValue("classification");
          const placeholder =
            !classification && !subclassifications?.length
              ? "Select a Classification first"
              : "Subclassification";

          return (
            <FormSelect
              options={subclassifications}
              name="subclassification"
              select={{
                allowClear: true,
                placeholder: "Classification",
                style: { minWidth: "200px" },
              }}
            />
          );
        }}
      </Form.Item>

      <FormInput
        name="name"
        input={{
          placeholder: "Name",
          style: { minWidth: "300px" },
        }}
      />

      <FormSelect
        options={ACTIVE_INACTIVE_STATUSES_OPTIONS}
        name="status"
        select={{
          allowClear: true,
          placeholder: "Status",
          style: { minWidth: "200px" },
        }}
      />
    </Row>
  );
}

export default function TrimMoldingList() {
  // const [form] = Form.useForm();
  // const [loading, setLoading] = useState(false);
  // const [subclassifications, setSubcassifications] = useState([]);
  // const [trims, setTrims] = useState<TGetTrimsData>([[], 0]);
  // const [filters, setFilters] = useFilter("trim-moldings", {
  //   pageSize: 20,
  //   current: 1,
  // });
  // const getSubclassification = async (filters: { classification?: any }) => {
  //   try {
  //     let subclassifications = [];
  //     if (filters.classification) {
  //       const query = getQueryString(filters);
  //       subclassifications = await getTrimMoldingSublassifications(query);
  //     } else {
  //       setFilters({ ...filters, subclassification: null });
  //       form.resetFields();
  //     }
  //     setSubcassifications(subclassifications);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const getTrimsData = async (queryFilters = filters) => {
  //   try {
  //     setLoading(true);
  //     const query = getQueryString(queryFilters);
  //     const trims = await getTrims(query);
  //     setFilters(queryFilters);
  //     setTrims(trims);
  //     getSubclassification(queryFilters);
  //   } catch (error) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   getTrimsData();
  // }, []);
  // const onRowChange = async (value: string, row: { id: any }, key: string) => {
  //   try {
  //     setLoading(true);
  //     const payload = { [key]: value };
  //     await updateTrimMolding(row.id, payload);
  //     const updatedTrims = trims[0].map((trim: { id: any }) => {
  //       if (trim.id === row.id) {
  //         return { ...trim, ...payload };
  //       }
  //       return trim;
  //     });
  //     setTrims([updatedTrims, trims[1]] as TGetTrimsData);
  //     message.success("Status updated!");
  //   } catch (error) {
  //     message.error("Failed to update status!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const onPaginate = (config: { pageSize: number; current: number }) => {
  //   const queryFilters = { ...filters, ...api.paginateObj(config) };
  //   getTrimsData(queryFilters);
  // };
  // const onValuesChange = () => {
  //   getTrimsData({
  //     ...defaultPagination,
  //     ...form.getFieldsValue(),
  //   });
  // };
  // const columns = [
  //   {
  //     title: "Name",
  //     key: "name",
  //     dataIndex: "name",
  //     render(name, row: { id: any }) {
  //       return (
  //         <Link to={`/cabinet-setup/trim-moldings/${row.id}`}>{name}</Link>
  //       );
  //     },
  //   },
  //   {
  //     title: "Classification",
  //     key: "classification",
  //     dataIndex: "classification",
  //   },
  //   {
  //     title: "Subclassification",
  //     key: "subclassification",
  //     dataIndex: "subclassification",
  //     render(subclassification: string) {
  //       return capitalize(subclassification);
  //     },
  //   },
  //   {
  //     title: "Description",
  //     key: "description",
  //     dataIndex: "description",
  //   },
  //   {
  //     title: "Status",
  //     key: "status",
  //     dataIndex: "status",
  //     render(currentStatus: string, row) {
  //       return (
  //         <Select
  //           onChange={(value) => onRowChange(value, row, "status")}
  //           value={currentStatus?.toLowerCase()}
  //           style={tableSelectStyle}
  //         >
  //           {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((status) => (
  //             <Select.Option key={shortId()} value={status.value}>
  //               {status.label}
  //             </Select.Option>
  //           ))}
  //         </Select>
  //       );
  //     },
  //   },
  // ];
  // return (
  //   <UILayout ToolbarContent={<PageHeader label="Trims/Moldings" />}>
  //     <Form
  //       initialValues={filters}
  //       form={form}
  //       onValuesChange={onValuesChange}
  //       layout="inline"
  //     >
  //       <TrimMoldingFilterRow subclassifications={subclassifications} />
  //     </Form>
  //     {/* @ts-ignore */}
  //     <Table
  //       columns={columns}
  //       dataSource={trims[0]}
  //       loading={loading}
  //       {...tableProps}
  //       title={() => (
  //         <PaginateTableMetaData data={trims} count={100} filters={filters} />
  //       )}
  //       // onChange={onPaginate}
  //       pagination={{
  //         total: trims[1],
  //         pageSize: filters.pageSize,
  //         size: "small",
  //         showSizeChanger: false,
  //         current: filters.current,
  //       }}
  //       className="pagewrapper__maincontent nomargin"
  //     />
  //   </UILayout>
  // );
}
