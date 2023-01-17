export type HttpError = {
  statusCode: number;
  message?: string[];
  timestamp: string;
  path: string;
};

export type ResponseDataWithCount = {
  count: number;
  data: any[];
};
