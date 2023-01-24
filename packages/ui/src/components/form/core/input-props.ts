import { InputNumberProps } from "antd";

const isValidNumber = (value: any): value is number => {
  return !!value && !isNaN(value);
};

const generateFormatter =
  (
    formatFunc?: (value: string) => string,
    precision = 2
  ): InputNumberProps["formatter"] =>
  (value, { userTyping, input }) => {
    const numValue = Number(value);
    if (userTyping || !isValidNumber(numValue)) {
      return input;
    }

    const fixedValue = numValue.toFixed(precision);
    return formatFunc ? formatFunc(fixedValue) : fixedValue;
  };

export const percentInputProps: InputNumberProps = {
  min: 0,
  max: 100,
  controls: false,
  style: { width: "100px" },
  formatter: generateFormatter((value) => `${value}%`),
  parser: (value) => (value ? value.replace("%", "") : ""),
};

export const costInputProps: InputNumberProps = {
  min: 0,
  step: 0.1,
  controls: false,
  style: { width: "100px" },
  formatter: generateFormatter((value) => `${value}`),
  parser: (value) => (value ? value.replace("$", "") : ""),
};

export const inputNumberProps: InputNumberProps = {
  min: 0,
  step: 0.1,
  controls: false,
  style: { width: "100px" },
  formatter: generateFormatter(),
};

export const inputNumberPropsThreeDecimal: InputNumberProps = {
  min: 0,
  step: 0.1,
  controls: false,
  style: { width: "100px" },
  formatter: generateFormatter((value) => value, 3),
};

export const inputNumberPropsNoDecimal: InputNumberProps = {
  min: 0,
  step: 1,
  controls: false,
  style: { width: "100px" },
  parser: (displayValue) => (displayValue ? +displayValue : NaN),
  formatter: (value) => value?.toString() || "",
};

export const fullWidthProps = { style: { width: "100%" } };
