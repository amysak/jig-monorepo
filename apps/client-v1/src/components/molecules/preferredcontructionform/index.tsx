import {
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import { select as d3Select } from "d3";
import React, { useContext, useEffect, useRef } from "react";

import CabinetImg from "assets/images/cabinets/BP_Five_Part_Drawer_Box.png";
import { CABINET_BASE_STYLES } from "utilities/constants";
import { capitalize, drawCircles, polyPoints, shortId } from "utilities/utils";
import { AccountContext } from "../../../store/account";
import {
  baseDotsPoints,
  basePoints,
  drawerBoxLayout,
  imageClassName,
  layout,
  selectStyle,
  svgClassName,
} from "./utils";

import "./preferredconstructionform.scss";

const { Text, Title, Paragraph } = Typography;

function PreferredContructionForm() {
  const [form] = Form.useForm();
  const accountCtx = useContext(AccountContext);

  const onValuesChange = (value, values) => {
    accountCtx.updateAccountPreferences(values);
  };

  /* #region  canvas */
  const ref = useRef();

  const removeSVG = () => {
    try {
      document.getElementById(svgClassName)!.remove();
    } catch (error) {
      console.log("svg not found");
    }
  };

  useEffect(() => {
    removeSVG();
    const element = document.getElementById(imageClassName);

    const canvas = d3Select(element)
      .append("svg")
      .attr("id", svgClassName)
      .attr("width", "100%")
      .attr("height", "100%");

    canvas
      .append("image")
      .attr("xlink:href", CabinetImg)
      .attr("width", "100%")
      .attr("height", "100%");

    // @ts-ignore
    polyPoints(canvas, basePoints);
    // @ts-ignore
    drawCircles(canvas, baseDotsPoints);
  }, []);
  /* #endregion */

  return (
    <Form
      form={form}
      {...layout}
      onValuesChange={onValuesChange}
      initialValues={accountCtx.preference}
      className="preferredconstructionform"
    >
      <Row>
        <Col span={4}>
          <Text className="as-form-label">Cabinet Base Style</Text>
        </Col>
        <Col span={20}>
          <Form.Item name="cabinet_base_style">
            <Radio.Group>
              {CABINET_BASE_STYLES.map((option) => (
                <Radio key={shortId()} value={option}>
                  {capitalize(option)}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={3}>
          <Text className="as-form-label">Cabinet Width</Text>
        </Col>
        <Col span={1}>
          <Form.Item name="check_exact_cabinet_width" valuePropName="checked">
            <Checkbox />
          </Form.Item>
        </Col>

        <Col>
          <Text className="as-form-label">
            Check this if you prefer to enter the exact cabinet width when
            adding cabinets
          </Text>
          <Paragraph className="as-form-label-subtitle">
            (rather than using the average cabinet width based on the total
            linear feet/# of cabinets)
          </Paragraph>
        </Col>
      </Row>

      <br />

      <Row className="drawer-box-parts">
        <Col span={8}>
          <Title level={4}>Default Tray Box Dimensions</Title>

          <Form.Item name="number_of_box_parts" label="Number of box parts">
            <Select style={selectStyle}>
              {[0, 3, 5].map((option, key) => (
                <Select.Option key={key} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="difference_between_cabinet_depth"
            label="Difference between cabinet depth"
          >
            <InputNumber style={selectStyle} />
          </Form.Item>

          <Title level={4}>
            Minimum Square Footage for In-house Manufacturing Labor
          </Title>
          <Form.Item
            label="Minumum Door Square Footage"
            name={[
              "in_house_manufacturing_labour",
              "minimum_door_square_footage",
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item
            name={[
              "in_house_manufacturing_labour",
              "minimum_drawer_front_square_footage",
            ]}
            label="Minumum Drawer Front Square Footage"
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name={[
              "in_house_manufacturing_labour",
              "minimum_wainscott_square_footage",
            ]}
            label="Minumum Wainscott Square Footage"
          >
            <InputNumber />
          </Form.Item>

          <Title level={4}>Minimum Square Footage for Installation Labor</Title>
          <Form.Item
            name={["installation_labor", "minimum_wainscott_square_footage"]}
            label="Minumum Wainscott Square Footage"
          >
            <InputNumber />
          </Form.Item>
        </Col>

        <Col
          offset={1}
          span={15}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Text strong style={{ display: "flex", justifyContent: "center" }}>
            Drawer Box Parts
          </Text>

          <div>
            <Input.Group compact>
              <Form.Item label="Back Height" {...drawerBoxLayout}>
                <Form.Item name={["back_height", "rate"]}>
                  <InputNumber />
                </Form.Item>
                <Form.Item name={["back_height", "number_of_finished_sides"]}>
                  <Select>
                    {[0, 1, 2].map((value) => (
                      <Select.Option value={value} key={shortId()}>
                        {value}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form.Item>

              <Form.Item label="Bottom Depth" {...drawerBoxLayout}>
                <Form.Item name={["bottom_depth", "rate"]}>
                  <InputNumber />
                </Form.Item>
                <Form.Item name={["bottom_depth", "number_of_finished_sides"]}>
                  <Select>
                    {[0, 1, 2].map((value) => (
                      <Select.Option value={value} key={shortId()}>
                        {value}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form.Item>

              <Form.Item label="Front Height" {...drawerBoxLayout}>
                <Form.Item name={["front_height", "rate"]}>
                  <InputNumber />
                </Form.Item>
                <Form.Item name={["front_height", "number_of_finished_sides"]}>
                  <Select>
                    {[0, 1, 2].map((value) => (
                      <Select.Option value={value} key={shortId()}>
                        {value}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form.Item>

              <Form.Item label="Side Height" {...drawerBoxLayout}>
                <Form.Item name={["side_height", "rate"]}>
                  <InputNumber />
                </Form.Item>
                <Form.Item name={["side_height", "number_of_finished_sides"]}>
                  <Select>
                    {[0, 1, 2].map((value) => (
                      <Select.Option value={value} key={shortId()}>
                        {value}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form.Item>

              <div ref={ref} id={imageClassName} />
            </Input.Group>
          </div>
        </Col>
      </Row>
    </Form>
  );
}

export default PreferredContructionForm;
