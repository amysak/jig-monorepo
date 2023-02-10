import { capitalize } from "lodash-es";

export const prepareAntdCollection = (arrayOfItems: readonly string[]) =>
  arrayOfItems.map((item) => ({
    key: item,
    label: capitalize(item).replace(/[_-]/g, " "),
  }));
