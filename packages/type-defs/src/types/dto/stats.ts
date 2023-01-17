export type AccountStats = {
  total: number;
  selected: number;
  data?: {
    date: string;
    value: number;
  }[];
};
