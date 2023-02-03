import { cloneDeep, forEach, isEmpty, isPlainObject } from "lodash-es";
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
    if (Array.isArray(preparedObject[key])) {
      return { ...acc, [key]: (preparedObject[key] as any[]).join(",") };
    }

    if (typeof preparedObject[key] !== "object" || !preparedObject[key]) {
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
  const newObj = cloneDeep(obj);

  forEach(newObj, (value, key) => {
    if (isPlainObject(value)) {
      const cleanedValue = cleanObject(value as Record<string, unknown>);
      if (isEmpty(cleanedValue)) {
        delete newObj[key];
      } else {
        newObj[key] = cleanedValue;
      }
    } else {
      if (!value) {
        delete newObj[key];
      }
    }
  });

  return newObj;
};

// const buildSelectOptions = (list: any[], current: { id: any }) => {
//   if (!current) return list || [];

//   const found = list.find((item: { id: any }) => item.id === current?.id);

//   return found ? list : [...list, current];
// };
