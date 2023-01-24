import { forEach, isEmpty, isPlainObject } from "lodash-es";
import { capitalize } from "./utils";

export const cleanParam = (urlParam: string) => {
  return capitalize(urlParam?.split("-")?.join(" "), true);
};

// TODO: can be typed better
export const flattenObject = (
  obj: Record<string, unknown>
): Record<string, unknown> => {
  const preparedObject = { ...obj };

  return Object.keys(preparedObject).reduce((acc, key) => {
    if (
      typeof preparedObject[key] !== "object" ||
      Array.isArray(preparedObject[key]) ||
      !preparedObject[key]
    ) {
      return {
        ...acc,
        [key]: preparedObject[key],
      };
    }

    const flattenedChild = flattenObject(
      preparedObject[key] as Record<string, unknown>
    );
    delete preparedObject[key];

    return {
      ...acc,
      ...flattenedChild,
    };
  }, {});
};

export const cleanObject = (obj: Record<string, unknown>) => {
  forEach(obj, (value, key) => {
    if (isPlainObject(value)) {
      cleanObject(value as Record<string, unknown>);
      if (isEmpty(value)) {
        delete obj[key];
      }
    } else {
      if (!value) {
        delete obj[key];
      }
    }
  });
  return obj;
};

// const buildSelectOptions = (list: any[], current: { id: any }) => {
//   if (!current) return list || [];

//   const found = list.find((item: { id: any }) => item.id === current?.id);

//   return found ? list : [...list, current];
// };
