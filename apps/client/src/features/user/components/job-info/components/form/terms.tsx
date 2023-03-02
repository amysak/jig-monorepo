import { Button, Card, Col, Form, Modal, Row, Space, Typography } from "antd";
import { useState } from "react";

import { FormRadioSet, FormSelect, PageSkeleton } from "@jigbid/ui";
import { useQueryTerms } from "lib/hooks/queries";
import { isMultiTerms } from "type-defs";

import { FormJob } from "../../core";
import { Conditions } from "../conditions";
import { TermsPayment } from "../modal";

const { Text, Paragraph, Title } = Typography;

export const JobFormTerms = () => {
  // Form that this component is wrapped with
  const formValues: FormJob = Form.useFormInstance().getFieldsValue(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: accountTerms, isLoading: isAllLoading } = useQueryTerms();

  const formTerms = formValues?.terms;

  if (!formTerms) {
    return <PageSkeleton />;
  }

  if (isAllLoading) {
    return <PageSkeleton />;
  }

  if (!accountTerms) {
    return <PageSkeleton />;
  }

  const termsOptions = accountTerms.data.map((term) => ({
    label: term.name,
    value: term.id,
  }));

  const toggleModal = () => setIsModalOpen((prevOpen) => !prevOpen);

  return (
    <Space direction="vertical" style={{ margin: "8px 0 5px", width: "100%" }}>
      <Card>
        <Row>
          <Col span={18}>
            <Title level={4}>Terms</Title>
            <Paragraph strong>
              Edit Default Terms and Conditions if necessary (DO NOT leave
              blank)
            </Paragraph>
          </Col>
          <Col span={6}>
            <Button size="small" onClick={toggleModal}>
              Terms Details
            </Button>
            <Modal open={isModalOpen} onCancel={toggleModal} footer={null}>
              <TermsPayment terms={formTerms} />
            </Modal>
          </Col>
        </Row>

        <Row>
          <Col span={16}>
            <FormSelect
              options={termsOptions}
              label="Terms Preset"
              name={["terms", "id"]}
            />

            {!isMultiTerms(formTerms) && formTerms.adjustTotal && (
              <FormRadioSet
                options={[
                  { label: "yes", value: true },
                  { label: "no", value: false },
                ]}
                label="Adjust Total to compensate for discount amount?"
                name={["terms", "adjustTotal"]}
              />
            )}

            <Paragraph>
              The Terms for this Estimate or Proposal will read as follows:
            </Paragraph>

            <Paragraph style={{ paddingRight: "10px" }} strong>
              {formTerms.text}
            </Paragraph>
          </Col>

          <Col span={8} style={{ textAlign: "center" }}>
            <Text>Terms Choice</Text>

            <br />
            <Conditions
              title="Estimate Conditions"
              name={["terms", "conditions", "estimate"]}
            />

            <br />
            <Conditions
              title="Proposal Conditions"
              name={["terms", "conditions", "proposal"]}
            />
          </Col>
        </Row>
      </Card>
    </Space>
  );
};
