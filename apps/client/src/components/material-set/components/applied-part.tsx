import { FormSelect } from "@jigbid/ui";
import { Form } from "antd";
import { MaterialSet } from "type-defs";

import {
  useMaterialQuery,
  useMaterialsQuery,
  useModelsQuery,
} from "lib/hooks/queries";
import { MaterialSetSkeleton } from "./skeleton";

type AppliedPartProps = {
  // data: AppliedPartType;
  name: string[];
};

export const AppliedPart = ({ name }: AppliedPartProps) => {
  const form = Form.useFormInstance<MaterialSet>();
  // @Column("text", { nullable: true })
  // model?: string;

  // @ManyToOne(() => Material, { nullable: true })
  // material?: Material;

  // @Column(() => ProfileSet)
  // profileSet?: ProfileSet;

  // @Column(() => FinishSet)
  // finishSet?: FinishSet;
  // const { model, material, profileSet, finishSet } = data;

  const models = useModelsQuery();

  // const { data: materials } = useMaterialsQuery({
  //   type: form.getFieldValue([...name, "model"]),
  //   // purpose: "",
  // });

  if (!models.data) {
    return <MaterialSetSkeleton />;
  }

  return (
    <>
      <FormSelect
        name={[...name, "model"]}
        select={{
          placeholder: "Select a model",
          onChange: () => {
            form.setFieldValue([...name, "material"], null);
          },
        }}
        options={models.data.map((model) => ({ label: model, value: model }))}
      />

      <FormSelect
        select={{
          disabled: !form.getFieldValue([...name, "model"]),
          placeholder: !form.getFieldValue([...name, "model"])
            ? "Select model first!"
            : "Select material type",
        }}
        name={[...name, "material"]}
        options={
          // materials?.data.map((material) => ({
          //   label: material.name,
          //   value: material.id,
          // })) || []
          []
        }
      />
    </>
  );
};
