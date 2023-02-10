import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Form } from "antd";
import { debounce } from "lodash-es";

import { MaterialSetView } from "components/material-set";
import { EditModal } from "features/setup";
import { api } from "lib/api";
import { useMutateMaterialSet } from "lib/hooks/queries";
import { setRoute } from "./routes";

export default function SetPage() {
  const params = useParams({ from: setRoute.id });

  const [form] = Form.useForm();

  const { data: materialSet } = useQuery({
    queryKey: ["material-sets", params.id],
    queryFn: () => api.rooms.getById(params.id),
    onSuccess: form.setFieldsValue,
  });

  const { mutateAsync: mutateSet } = useMutateMaterialSet(
    form.getFieldValue("id"),
    {
      onSuccess: form.setFieldsValue,
    }
  );

  const modalContent = (
    <Form
      form={form}
      initialValues={materialSet}
      onValuesChange={debounce((values) => mutateSet(values), 300)}
    >
      <MaterialSetView materialSet={materialSet} />
    </Form>
  );

  return <EditModal content={modalContent} />;
}
