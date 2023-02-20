import { Transform } from "class-transformer";
import { IsIn, IsNumber, IsObject, IsString } from "class-validator";

import { RANGE, STATS_OPTION, type Range, type StatsOption } from "../enums";

import { UserRole, USER_ROLE } from "../enums";
import { User } from "../models";

export class GetMeResult {
  @IsNumber()
  userId: number;

  @IsString()
  email: string;

  @IsString()
  @IsIn(USER_ROLE)
  role: UserRole | string;

  @IsObject()
  user: Omit<User, "salt" | "password" | "stripe">;
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

export type UserStats = {
  total: number;
  selected: number;
  data?: {
    date: string;
    value: number;
  }[];
};
