import {
  Alert,
  Checkbox,
  Col,
  Divider,
  Form,
  InputNumber,
  message,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import { select as d3Select } from "d3";
import debounce from "lodash/debounce";
import React, { useContext, useRef } from "react";

import CabinetPNG from "../../../../assets/images/cabinets/Base_Vanity.png";

import { useParams } from "react-router-dom";
import { CABINET_POSITION_METHODS_OPTIONS } from "../../../../utilities/constants";
import {
  polyPoints,
  safeNum,
  shortId,
  toFixed,
} from "../../../../utilities/utils";

import { CabinetContext } from "../../../../store/cabinets";
import {
  inputNumberProps,
  inputNumberPropsNoDecimal,
} from "../../../../utilities";
import "../../../defaultsetup/cabinet-specification/style.scss";

const { Title } = Typography;
const formLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

const numList = [0, 1, 2];

const inputNoDecProps = {
  ...inputNumberPropsNoDecimal,
  style: {
    width: "70%",
  },
};

const inputProps = {
  ...inputNumberProps,
  style: {
    width: "70px",
  },
};

function SideCLearanceLabel() {
  return (
    <p>
      Side Width Clearance
      <br />
      (total for both sides)
    </p>
  );
}

export default function CabinetSpecifications() {
  const [form] = Form.useForm();
  const cabinetCtx = useContext(CabinetContext);
  const params = useParams<{ id?: string }>();

  const { cabinet } = cabinetCtx;
  const ref = useRef();

  const onValuesChange = debounce(async (value, values) => {
    try {
      await cabinetCtx.onUpdateCabinet(params.id, values, false);

      message.success("Updated successfully.");
    } catch (error) {
      console.log(error);
      message.error("Update failed.");
    } finally {
    }
  }, 1000);

  React.useEffect(() => {
    const canvas = d3Select(ref.current)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%");

    canvas
      .append("image")
      .attr("xlink:href", CabinetPNG)
      .attr("width", "80%")
      .attr("height", "80%")
      .attr("x", "10%")
      .attr("y", "10%");

    // letfStart, topStart, leftEnd, topEnd

    // @ts-ignore
    polyPoints(canvas, []);
  }, []);

  React.useEffect(() => form.resetFields(), [cabinet]);

  return (
    <Form
      form={form}
      initialValues={cabinet}
      onValuesChange={onValuesChange}
      {...formLayout}
      className="cabinetspecification"
    >
      <Row className="">
        <Col span={7}>
          <Title level={4}>Top</Title>

          <Form.Item
            label="Include Top"
            name="include_top"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>

          <Form.Item
            label="# of Finished Sides"
            name={["number_of_top_finished_sides"]}
          >
            <Select style={{ width: "70px" }}>
              {numList.map((value) => {
                return (
                  <Select.Option key={`${value}`} value={value}>
                    {value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item label="Cabinet Depth">{cabinet?.cabinet_depth}</Form.Item>
          <Form.Item name={["depth_difference_top"]} label="Difference">
            <InputNumber {...inputProps} />
          </Form.Item>
          <Divider className="measurement" />

          <Form.Item label="Top Depth" shouldUpdate>
            {() => {
              const includeTop = form.getFieldValue(["include_top"]);

              if (!includeTop) return 0;

              return (
                safeNum(cabinet.cabinet_depth) -
                (form.getFieldValue(["depth_difference_top"]) || 0)
              );
            }}
          </Form.Item>

          <Title level={4}>Stretchers</Title>
          <Form.Item
            name={["number_of_top_front_stretcher_finished_sides"]}
            label="# of Finished Sides"
          >
            <Select style={{ width: "70px" }}>
              {numList.map((value) => {
                return (
                  <Select.Option key={`${value}`} value={value}>
                    {value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name={["depth_top_front_stretcher"]}
            label="Top & Front Stretcher Width"
          >
            <InputNumber {...inputProps} />
          </Form.Item>
          <Form.Item
            name={["number_of_stretcher_below_drawer_finished_sides"]}
            label="# of Finished Sides"
          >
            <Select style={{ width: "70px" }}>
              {numList.map((value) => {
                return (
                  <Select.Option key={`${value}`} value={value}>
                    {value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name={["depth_stretcher_below_drawer"]}
            label="Stretcher Below Drawer Width"
          >
            <InputNumber {...inputProps} />
          </Form.Item>

          <Title level={4}>Shelves</Title>
          <Row>
            <Col offset={10} span={7}>
              Adjustable
            </Col>
            <Col span={7}>Fixed</Col>
          </Row>

          <Form.Item label="# of Finished Sides">
            <Row>
              <Col span={12}>
                <Form.Item name={["number_of_adjusted_shelves_finished_sides"]}>
                  <Select style={{ width: "80px" }}>
                    {[0, 1, 2].map((value) => {
                      return (
                        <Select.Option key={`${value}`} value={value}>
                          {value}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={["number_of_fixed_shelves_finished_sides"]}>
                  <Select style={{ width: "80px" }}>
                    {[0, 1, 2].map((value) => {
                      return (
                        <Select.Option key={`${value}`} value={value}>
                          {value}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="# of Shelves">
            <Row>
              <Col span={12}>
                <Form.Item name={["number_of_adjusted_shelves"]}>
                  {/* @ts-expect-error TS(2322): Type '{ style: { width: string; }; min: number; st... Remove this comment to see the full error message */}
                  <InputNumber {...inputNoDecProps} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={["number_of_fixed_shelves"]}>
                  {/* @ts-expect-error TS(2322): Type '{ style: { width: string; }; min: number; st... Remove this comment to see the full error message */}
                  <InputNumber {...inputNoDecProps} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="Cabinet Depth">
            <Row>
              <Col span={12}>
                <Form.Item>{cabinet.cabinet_depth}</Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>{cabinet.cabinet_depth}</Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="Difference">
            <Row>
              <Col span={12}>
                <Form.Item name={["depth_difference_adjusted_shelves"]}>
                  <InputNumber {...inputProps} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={["depth_difference_fixed_shelves"]}>
                  <InputNumber {...inputProps} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label={<SideCLearanceLabel />}>
            <Row>
              <Col span={12}>
                <Form.Item name="shelf_with_clearance">
                  <InputNumber {...inputProps} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item label="Shelf Depth">
            <Row>
              <Col span={12}>
                <Form.Item shouldUpdate>
                  {() => {
                    const numberOfAdjustedShelves = form.getFieldValue([
                      "number_of_adjusted_shelves",
                    ]);

                    if (!numberOfAdjustedShelves) return 0;

                    return (
                      // @ts-expect-error TS(2362): The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
                      toFixed(cabinet.cabinet_depth) -
                      // @ts-expect-error TS(2363): The right-hand side of an arithmetic operation mus... Remove this comment to see the full error message
                      toFixed(
                        form.getFieldValue([
                          "depth_difference_adjusted_shelves",
                        ])
                      )
                    );
                  }}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item shouldUpdate>
                  {() => {
                    const numberOfFixedShelves = form.getFieldValue([
                      "number_of_fixed_shelves",
                    ]);

                    if (!numberOfFixedShelves) return 0;

                    return (
                      // @ts-expect-error TS(2362): The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
                      toFixed(cabinet.cabinet_depth) -
                      // @ts-expect-error TS(2363): The right-hand side of an arithmetic operation mus... Remove this comment to see the full error message
                      toFixed(
                        form.getFieldValue(["depth_difference_fixed_shelves"])
                      )
                    );
                  }}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Divider className="measurement" />

          <Title level={4}>Deck</Title>
          <Form.Item
            label="Include Deck"
            name={["include_deck"]}
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>

          <Form.Item
            label="# of Finished Sides"
            name={["number_of_deck_finished_sides"]}
          >
            <Select style={{ width: "70px" }}>
              {[0, 1, 2].map((value) => {
                return (
                  <Select.Option key={`${value}`} value={value}>
                    {value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Cabinet Depth">{cabinet.cabinet_depth}</Form.Item>
          <Form.Item label="Difference" name={["depth_difference_deck"]}>
            <InputNumber {...inputProps} />
          </Form.Item>

          <Divider className="measurement" />

          <Form.Item label="Deck Depth" shouldUpdate>
            {() => {
              const includeDeck = form.getFieldValue([
                // @ts-expect-error TS(2322): Type '[string]' is not assignable to type 'string ... Remove this comment to see the full error message
                ["include_deck"],
              ]);

              if (!includeDeck) return 0;

              return (
                // @ts-ignore
                cabinet.cabinet_depth -
                safeNum(form.getFieldValue(["depth_difference_deck"]))
              );
            }}
          </Form.Item>
        </Col>

        <Col
          span={10}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ marginBottom: "50px" }}>
            {/* @ts-expect-error TS(2322): Type '{ children: Element[]; justifyContent: strin... Remove this comment to see the full error message */}
            <Row justifyContent="space-between">
              <Col span={12}>
                <Form.Item
                  name="cabinet_material_thickness"
                  label="Material Thickness"
                >
                  <InputNumber {...inputProps} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="cabinet_material_thickness"
                  label="Material Thickness"
                >
                  <InputNumber {...inputProps} />
                </Form.Item>
              </Col>
            </Row>

            {/* @ts-expect-error TS(2322): Type '{ children: Element[]; justifyContent: strin... Remove this comment to see the full error message */}
            <Row justifyContent="space-between">
              <Col span={12}>
                <Form.Item name="dado_depth" label="Dado Depth">
                  <InputNumber {...inputProps} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="rabbet_width" label="Rabbet Width">
                  <InputNumber {...inputProps} />
                </Form.Item>
              </Col>
            </Row>
            <Divider className="measurement" />

            <Row>
              <Col span={12}>
                <Form.Item label="Dado Clearance" shouldUpdate>
                  {() => {
                    return (
                      (form.getFieldValue(["cabinet_material_thickness"]) ||
                        0) - (form.getFieldValue(["dado_depth"]) || 0)
                    );
                  }}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Rabbet Clearance" shouldUpdate>
                  {() => {
                    return (
                      (form.getFieldValue(["cabinet_material_thickness"]) ||
                        0) - (form.getFieldValue(["rabbet_width"]) || 0)
                    );
                  }}
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div ref={ref} id="board-img" />

          <div className="specification-footer">
            <Title style={{ textAlign: "center" }} level={4}>
              Cabinet Base Style
            </Title>

            {/* @ts-expect-error TS(2322): Type '[string]' is not assignable to type 'string ... Remove this comment to see the full error message */}
            <Form.Item name={[["base_style"]]}>
              <Radio.Group>
                <Radio value="standard">Standard</Radio>
                <Radio value="adjustable legs">Adjustable Legs</Radio>
                <Radio value="separate base platform">
                  Separate Base Platform
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Alert message="Select the number of finished sides for each part." />
          </div>
        </Col>

        <Col span={7}>
          <br />
          <br />
          <Title level={4}>Back Stretcher</Title>
          <Form.Item
            label="# of Finished Sides"
            name={["number_of_top_back_stretcher_finished_sides"]}
          >
            <Select style={{ width: "70px" }}>
              {numList.map((value) => {
                return (
                  <Select.Option key={`${value}`} value={value}>
                    {value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Top Back Stretcher Width"
            name={["depth_top_back_stretcher"]}
          >
            <InputNumber {...inputProps} />
          </Form.Item>

          <Title level={4}>Back Nailer</Title>
          <Form.Item
            label="# of Finished Sides"
            name={["number_of_nailer_finished_sides"]}
          >
            <Select style={{ width: "70px" }}>
              {numList.map((value) => {
                return (
                  <Select.Option key={`${value}`} value={value}>
                    {value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Nailer Height" name={["nailer_height"]}>
            <InputNumber {...inputProps} />
          </Form.Item>
          <Form.Item label="Nailer Quantity X" name={["nailer_quantity"]}>
            <InputNumber {...inputProps} />
          </Form.Item>

          <Divider className="measurement" />

          <Form.Item label="Nailer Total" shouldUpdate>
            {() => {
              return (
                (form.getFieldValue(["nailer_height"]) || 0) *
                (form.getFieldValue(["nailer_quantity"]) || 0)
              );
            }}
          </Form.Item>

          <Title level={4}>Cabinet Back</Title>
          <Form.Item
            label="Include Back"
            name={["include_back"]}
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item label="Back Position Method" name="back_position_method">
            <Select>
              {CABINET_POSITION_METHODS_OPTIONS.map((option) => (
                <Select.Option key={shortId()} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="# of Finished Sides"
            name={["number_of_back_finished_sides"]}
          >
            <Select style={{ width: "70px" }}>
              {[0, 1, 2].map((value) => {
                return (
                  <Select.Option key={`${value}`} value={value}>
                    {value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item label="Cabinet Height">
            {/* @ts-expect-error TS(2339): Property 'cabinet_height' does not exist on type '... Remove this comment to see the full error message */}
            {cabinet.cabinet_height}
          </Form.Item>

          <Form.Item label="Toe Kick Height" shouldUpdate>
            {() => {
              return (
                <Form.Item name="toe_kick_height">
                  <InputNumber
                    {...inputProps}
                    disabled={form.getFieldValue(["base_style"]) === "standard"}
                  />
                </Form.Item>
              );
            }}
          </Form.Item>

          <Form.Item label="Bottom Dado Clearance" shouldUpdate>
            {() => {
              return form.getFieldValue(["base_style"]) !== "standard"
                ? `- ${
                    (form.getFieldValue("cabinet_material_thickness") || 0) -
                    (form.getFieldValue(["dado_depth"]) || 0)
                  }`
                : null;
            }}
          </Form.Item>

          <Form.Item label="Top Dado Clearance" shouldUpdate>
            {() => {
              return form.getFieldValue(["base_style"]) !== "standard"
                ? `- ${
                    (form.getFieldValue("cabinet_material_thickness") || 0) -
                    (form.getFieldValue(["dado_depth"]) || 0)
                  }`
                : null;
            }}
          </Form.Item>

          <Divider className="measurement" />

          <Form.Item label="Cabinet Back Height" shouldUpdate>
            {() => {
              const dadoClearance =
                (form.getFieldValue("cabinet_material_thickness") || 0) -
                (form.getFieldValue(["dado_depth"]) || 0);

              return form.getFieldValue(["base_style"]) !== "standard"
                ? safeNum(form.getFieldValue("cabinet_height")) -
                    safeNum(form.getFieldValue("toe_kick_height")) -
                    dadoClearance * 2
                : safeNum(form.getFieldValue("cabinet_height"));
            }}
          </Form.Item>

          <Title level={4}>Cabinet Sides</Title>
          <Form.Item name={["number_of_cabinet_sides"]} label="# of Sides">
            <Select style={{ width: "70px" }}>
              {[0, 1, 2].map((value) => {
                return (
                  <Select.Option key={`${value}`} value={value}>
                    {value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name={["number_of_cabinet_finished_sides"]}
            label="# of Finished Sides"
          >
            <Select style={{ width: "70px" }}>
              {[0, 1, 2].map((value) => {
                return (
                  <Select.Option key={`${value}`} value={value}>
                    {value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item label="Cabinet Height" name="cabinet_height">
            <InputNumber {...inputProps} />
          </Form.Item>

          <Form.Item label="Toe Kick Height — " shouldUpdate>
            {() => {
              return (
                <Form.Item name="toe_kick_height">
                  <InputNumber
                    {...inputProps}
                    disabled={form.getFieldValue(["base_style"]) === "standard"}
                  />
                </Form.Item>
              );
            }}
          </Form.Item>

          <Divider className="measurement" />

          <Form.Item label="Cabinet Side Height" shouldUpdate>
            {() => {
              return form.getFieldValue(["base_style"]) === "standard"
                ? safeNum(form.getFieldValue("cabinet_height"))
                : safeNum(form.getFieldValue("cabinet_height")) -
                    safeNum(form.getFieldValue("toe_kick_height"));
            }}
          </Form.Item>

          <Title level={4}>Finished Ends</Title>

          <Form.Item name="number_of_finished_ends" label="# of Finished Ends">
            <Select style={{ width: "70px" }}>
              {[0, 1, 2].map((value) => {
                return (
                  <Select.Option key={`${value}`} value={value}>
                    {value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
