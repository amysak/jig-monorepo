import { PageSkeleton } from "@jigbid/ui";
import { useMatch } from "@tanstack/react-location";
import { Form, Space } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { debounce, findKey } from "lodash-es";
import { Job } from "type-defs";

import { useMutateJob, useQueryJob } from "hooks/queries";
import { LocationGenerics } from "router";
import { JobFormHeader, JobFormTerms } from "./components";
import { JobFormPreferences } from "./components/form/preferences";
import { useEffect } from "react";

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

  const { data: job, isLoading, isError } = useQueryJob(id);

  const { mutate: mutateJob } = useMutateJob(id, {
    onSuccess: refillForm,
  });

  useEffect(() => {
    if (job) {
      refillForm(job);
    }
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
    <Space direction="vertical" style={{ width: "100%" }}>
      <Form form={form} onValuesChange={onValuesChange}>
        <JobFormHeader />
        <JobFormTerms />
        <JobFormPreferences />
      </Form>
    </Space>
  );
}
