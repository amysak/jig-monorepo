import { Raw } from "typeorm";

export const getRawSearch = (searchString: string) =>
  Raw((alias) => `LOWER(${alias}) LIKE '%${searchString.toLowerCase()}%'`);
