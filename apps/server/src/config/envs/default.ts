import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const config = {
  db: {
    entities: [`${__dirname}/../../database/entities/*.{js,ts}`],
    migrations: [`${__dirname}/../../database/migrations/*.{js,ts}`],
    subscribers: [`${__dirname}/../../database/subscribers/*.{js,ts}`],
    namingStrategy: new SnakeNamingStrategy(), // transforms model fields to snake_case
    autoLoadEntities: true,
  },
};
