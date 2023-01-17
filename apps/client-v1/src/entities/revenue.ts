import { AccountStats } from "./account";

export type RevenueStats = AccountStats<{ date: string; sum: number }>;
