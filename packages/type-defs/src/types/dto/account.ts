import { IsIn, IsNumber, IsObject, IsString } from "class-validator";
import { AccountRole, ACCOUNT_ROLE } from "../enums";
import { Account } from "../models";

export class GetMeResult {
  @IsNumber()
  accountId: number;

  @IsString()
  email: string;

  @IsString()
  @IsIn(Object.values(ACCOUNT_ROLE))
  role: AccountRole | string;

  @IsObject()
  account: Omit<Account, "salt" | "password" | "stripe">;
}
