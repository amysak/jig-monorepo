export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;

      DB_TYPE: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;

      STRIPE_SECRET_KEY: string;
      STRIPE_PUBLIC_KEY: string;
      MAIL_GUN_PRIVATE_KEY: string;
      MAIL_GUN_PUBLIC_KEY: string;
      JWT_SECRET: string;

      SUPER_ACC_EMAIL: string;
      SUPER_ACC_PW: string;
    }
  }

  namespace Express {
    interface Request {
      user: { accountId: string; email: string; role: string };
      isAuthenticated: () => boolean;
      logIn: () => void;
    }
    // // eslint-disable-next-line @typescript-eslint/no-empty-interface
    // interface User extends Payload {}
  }
}
