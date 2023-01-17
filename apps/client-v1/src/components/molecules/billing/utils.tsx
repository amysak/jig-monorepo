import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import CurrencyFormatter from "react-currency-format";

dayjs.extend(relativeTime);
interface CurrencyProps {
  value: any | number;
}

const Currency = ({ value }: CurrencyProps) => (
  <CurrencyFormatter
    className="plancard-cost"
    value={parseFloat(value || 0)}
    displayType={"text"}
    thousandSeparator={true}
    prefix={"$"}
  />
);

function findAccountPlan(accountPlan: { id: string; priceId: string }) {
  return plans.find((plan) => {
    return plan.id === accountPlan.priceId;
  });
}

function getExpiry(start, end) {
  const exp = dayjs.unix(start).to(dayjs.unix(end));

  if (exp === "Invalid date") return "";

  return exp;
}

const plans = [
  {
    name: "Monthly",
    plan: "monthly",
    cost: 50,
    description: "Billed Monthly",

    id: process.env.SUBSCRIPTION_MONTHLY,
  },
  {
    name: "Yearly",
    plan: "yearly",
    cost: 500,
    description: "Billed Yearly",

    id: process.env.SUBSCRIPTION_YEARLY,
  },
];

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export { Currency, plans, findAccountPlan, CARD_ELEMENT_OPTIONS, getExpiry };
