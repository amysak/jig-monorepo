import { PageSkeleton } from "@jigbid/ui";
import { useMatch } from "@tanstack/react-location";
import { Form, Row } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { debounce, findKey } from "lodash-es";
import { Job } from "type-defs";

import { useMutateJob, useQueryJob } from "hooks/queries";
import { LocationGenerics } from "router";
import { JobFormHeader, JobFormTerms } from "./components";
import { JobFormPreferences } from "./components/form/preferences";

type FormJob = Job & { estimateDate: Dayjs; proposalDate: Dayjs };

export function JobInfoForm() {
  const [form] = Form.useForm<FormJob>();
  const {
    params: { id },
  } = useMatch<LocationGenerics>();

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
      <Form form={form} onValuesChange={onValuesChange}>
        <JobFormHeader />
        <JobFormTerms />
        <JobFormPreferences />
      </Form>
    </Row>
  );
}
