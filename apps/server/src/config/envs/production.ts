export const config = {
  db: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    //   autoLoadEntities: true,
    //   replication: {
    //     master: {
    //       host: process.env.DB_HOST || "masterHost",
    //       port: process.env.DB_PORT || 3306,
    //       username: process.env.DB_USER || "username",
    //       password: process.env.DB_PASSWORD || "password",
    //       database: process.env.DB_NAME || "dbname",
    //     },
    //     slaves: [
    //       {
    //         // fix if necessary
    //         host: "slaveHost",
    //         port: 3306,
    //         username: "username",
    //         password: "password",
    //         database: "dbname",
    //       },
    //     ],
    //   },
    // },
  },
  jwtSecret: process.env.JWT_SECRET,
  extra: {
    connectionLimit: 30,
  },
};
