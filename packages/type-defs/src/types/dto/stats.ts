import { IsIn, IsNumberString, IsString } from "class-validator";

import { Range, RANGE, StatsOption, STATS_OPTION } from "../enums";

export class GetStatsDto {
  @IsString()
  @IsIn(Object.values(STATS_OPTION))
  type!: StatsOption;

  @IsString()
  @IsIn(Object.values(RANGE))
  range?: Range;

  @IsString()
  @IsNumberString()
  date?: string;
}

export type AccountStats = {
  total: number;
  selected: number;
  data?: {
    date: string;
    value: number;
  }[];
};
