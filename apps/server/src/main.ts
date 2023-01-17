// loads dotenv as well
import { getDataSource } from "database/data-source";

import { Logger } from "@nestjs/common";
import type { NestExpressApplication } from "@nestjs/platform-express";

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<string> {
  const isProduction = process.env.NODE_ENV === "production";
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: false,
  });

  if (isProduction) {
    app.enable("trust proxy");
  }

  const dataSource = await getDataSource();

  try {
    await dataSource.initialize();
    Logger.log("DS init succeeded");
  } catch (error) {
    Logger.log(error);
  }

  const PORT = process.env.PORT || 5050;

  // TODO: configure later
  app.enableCors();

  await app.listen(PORT, () => {
    Logger.log(`Server running on port ${PORT}`);
  });

  return app.getUrl();
}

(async (): Promise<void> => {
  try {
    const url = await bootstrap();
    Logger.log(url, "Bootstrap");
  } catch (error) {
    Logger.error(error, "Bootstrap");
  }
})();
