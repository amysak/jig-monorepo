import { IsIn, IsNumberString, IsString } from "class-validator";

const accountStatTypes = ["revenue", "jobs", "clients"] as const;
export type AccountStatType = typeof accountStatTypes[number];

const dataRanges = ["week", "month", "year"] as const;
export type StatsDataRange = typeof dataRanges[number];

export class GetAccountStatsDTO {
  @IsString()
  @IsIn(accountStatTypes)
  type!: AccountStatType;

  @IsString()
  @IsIn(dataRanges)
  range?: StatsDataRange;

  @IsString()
  @IsNumberString()
  date?: string;
}
