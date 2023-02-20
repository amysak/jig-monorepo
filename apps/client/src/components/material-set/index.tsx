import { Col, Form, Row } from "antd";
import { debounce } from "lodash-es";

import { useMutateMaterialSet } from "lib/hooks/queries";
import { MaterialSet } from "type-defs";
import { AppliedPart, MaterialSetSkeleton } from "./components";
import { useEffect } from "react";

type MaterialSetProps = {
  materialSet: MaterialSet;
};

export const MaterialSetView = ({ materialSet }: MaterialSetProps) => {
  const [form] = Form.useForm();

  const { mutateAsync: mutateSet } = useMutateMaterialSet(materialSet.id, {
    // onSuccess: (data) => form.setFieldsValue(data),
  });

  useEffect(() => {
    form.setFieldsValue(materialSet);
  }, [materialSet, form]);

  return materialSet ? (
    <Form
      form={form}
      initialValues={materialSet}
      onValuesChange={debounce((values) => mutateSet(values), 300)}
      name="set-form"
      layout="vertical"
    >
      <Row gutter={[16, 8]}>
        <Col span={12}>
          <AppliedPart title="Base doors" name={["exterior", "baseDoor"]} />
        </Col>
        <Col span={12}>
          <AppliedPart title="Upper doors" name={["exterior", "upperDoor"]} />
        </Col>
        <Col span={12}>
          <AppliedPart
            title="Drawer fronts"
            name={["exterior", "drawerFront"]}
          />
        </Col>
        <Col span={12}>
          <AppliedPart
            title="Appliance panels"
            name={["exterior", "appliancePanel"]}
          />
        </Col>
        <Col span={12}>
          <AppliedPart
            title="Wainscot panels"
            name={["exterior", "appliancePanel"]}
          />
        </Col>
        <Col span={12}>
          <AppliedPart
            title="End panels"
            name={["exterior", "appliancePanel"]}
          />
        </Col>
        <Col span={12}>
          <AppliedPart
            title="Slab ends"
            name={["exterior", "appliancePanel"]}
          />
        </Col>
        <Col span={12}>
          <AppliedPart title="Fillers" name={["exterior", "fillers"]} />
        </Col>
        <Col span={12}>
          <AppliedPart title="Face frame" name={["exterior", "faceFrame"]} />
        </Col>
        <Col span={12}>
          <AppliedPart title="Edgebanding" name={["exterior", "edgebanding"]} />
        </Col>
        <Col span={24}>
          <AppliedPart title="Molding" name={["exterior", "molding"]} />
        </Col>
      </Row>
    </Form>
  ) : (
    <MaterialSetSkeleton />
  );
};
