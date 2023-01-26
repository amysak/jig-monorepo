import { FormInput } from "@jigbid/ui";
import { useMatch, useNavigate } from "@tanstack/react-location";
import { Form, Modal } from "antd";

import {
  useCabinetQuery,
  useCachedCabinet,
  useMutateCabinet,
} from "hooks/queries";
// import { debounce } from "lodash-es";
import { LocationGenerics } from "router";
import { Cabinet } from "type-defs";

export const EditCabinet = () => {
  const [form] = Form.useForm<Cabinet>();
  const setFormFields = (cabinet: Cabinet) => {
    form.setFieldsValue(cabinet);
  };

  const {
    params: { id },
  } = useMatch<LocationGenerics>();
  const navigate = useNavigate<LocationGenerics>();

  const { refetch } = useCabinetQuery(id, {
    enabled: false,
    onSuccess: (data) => setFormFields(data),
  });

  // Checking for existing queries with requested cabinet
  // Using the same constant to render the form
  const cachedCabinet = useCachedCabinet(id);

  if (!cachedCabinet) {
    refetch();
  } else {
    setFormFields(cachedCabinet);
  }

  // Calling mutate cabinet hook
  const { mutate: mutateCabinet } = useMutateCabinet(id);

  return (
    <Modal
      title="Edit Cabinet"
      open={!!id}
      footer={null}
      onCancel={() => navigate({ to: "/setup/cabinets" })}
    >
      <Form
        form={form}
        onFinish={(values) => mutateCabinet(values)}
        // onChange={debounce(() => mutateCabinet(id), 300)}
      >
        <FormInput name="name" label="Name" />
      </Form>
    </Modal>
  );
};

export default EditCabinet;
