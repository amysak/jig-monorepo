import { InputNumberProps } from "antd";

export const percentInputProps: InputNumberProps = {
  min: 0,
  max: 100,

  formatter: (value, { userTyping, input }) => {
    if (userTyping || !value || isNaN(+value)) {
      return input;
    }

    const numValue = +value;

    return numValue
      ? `${(numValue as number).toFixed(2)}%`
      : numValue.toString();
  },

  parser: (value) => (value ? value.replace("%", "") : ""),
  controls: false,
  style: { width: "100px" },
};

export const costInputProps: InputNumberProps = {
  min: 0,
  step: 0.1,
  controls: false,

  formatter: (value, { userTyping, input }) => {
    if (userTyping || !value || isNaN(+value)) {
      return input;
    }

    const numValue = +value;

    return numValue
      ? `$${(numValue as number).toFixed(2)}`
      : numValue.toString();
  },

  parser: (value) => (value ? value.replace("$", "") : ""),
  style: { width: "100px" },
};

export const fullWidthProps = { style: { width: "100%" } };
