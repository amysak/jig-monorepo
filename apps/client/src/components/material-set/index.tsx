import { Col, Form, Row, Space } from "antd";
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
      <Space direction="vertical" style={{ width: "100%" }}>
        <AppliedPart title="Base doors" name={["exterior", "baseDoor"]} />
        <AppliedPart title="Upper doors" name={["exterior", "upperDoor"]} />
        <AppliedPart title="Drawer fronts" name={["exterior", "drawerFront"]} />
        <AppliedPart
          title="Appliance panels"
          name={["exterior", "appliancePanel"]}
        />
        <AppliedPart
          title="Wainscot panels"
          name={["exterior", "appliancePanel"]}
        />
        <AppliedPart title="End panels" name={["exterior", "appliancePanel"]} />
        <AppliedPart title="Slab ends" name={["exterior", "appliancePanel"]} />
        <AppliedPart title="Fillers" name={["exterior", "fillers"]} />
        <AppliedPart title="Face frame" name={["exterior", "faceFrame"]} />
        <AppliedPart title="Edgebanding" name={["exterior", "edgebanding"]} />
        <AppliedPart title="Molding" name={["exterior", "molding"]} />
      </Space>
    </Form>
  ) : (
    <MaterialSetSkeleton />
  );
};
