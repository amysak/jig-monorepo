import { capitalize, safeNum, toFixed } from "./utils";

const inputNumberPercentProps = {
  min: 0,
  max: 100,

  formatter: (value: number, { userTyping, input }) => {
    if (userTyping) {
      return input;
    }

    return value ? `${toFixed(value)}%` : 0;
  },

  parser: (value: string) => value.replace("%", ""),
  precision: 2,
  controls: false,
  style: { width: "100px" },
};

const inputNumberCostProps = {
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

const inputNumberProps = {
  min: 0,
  step: 0.1,
  controls: false,

  formatter: (value: number, { userTyping, input }) => {
    if (userTyping) {
      return input;
    }

    return value ? `${toFixed(value)}` : 0;
  },
  style: { width: "100px" },
};

const inputNumberPropsThreeDecimal = {
  min: 0,
  step: 0.1,
  controls: false,

  formatter: (value: number, { userTyping, input }) => {
    if (userTyping) {
      return input;
    }

    return value ? `${toFixed(value, 3)}` : 0;
  },
  style: { width: "100px" },
};

const inputNumberPropsNoDecimal = {
  min: 0,
  step: 1,
  controls: false,

  parser: (value: number) => safeNum(Math.round(value)),

  formatter: (value: number) => safeNum(Math.round(value)),
  style: { width: "100px" },
};

const cleanParam = (urlParam: string) => {
  return capitalize(urlParam?.split("-")?.join(" "), true);
};

const buildSelectOptions = (list: any[], current: { id: any }) => {
  if (!current) return list || [];

  const found = list.find((item: { id: any }) => item.id === current?.id);

  return found ? list : [...list, current];
};

export {
  inputNumberPercentProps,
  inputNumberCostProps,
  inputNumberPropsNoDecimal,
  inputNumberPropsThreeDecimal,
  inputNumberProps,
  cleanParam,
  buildSelectOptions,
};
