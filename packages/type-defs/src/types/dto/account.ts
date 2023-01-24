import { Transform } from "class-transformer";
import { IsIn, IsNumber, IsObject, IsString } from "class-validator";

import { RANGE, STATS_OPTION, type Range, type StatsOption } from "../enums";

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

export class GetStatsDto {
  @IsString()
  @IsIn(Object.values(STATS_OPTION))
  type!: StatsOption;

  @IsString()
  @IsIn(Object.values(RANGE))
  range!: Range;

  @IsNumber()
  @Transform(({ value }) => (parseInt(value) ? parseInt(value) : 0))
  date!: number;
}

export type AccountStats = {
  total: number;
  selected: number;
  data?: {
    date: string;
    value: number;
  }[];
};
