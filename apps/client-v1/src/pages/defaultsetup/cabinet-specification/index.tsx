import {
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import { select as d3Select } from "d3";
import debounce from "lodash/debounce";
import React, { useEffect, useRef, useState } from "react";

import UILayout from "../../../components/templates/uilayout";

import {
  getDefaultCabinetSpecification,
  updateCabinetSpecification,
} from "../../../api/cabinets";
import TableTitle from "../../../components/atoms/table-title";
import CabinetImg from "../../../assets/images/cabinets/Base_Vanity.png";
import {
  inputNumberProps,
  inputNumberPropsNoDecimal,
  inputNumberPropsThreeDecimal,
} from "../../../utilities";
import { capitalize, polyPoints, shortId } from "../../../utilities/utils";
import { cabinetTypes, cabinetTypesMap, numberList } from "./utils";

import { sendNotificationRequest } from "../../../actions/notification";
import { store } from "../../../store";
import "./style.scss";

const { Text } = Typography;

interface RenderLabelProps {
  useTitle: any;
  title: string;
  label: any;
}

const RenderLabel = ({ title, useTitle, label }: RenderLabelProps) => {
  return (
    <div className="label-title">
      <span>{label}</span>

      {useTitle ? <Text strong>{capitalize(title)}</Text> : null}
    </div>
  );
};

function PageHeader() {
  return (
    <Row justify="space-between">
      <TableTitle title="Default Cabinet Specification" />
    </Row>
  );
}

const formLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

const itemStyle = {
  width: "25%",
};

const leftInputsStyle = {
  width: "70px",
};

const inputProps = {
  style: {
    width: "100%",
  },
};

const inlineLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

function FormHeaders() {
  return (
    <Row>
      {cabinetTypes.map((cabinetType) => (
        <Col key={shortId()} span={6}>
          {capitalize(cabinetType)}
        </Col>
      ))}
    </Row>
  );
}

export default function CabinetSpecification() {
  const [form] = Form.useForm();
  const [specification, setSpecification] = useState<{ id?: string }>({});
  const [, setLoading] = useState(false);

  React.useEffect(() => {
    form.resetFields();
  }, [specification]);

  const getData = async () => {
    try {
      setLoading(true);
      const specification = await getDefaultCabinetSpecification();

      setSpecification(specification);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const ref = useRef();

  useEffect(() => {
    const canvas = d3Select(ref.current)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%");

    canvas
      .append("image")
      .attr("xlink:href", CabinetImg)
      .attr("width", "80%")
      .attr("height", "80%")
      .attr("x", "10%")
      .attr("y", "10%");

    canvas
      .append("text")
      .text("(Optional design instead of front and back stretchers)")
      .attr("y", "35")
      .attr("x", "20");

    // format, start, end
    // start: from the left side, from the top
    // end: from the left side, to the top
    // @ts-ignore
    polyPoints(canvas, [
      { start: [1, 30], end: [1, 110] },
      { start: [1, 40], end: [150, 40] },

      { start: [1, 115], end: [1, 175] },
      { start: [1, 140], end: [240, 140] },
      { start: [240, 140], end: [240, 220] },

      { start: [1, 180], end: [1, 240] },
      { start: [1, 210], end: [210, 210] },
      { start: [210, 210], end: [210, 250] },

      { start: [1, 250], end: [1, 350] },
      { start: [1, 290], end: [245, 290] },

      { start: [1, 362], end: [1, 420] },
      { start: [1, 390], end: [130, 390] },
      { start: [130, 390], end: [130, 320] },

      { start: [1, 430], end: [1, 485] },
      { start: [1, 440], end: [160, 440] },
      { start: [160, 440], end: [160, 380] },

      { start: [1, 495], end: [1, 660] },
      { start: [1, 515], end: [175, 515] },
      { start: [175, 515], end: [175, 435] },

      { start: [1, 670], end: [1, 750] },
      { start: [1, 690], end: [145, 690] },
      { start: [145, 690], end: [145, 530] },

      { start: [1, 760], end: [1, 815] },
      { start: [1, 780], end: [280, 780] },
      { start: [280, 780], end: [280, 570] },
    ]);

    getData();
  }, []);

  const onValuesChange = debounce(async (value, values) => {
    try {
      await updateCabinetSpecification(specification.id, values);
    } catch {
      store.dispatch(
        sendNotificationRequest({
          message: "Update failed.",
          type: "success",
        })
      );
    } finally {
    }
  }, 1000);

  return (
    <UILayout ToolbarContent={<PageHeader />}>
      <Form
        form={form}
        initialValues={specification}
        onValuesChange={onValuesChange}
        {...formLayout}
        className="cabinetspecification"
      >
        <Col className="pagewrapper cabinetspec-wrapper">
          <Row className="">
            <Col span={10}>
              <Row>
                <Col offset={12} span={12}>
                  <FormHeaders />
                </Col>

                <Col>
                  {Object.keys(cabinetTypesMap).map((key) => {
                    return (
                      <div key={shortId()} id={key} className="part-block">
                        {Object.keys(cabinetTypesMap[key]).map((property) => {
                          const {
                            label,
                            types,
                            dataType,
                            excludes,
                            options,
                            useTitle,
                            isLast,
                            inputProp,
                          } = cabinetTypesMap[key][property];

                          return (
                            <Form.Item
                              key={shortId()}
                              label={
                                <RenderLabel
                                  useTitle={useTitle}
                                  title={key}
                                  label={label}
                                />
                              }
                              {...inlineLayout}
                              style={{
                                width: "100%",
                              }}
                              className={isLast ? "is-last" : ""}
                            >
                              <Input.Group compact>
                                {types.map((type: string | number) => {
                                  if (excludes?.includes(type)) {
                                    return (
                                      <Form.Item
                                        key={shortId()}
                                        style={itemStyle}
                                      >
                                        <InputNumber
                                          disabled
                                          readOnly
                                          bordered={false}
                                        />
                                      </Form.Item>
                                    );
                                  }

                                  return (
                                    <Form.Item
                                      key={shortId()}
                                      style={itemStyle}
                                      name={[type, property]}
                                      valuePropName={
                                        dataType === "boolean"
                                          ? "checked"
                                          : undefined
                                      }
                                    >
                                      {dataType === "boolean" ? (
                                        <Checkbox />
                                      ) : dataType === "select" ? (
                                        <Select
                                          style={{
                                            width: "100%",
                                          }}
                                        >
                                          {options.map((value) => (
                                            <Select.Option
                                              key={`${value}`}
                                              value={value}
                                            >
                                              {value}
                                            </Select.Option>
                                          ))}
                                        </Select>
                                      ) : (
                                        <InputNumber
                                          {...inputProp}
                                          {...inputProps}
                                        />
                                      )}
                                    </Form.Item>
                                  );
                                })}
                              </Input.Group>
                            </Form.Item>
                          );
                        })}
                      </div>
                    );
                  })}
                </Col>
              </Row>
            </Col>

            <Col
              span={8}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Form.Item
                name="interior"
                label="Interior Finished or Unfinished"
                // @ts-expect-error TS(2559): Type 'number' has no properties in common with typ... Remove this comment to see the full error message
                wrapperCol={24}
                // @ts-expect-error TS(2559): Type 'number' has no properties in common with typ... Remove this comment to see the full error message
                labelCol={24}
                className="centered-item"
              >
                <Radio.Group>
                  <Radio value="finished">F</Radio>
                  <Radio value="unfinished">U</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="cabinet_material_thickness"
                label="Cabinet Material Thickness"
                // @ts-expect-error TS(2559): Type 'number' has no properties in common with typ... Remove this comment to see the full error message
                wrapperCol={24}
                // @ts-expect-error TS(2559): Type 'number' has no properties in common with typ... Remove this comment to see the full error message
                labelCol={24}
                className="centered-item"
              >
                <InputNumber {...inputProps} />
              </Form.Item>

              <Form.Item
                name="shelf_with_clearance"
                label="Shelf Width Clearance (total for both sides)"
                // @ts-expect-error TS(2559): Type 'number' has no properties in common with typ... Remove this comment to see the full error message
                wrapperCol={24}
                // @ts-expect-error TS(2559): Type 'number' has no properties in common with typ... Remove this comment to see the full error message
                labelCol={24}
                className="centered-item"
              >
                <InputNumber {...inputProps} />
              </Form.Item>

              <Divider className="x5" />

              <div ref={ref} id="board-img" />
            </Col>

            <Col span={6}>
              <Text strong>Backs</Text>
              <Form.Item
                label="Back Position Method"
                name="back_position_method"
              >
                <Select style={{ width: "150px" }}>
                  {["In Front of Nailer", "Behind Nailer"].map((position) => (
                    <Select.Option value={position} key={shortId()}>
                      {position}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="back_thickness" label="Back Thickness">
                <InputNumber
                  {...inputProps}
                  {...inputNumberProps}
                  style={leftInputsStyle}
                />
              </Form.Item>
              <Form.Item name="dado_depth" label="Dado Depth">
                <InputNumber
                  {...inputProps}
                  {...inputNumberProps}
                  style={leftInputsStyle}
                />
              </Form.Item>
              <Form.Item name="rabbet_width" label="Rabbet Width">
                <InputNumber
                  {...inputProps}
                  {...inputNumberProps}
                  style={leftInputsStyle}
                />
              </Form.Item>
              <Form.Item
                name="corner_back_vertical_diagonal_width"
                label="Corner Back Vertical Diagonal Width"
              >
                <InputNumber
                  {...inputProps}
                  {...inputNumberProps}
                  style={leftInputsStyle}
                />
              </Form.Item>

              <br />

              <Text strong>Face Frames</Text>
              <Form.Item
                name="face_frame_rail_height"
                label="Face Frame Rail Height"
              >
                <InputNumber
                  {...inputProps}
                  {...inputNumberProps}
                  style={leftInputsStyle}
                />
              </Form.Item>
              <Form.Item
                name="top_rail_number_of_finish_sides"
                label="Top Rail # Fin sides"
              >
                <Select style={leftInputsStyle}>
                  {numberList.map((value) => (
                    <Select.Option key={`${value}`} value={value}>
                      {value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="center_rail_number_of_finish_sides_one"
                label="Center Rail 1 # Fin sides"
              >
                <Select style={leftInputsStyle}>
                  {numberList.map((value) => (
                    <Select.Option key={`${value}`} value={value}>
                      {value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="center_rail_number_of_finish_sides_two"
                label="Center Rail 2 # Fin sides"
              >
                <Select style={leftInputsStyle}>
                  {numberList.map((value) => (
                    <Select.Option key={`${value}`} value={value}>
                      {value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="center_rail_number_of_finish_sides_three"
                label="Center Rail 3 # Fin sides"
              >
                <Select style={leftInputsStyle}>
                  {numberList.map((value) => (
                    <Select.Option key={`${value}`} value={value}>
                      {value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="center_rail_number_of_finish_sides_four"
                label="Center Rail 4 # Fin sides"
              >
                <Select style={leftInputsStyle}>
                  {numberList.map((value) => (
                    <Select.Option key={`${value}`} value={value}>
                      {value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="bottom_rail_number_of_finish_sides"
                label="Bottom Rail # Fin sides"
              >
                <Select style={leftInputsStyle}>
                  {numberList.map((value) => (
                    <Select.Option key={`${value}`} value={value}>
                      {value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="face_frame_stile_width"
                label="Face Frame Stile Width"
              >
                <InputNumber
                  {...inputProps}
                  {...inputNumberProps}
                  style={leftInputsStyle}
                />
              </Form.Item>
              <Form.Item
                name="stile_number_of_finish_sides"
                label="Stile # Fin sides"
              >
                {/* @ts-expect-error TS(2322): Type '{ style: { width: string; }; min: number; st... Remove this comment to see the full error message */}
                <InputNumber
                  {...inputProps}
                  {...inputNumberPropsNoDecimal}
                  style={leftInputsStyle}
                />
              </Form.Item>

              <br />

              <Text strong>Drawers and Doors</Text>
              <Form.Item name="door_drawer_reveal" label="Door/Drawer Reveal">
                <InputNumber
                  {...inputProps}
                  {...inputNumberPropsThreeDecimal}
                  style={leftInputsStyle}
                />
              </Form.Item>
              <Form.Item
                name="drawer_depth_difference"
                label="Drawer Depth Difference"
              >
                <InputNumber
                  {...inputProps}
                  {...inputNumberProps}
                  style={leftInputsStyle}
                />
              </Form.Item>

              <br />

              <Text strong>Fillers</Text>
              <Form.Item
                name="filler_standard_width"
                label="Filler Standard Width"
              >
                <InputNumber
                  {...inputProps}
                  {...inputNumberProps}
                  style={leftInputsStyle}
                />
              </Form.Item>

              <br />

              <Text strong>Toe Kick</Text>
              <Form.Item name="toe_kick_height" label="Toe Kick Height">
                <InputNumber
                  {...inputProps}
                  {...inputNumberProps}
                  style={leftInputsStyle}
                />
              </Form.Item>
              <Form.Item name="toe_kick_depth" label="Toe Kick Depth">
                <InputNumber
                  {...inputProps}
                  {...inputNumberProps}
                  style={leftInputsStyle}
                />
              </Form.Item>
              <Divider />
            </Col>
          </Row>
        </Col>
      </Form>
    </UILayout>
  );
}
