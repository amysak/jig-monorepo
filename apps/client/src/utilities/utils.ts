import { delay, isEmpty, slice } from "lodash-es";

type TKeyMirror<Type> = {
  [Property in keyof Type]: Property;
};

function keyMirror<A extends Record<string, string>>(obj: A): TKeyMirror<A> {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = key;

    return acc;
  }, {}) as TKeyMirror<A>;
}

function capitalize(str: string, each = true) {
  if (!str) return str;

  const handle = (c: string) => `${c.charAt(0).toUpperCase()}${c.slice(1)}`;

  if (!each) return handle(str);

  return str
    .split(" ")
    .map((word) => handle(word))
    .join(" ");
}

function lowerCase(str: string) {
  return typeof str === "string" ? str.toLowerCase() : "";
}

const pointToString = (point: { start: any; end: any }) => {
  return [...point.start, ...point.end].join(",");
};

function polyPoints(canvas: any, points: any[]) {
  const lineStrokeColor = "#000000";
  const lineStrokeWidth = 1;

  points.forEach((point) => {
    canvas
      .append("polyline")
      .attr("stroke", lineStrokeColor)
      .attr("stroke-width", lineStrokeWidth)
      .attr("fill", "none")
      .attr("points", pointToString(point));
  });
}

export function drawCircles(canvas: any, points: { start: number[] }[]) {
  const lineStrokeColor = "#000000";

  points.forEach(({ start }) => {
    canvas
      .append("circle")
      .style("stroke", lineStrokeColor)
      .style("fill", lineStrokeColor)
      .attr("r", 3)
      .attr("cx", start[0])
      .attr("cy", start[1]);
  });
}

function setTableRowClass(id) {
  return (record: { id: any }) => {
    const classname =
      record.id === id ? `${record.id} selected-row` : record.id;

    return classname;
  };
}

export interface ISerializedResponse<T> {
  data: T[];
  total: number;
}

function serializeResponse(data: any[]) {
  return { data: data[0], total: data[1] };
}

function sleep(ms: number | (() => void)) {
  // @ts-expect-error TS(2345): Argument of type 'number | (() => void)' is not as... Remove this comment to see the full error message
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const safeNum = (num: string | number) => {
  const result = parseFloat(num.toString());

  return isNaN(result) ? 0 : result;
};

const calcDiscountSalePrice = (price: number, discount: number) => {
  const savings = (safeNum(discount) / 100) * safeNum(price);
  const discountPrice = price - savings;

  return discountPrice;
};

const calcDiscount = (cost = 0, percentage = 0) => {
  try {
    return safeNum(cost ?? 0) * (safeNum(percentage ?? 0) / 100);
  } catch (error) {
    return 0;
  }
};

const getQueryString = (filters = {}) => {
  return new URLSearchParams(filters).toString();
};

const range = (len: number) => Array.from(Array(len)).map((_, i) => i);

const countCabDrawerProp = (drawers: any[], prop: string | number) =>
  drawers?.reduce((counter: string | number, drawer: { [x: string]: any }) => {
    // @ts-expect-error TS(2365): Operator '+=' cannot be applied to types 'string |... Remove this comment to see the full error message
    counter += drawer[prop] ? 1 : 0;

    return counter;
  }, 0);

const sumCabDrawerProp = (
  drawers: Record<string, unknown>[],
  prop: string,
  size: number
) =>
  slice(drawers || [], 0, size).reduce(
    (counter, drawer: { [x: string]: any }) => {
      counter += drawer[prop] ?? 0;

      return counter;
    },
    0
  );

const isObjWithKeysEmpty = (obj: { [x: string]: any }) =>
  !!Object.values(obj).find((value) => !!value);

const countNoneEmptyObjList = (list: any[]) => {
  return list?.reduce(
    (
      count: string | number,
      obj: { [x: string]: any; id: any; cabinet: any }
    ) => {
      // eslint-disable-next-line unused-imports/no-unused-vars
      const { id, cabinet, ...rest } = obj;

      // @ts-expect-error TS(2365): Operator '+=' cannot be applied to types 'string |... Remove this comment to see the full error message
      count += isObjWithKeysEmpty(rest) ? 1 : 0;

      return count;
    },
    0
  );
};

const toFixed = (digits: number, fix = 2) => safeNum(digits).toFixed(fix);

const defaultPagination = {
  pageSize: 20,
  current: 1,
  limit: 20,
  skip: 0,
};

const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

const createOptions = (value: string) => ({
  label: capitalize(value),
  value,
});

export const asyncDelay = (ms = 1000) => {
  return new Promise<void>((res) => {
    delay(() => res(), ms);
  });
};

export {
  isEmpty,
  keyMirror,
  capitalize,
  lowerCase,
  polyPoints,
  setTableRowClass,
  serializeResponse,
  sleep,
  calcDiscount,
  safeNum,
  getQueryString,
  range,
  countCabDrawerProp,
  sumCabDrawerProp,
  countNoneEmptyObjList,
  defaultPagination,
  toFixed,
  months,
  calcDiscountSalePrice,
  createOptions,
};
