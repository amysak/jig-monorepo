import { Form, Radio, Tabs } from "antd";
import { debounce } from "lodash-es";
import { useState } from "react";
import { MaterialSet } from "type-defs";

import { useMutateMaterialSet } from "lib/hooks/queries";
import { MaterialSetSkeleton } from "./components";
import { useMaterialSetTabs } from "./hooks";

type MaterialSetTabs = "interior" | "exterior";

type MaterialSetProps = {
  materialSet: MaterialSet;
};

export const MaterialSetView = ({ materialSet }: MaterialSetProps) => {
  const [form] = Form.useForm();

  const { mutateAsync: mutateSet } = useMutateMaterialSet(materialSet.id, {
    onSuccess: (data) => form.setFieldsValue(data),
  });

  const [currentTab, setCurrentTab] = useState<MaterialSetTabs>("exterior");

  const tabs = useMaterialSetTabs();

  return materialSet ? (
    <Form
      form={form}
      initialValues={materialSet}
      onValuesChange={debounce((values) => mutateSet(values), 300)}
      name="set-form"
      layout="vertical"
    >
      <Radio.Group
        onChange={(e) => setCurrentTab(e.target.value)}
        value={currentTab}
        buttonStyle="solid"
        size="middle"
        style={{ marginBottom: 15 }}
      >
        <Radio.Button value="exterior">Exterior</Radio.Button>
        <Radio.Button value="interior">Interior</Radio.Button>
      </Radio.Group>

      <Tabs
        defaultActiveKey="0"
        tabPosition="left"
        style={{ height: 400 }}
        items={tabs[currentTab]}
      />
    </Form>
  ) : (
    <MaterialSetSkeleton />
  );
};
