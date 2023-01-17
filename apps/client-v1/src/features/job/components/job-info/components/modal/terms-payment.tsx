import { Form } from "antd";

import { FormInput, FormNumberInput, FormRadioSet } from "components/form";
import { Terms } from "entities";
import { ReactElement } from "react";

const orderNames = ["first", "second", "third"];

interface PaymentProps {
  terms: Terms;
}

export const TermsPayment = ({ terms }: PaymentProps) => {
  const termsText = (
    <Form.Item
      shouldUpdate
      label="These Terms for Estimates or Proposals will read as follows"
    >
      {terms.text}
    </Form.Item>
  );

  let content: ReactElement;

  if (terms.type === "multi") {
    const paymentsCount = terms.payments.length;

    const inputs = new Array(paymentsCount).fill(0);

    content = (
      <>
        {inputs.map((_, i) => (
          <FormNumberInput
            key={orderNames[i]}
            percent
            label={`Enter the percentage of the ${orderNames[i]} payment`}
            name={["preferences", "terms", "payments", i, "percentage"]}
          />
        ))}
      </>
    );
  } else {
    if (!terms.discountPercent) {
      content = (
        <FormInput
          name={["preferences", "terms", "paymentDue"]}
          label="Number of days when the balance is due"
        />
      );
    } else {
      content = (
        <>
          <FormNumberInput label="Discount %" name="discountPercent" />

          <FormNumberInput
            label="Number of days that discount is available"
            name={["preferences", "terms", "discountDue"]}
          />

          <FormNumberInput
            name="paymentDue"
            label="Number of days when the balance is due"
          />

          <FormRadioSet
            options={[
              { label: "yes", value: true },
              { label: "no", value: false },
            ]}
            label="Adjust Total to compensate for discount amount?"
            name={["preferences", "terms", "adjustTotal"]}
          />
        </>
      );
    }
  }

  return (
    <>
      {content}
      {termsText}
    </>
  );
};
