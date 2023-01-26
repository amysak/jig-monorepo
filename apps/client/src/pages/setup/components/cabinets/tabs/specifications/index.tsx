import {
  Alert,
  Col,
  Divider,
  Form,
  InputNumber,
  message,
  Radio,
  Row,
  Typography,
} from "antd";
import { useMatch } from "@tanstack/react-location";
import { select as d3Select } from "d3";
import { debounce } from "lodash-es";
import get from "lodash-es";
import React, { useContext, useEffect, useMemo, useRef } from "react";
import { inputNumberProps } from "@jigbid/ui";

import BaseVanityCabinetPNG from "../../../../../assets/images/cabinets/Base_Vanity.png";

import UpperTallCabinetPNG from "../../../../../assets/images/cabinets/Upper_Tall.png";

import {
  lowerCase,
  polyPoints,
  safeNum,
  toFixed,
} from "../../../../../../utilities/utils";

// import BaseCabinet, { basePoints } from "./components/Base";
import UpperCabinet from "./components/Upper";

import "../../../../defaultsetup/cabinet-specification/style.scss";
import { LocationGenerics } from "router";

const { Title } = Typography;
const formLayout = {
  labelCol: { span: 14 },
  wrapperCol: { span: 10 },
};

const inputProps: any = {
  ...inputNumberProps,
  style: {
    width: "70px",
  },
};

const cabinetTypes = {
  base: "base",
  vanity: "vanity",
  upper: "upper",
  tall: "tall",
};

// const getCabinetComponentByCategory = (category) => {
//   switch (category) {
//     case cabinetTypes.base:
//     case cabinetTypes.vanity:
//       return BaseCabinet;
//     case cabinetTypes.upper:
//     case cabinetTypes.tall:
//       return UpperCabinet;
//     default:
//       return null;
//   }
// };

const getCabinetImageByCategory = (category) => {
  switch (category) {
    case cabinetTypes.base:
    case cabinetTypes.vanity:
      return BaseVanityCabinetPNG;
    case cabinetTypes.upper:
    case cabinetTypes.tall:
      return UpperTallCabinetPNG;
    default:
      return "";
  }
};

export default function CabinetSpecifications() {
  const [form] = Form.useForm();

  const onValuesChange = debounce(async (value, values) => {}, 1000);

  const removeSVG = () => {
    try {
      document.getElementById("board-img-svg")!.remove();
    } catch (error) {
      console.log("svg not found");
    }
  };

  // useEffect(() => {
  //   removeSVG();
  //   const element = document.getElementById("board-img");

  //   const canvas = d3Select(element)
  //     .append("svg")
  //     .attr("id", "board-img-svg")
  //     .attr("width", "100%")
  //     .attr("height", "100%");

  //   canvas
  //     .append("image")
  //     .attr("xlink:href", getCabinetImageByCategory(cabinet.category))
  //     .attr("width", "80%")
  //     .attr("height", "80%")
  //     .attr("x", "10%")
  //     .attr("y", "10%");

  //   if ([cabinetTypes.vanity, cabinetTypes.base].includes(category)) {
  //     // @ts-ignore
  //     polyPoints(canvas, basePoints);
  //   }

  //   if ([cabinetTypes.tall, cabinetTypes.upper].includes(category)) {
  //     // @ts-ignore
  //     polyPoints(canvas, [
  //       { start: [1, 15], end: [1, 135] },

  //       { start: [1, 165], end: [1, 205] },
  //       { start: [1, 185], end: [100, 185] },

  //       { start: [1, 215], end: [1, 260] },
  //       { start: [1, 245], end: [130, 245] },

  //       { start: [1, 285], end: [1, 475] },
  //       { start: [1, 340], end: [180, 340] },

  //       { start: [1, 500], end: [1, 605] },
  //       { start: [1, 555], end: [200, 555] },
  //       { start: [200, 555], end: [200, 480] },

  //       { start: [530, 60], end: [530, 110] },
  //       { start: [530, 85], end: [250, 85] },
  //       { start: [250, 85], end: [250, 130] },

  //       { start: [530, 150], end: [530, 230] },
  //       { start: [530, 165], end: [330, 165] },
  //       { start: [330, 165], end: [330, 205] },

  //       { start: [530, 260], end: [530, 435] },
  //       { start: [530, 300], end: [420, 300] },
  //       { start: [420, 300], end: [420, 230] },

  //       { start: [530, 470], end: [530, 575] },
  //       { start: [530, 530], end: [420, 530] },
  //       { start: [420, 530], end: [420, 470] },
  //     ]);
  //   }
  // }, [cabinetCtx]);

  return (
    <Form
      form={form}
      // initialValues={cabinet}
      onValuesChange={onValuesChange}
      {...formLayout}
      className="cabinetspecification"
    >
      <Row>
        <Col offset={8}>
          <div style={{ marginBottom: "0" }}>
            <Row justify="space-between">
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

            <Row justify="space-between">
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
                    return toFixed(
                      safeNum(
                        form.getFieldValue(["cabinet_material_thickness"]) || 0
                      ) - (form.getFieldValue(["dado_depth"]) || 0)
                    );
                  }}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Rabbet Clearance" shouldUpdate>
                  {() => {
                    return toFixed(
                      safeNum(
                        form.getFieldValue(["cabinet_material_thickness"]) || 0
                      ) - (form.getFieldValue(["rabbet_width"]) || 0)
                    );
                  }}
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {/* <CabinetComponent
        category={category}
        cabinet={cabinet}
        ref={ref}
        form={form}
      /> */}

      <br />

      <Row>
        <Col offset={8}>
          <div className="specification-footer">
            <Title style={{ textAlign: "center" }} level={4}>
              Cabinet Base Style
            </Title>

            <Form.Item name={"base_style"}>
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
      </Row>
    </Form>
  );
}
