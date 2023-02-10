import {
  FormCheckbox,
  FormInput,
  FormNumberInput,
  FormRadioSet,
  FormSelect,
} from "@jigbid/ui";
import { Card, Form, Space } from "antd";
import { capitalize } from "lodash-es";
import {
  CABINET_BASE_TYPES,
  CABINET_CORNER_PLACEMENT,
  CABINET_TYPES,
} from "type-defs";

export const CabinetMain = () => {
  const form = Form.useFormInstance();

  return (
    <Card>
      <FormInput label="Cabinet" name="name" />

      <FormSelect
        label="Type"
        name="type"
        options={CABINET_TYPES.map((type) => ({
          label: capitalize(type),
          value: type,
        }))}
      />

      <FormSelect
        label="Base Type"
        name="baseType"
        options={CABINET_BASE_TYPES.map((baseType) => ({
          label: capitalize(baseType),
          value: baseType,
        }))}
      />

      <FormRadioSet
        options={[
          { label: "Face Frame", value: true },
          { label: "Full Access", value: false },
        ]}
        label="Cabinet Style"
        name="isFramed"
      />

      <FormRadioSet
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
        label="Interior Finished?"
        name="isInteriorFinished"
      />

      <Space>
        <FormCheckbox name="favourite" label="Favourite" />

        <FormNumberInput
          name={["specifications", "partCounts", "sides"]}
          label="Sides count"
        />
      </Space>

      <br />

      <Space>
        <FormCheckbox name="cornered" label="Cornered" />

        <Form.Item shouldUpdate noStyle>
          {() => {
            if (!form.getFieldValue("cornered")) return null;

            return (
              <FormSelect
                label="Corner Style"
                name="cornerPlacement"
                select={{
                  style: {
                    minWidth: 100,
                  },
                }}
                options={Object.values(CABINET_CORNER_PLACEMENT).map(
                  (placement) => ({
                    label: capitalize(placement),
                    value: placement,
                  })
                )}
              />
            );
          }}
        </Form.Item>
      </Space>
    </Card>
  );
};
