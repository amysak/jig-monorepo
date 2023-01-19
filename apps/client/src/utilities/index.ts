import { capitalize } from "./utils";

const cleanParam = (urlParam: string) => {
  return capitalize(urlParam?.split("-")?.join(" "), true);
};

// const buildSelectOptions = (list: any[], current: { id: any }) => {
//   if (!current) return list || [];

//   const found = list.find((item: { id: any }) => item.id === current?.id);

//   return found ? list : [...list, current];
// };

export { cleanParam };
