import { Form, Row } from "antd";
import dayjs from "dayjs";
import { debounce, findKey } from "lodash";
import { useParams } from "react-router-dom";

import { PageSkeleton } from "components/skeleton";
import { Job } from "entities";
import { useMutateJob, useQueryJob } from "hooks/queries";
import { JobFormHeader, JobFormTerms } from "./components";
import { JobFormPreferences } from "./components/form/preferences";

export function JobInfoForm() {
  const [form] = Form.useForm<Job>();
  const { id } = useParams();

  const refillForm = (values: Partial<Job>) => {
    form.setFieldsValue({
      ...values,
      estimateDate: dayjs(values.estimateDate),
      proposalDate: dayjs(values.proposalDate),
    });
  };

  const {
    data: job,
    isLoading,
    isError,
  } = useQueryJob(id, {
    onSuccess: refillForm,
  });

  const { mutate: mutateJob } = useMutateJob(id, {
    onSuccess: refillForm,
  });

  if (!job || isLoading) {
    // TODO
    return <PageSkeleton />;
  }

  if (isError) {
    // TODO
    return <div>There was an error fetching a job for you</div>;
    // return <ErrorScreen/>
  }

  const onValuesChange = (changedValues) => {
    const cb = () =>
      mutateJob({
        ...changedValues,
        estimateDate: changedValues.estimateDate?.toDate(),
        proposalDate: changedValues.proposalDate?.toDate(),
      });

    if (findKey(changedValues, "id")) {
      return cb;
    } else {
      return debounce(cb, 500);
    }
  };

  return (
    <Row justify="center">
      <Form
        form={form}
        // TODO: apply debounce only if not updating the id of related entity
        onValuesChange={onValuesChange}
      >
        <JobFormHeader />
        <JobFormTerms />
        <JobFormPreferences />
      </Form>
    </Row>
  );
}
