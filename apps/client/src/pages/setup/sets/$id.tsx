import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Form } from "antd";

import { MaterialSetView } from "components/material-set";
import { EditModal } from "features/edit";
import { api } from "lib/api";
import { setRoute } from "./routes";

export default function SetPage() {
  const params = useParams({ from: setRoute.id });

  const [form] = Form.useForm();

  const { data: materialSet } = useQuery({
    queryKey: ["material-sets", params.id],
    queryFn: () => api.materialSets.getById(params.id),
    onSuccess: form.setFieldsValue,
  });

  if (!materialSet) return null;

  const modalContent = <MaterialSetView materialSet={materialSet} />;

  return <EditModal content={modalContent} />;
}
