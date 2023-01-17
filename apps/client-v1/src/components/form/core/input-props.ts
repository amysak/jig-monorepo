import { toFixed } from "utilities/utils";

export const percentInputProps = {
  min: 0,
  max: 100,

  formatter: (value: number, { userTyping, input }) => {
    if (userTyping) {
      return input;
    }

    return `${value}%`;
  },

  parser: (value: string) => Number(value.replace("%", "")),
  controls: false,
  style: { width: "100px" },
};

export const costInputProps = {
  min: 0,
  step: 0.1,
  controls: false,

  formatter: (value: number, { userTyping, input }) => {
    if (userTyping) {
      return input;
    }

    return value ? `$${toFixed(value)}` : 0;
  },

  parser: (value: string) => value.replace("$", ""),
  style: { width: "100px" },
};

export const fullWidthProps = { style: { width: "100%" } };
