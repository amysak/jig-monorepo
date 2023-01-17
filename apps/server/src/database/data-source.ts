import * as dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

import { configuration } from "config";

dotenv.config();
export const getDataSource = async () => {
  const config = <{ db: DataSourceOptions }>await configuration();

  console.log("config => ", config);

  return new DataSource(config.db);
};

export default getDataSource();
