import { capitalize } from "lodash-es";

export const prepareAntdCollection = (arrayOfItems: string[]) =>
  arrayOfItems.map((item) => ({
    key: item,
    label: capitalize(item).replaceAll("_", " "),
  }));
