import { FormSelect } from "@jigbid/ui";
import { Card, Form, Space, Typography } from "antd";

import {
  useFinishesGrouppedQuery,
  useMaterialsQuery,
  useModelsQuery,
  useProfilesQuery,
} from "lib/hooks/queries";
import { MaterialSet, PROFILE_TYPE } from "type-defs";
import { MaterialSetSkeleton } from "./skeleton";

type AppliedPartProps = {
  title: string;
  name: string | string[];
};

const { Text } = Typography;

export const AppliedPart = ({ title, name }: AppliedPartProps) => {
  const form = Form.useFormInstance<MaterialSet>();
  const models = useModelsQuery();
  const { data: profiles } = useProfilesQuery();
  const { data: materials } = useMaterialsQuery();
  const { data: finishes } = useFinishesGrouppedQuery();

  if (!models.data) {
    return <MaterialSetSkeleton />;
  }

  return (
    <Card title={title}>
      <Space>
        <FormSelect
          name={[...name, "modelId"]}
          select={{
            placeholder: "Select a model",
            onChange: () => {
              form.setFieldValue([...name, "material"], null);
            },
          }}
          options={models.data.map((model) => ({
            label: model.name,
            value: model.id,
          }))}
        />

        <FormSelect
          select={{
            disabled: !form.getFieldValue([...name, "modelId"]),
            placeholder: !form.getFieldValue([...name, "modelId"])
              ? "Select model first!"
              : "Select material type",
            style: { minWidth: 150 },
          }}
          name={[...name, "materialId"]}
          options={
            materials?.data
              .filter(
                (item) =>
                  item.type ===
                  models.data.find(
                    (model) =>
                      model.id === form.getFieldValue([...name, "modelId"])
                  )?.materialType
              )
              .map((material) => ({
                label: material.name,
                value: material.id,
              })) || []
          }
        />
        <Space direction="vertical">
          <Space size="small">
            {PROFILE_TYPE.map((type) => (
              <FormSelect
                key={`${name}-profile-${type}`}
                name={[...name, "profiles", type + "Id"]}
                style={{ width: 100 }}
                options={
                  profiles?.data
                    .filter((item) => item.type === type)
                    .map((profile) => ({
                      label: profile.name,
                      value: profile.id,
                    })) || []
                }
              />
            ))}
          </Space>
          <Space size="small">
            {["process", "glaze", "paint"].map((finishType) => (
              <FormSelect
                key={`${name}-finish-${finishType}`}
                name={[...name, "finishes", finishType + "Id"]}
                style={{ width: 100 }}
                options={
                  (finishType === "process"
                    ? finishes?.processes
                    : finishes?.paints.filter(
                        (item) => item.type === finishType
                      )
                  )?.map((finish) => ({
                    label: finish.name,
                    value: finish.id,
                  })) || []
                }
              />
            ))}
          </Space>
        </Space>
      </Space>
    </Card>
  );
};
