import { PageSkeleton } from "@jigbid/ui";
import { Form, Space } from "antd";
import { dayjs, Dayjs } from "lib/dayjs";
import { debounce } from "lodash-es";
import { useEffect } from "react";
import { Job } from "type-defs";

import { useMatch } from "hooks/router";
import { useMutateJob, useQueryJob } from "hooks/queries";

import { JobFormHeader, JobFormTerms } from "./components";
import { JobFormPreferences } from "./components/form/preferences";

type FormJob = Job & { estimateDate: Dayjs; proposalDate: Dayjs };

export function JobInfoForm() {
  const [form] = Form.useForm<FormJob>();
  const {
    params: { id },
  } = useMatch();

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

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Form
        form={form}
        onValuesChange={debounce((values) => mutateJob(values), 300)}
      >
        <JobFormHeader />
        <JobFormTerms />
        <JobFormPreferences />
      </Form>
    </Space>
  );
}
