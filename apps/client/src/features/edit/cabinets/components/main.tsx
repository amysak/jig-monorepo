import {
  FormCheckbox,
  FormInput,
  FormNumberInput,
  FormSelect,
} from "@jigbid/ui";
import { Card, Col, Form, Row } from "antd";
import { capitalize } from "lodash-es";
import {
  Cabinet,
  CABINET_BASE_TYPES,
  CABINET_CORNER_TYPE,
  CABINET_TYPES,
} from "type-defs";

export const CabinetMain = () => {
  const form = Form.useFormInstance<Cabinet>();
  const { corner } = form.getFieldsValue();

  return (
    <Card>
      <FormInput label="Cabinet" name="name" />

      <Row justify="space-between">
        <Col span={11}>
          <FormCheckbox name="corner" label="Corner cabinet" />
        </Col>
        <Col span={11}>
          {corner ? (
            <FormSelect
              label="Corner Style"
              name="cornerPlacement"
              select={{
                style: {
                  minWidth: 100,
                },
              }}
              options={Object.values(CABINET_CORNER_TYPE).map((placement) => ({
                label: capitalize(placement),
                value: placement,
              }))}
            />
          ) : null}
        </Col>
      </Row>

      <Row justify="space-between">
        <Col span={11}>
          <FormSelect
            label="Type"
            name="type"
            options={CABINET_TYPES.map((type) => ({
              label: capitalize(type),
              value: type,
            }))}
          />
        </Col>

        <Col span={11}>
          <FormSelect
            label="Base Type"
            name={["baseType"]}
            options={CABINET_BASE_TYPES.map((baseType) => ({
              label: capitalize(baseType),
              value: baseType,
            }))}
          />
        </Col>
      </Row>

      <Row>
        <Col span={11}>
          <FormCheckbox name="isFavourite" label="Favourite" />
        </Col>

        <Col span={11}>
          {form.getFieldValue(["exterior", "baseType"]) === "standard" ? (
            <FormNumberInput
              name={["dimensions", "overridenToeHeight"]}
              label="Override toe height"
            />
          ) : null}
        </Col>
      </Row>
    </Card>
  );
};
