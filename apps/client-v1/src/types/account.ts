export type AccountRecord = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type JwtAccount = {
  sub: string;
  email: string;
  role: string;
  exp: number;
  iat: number;

  account: AccountRecord;
};

export type TokenPair = { accessToken: string; refreshToken: string };

export type SigninDto = {
  email: string;
  password: string;
};

export type SignupDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
