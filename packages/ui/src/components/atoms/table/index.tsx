import { Table as AntTable, TableProps as AntTableProps } from "antd";

export type TableProps<RecordType> = AntTableProps<RecordType>;

export const Table = <T extends Record<any, any>>(props: TableProps<T>) => {
  return <AntTable {...props} />;
};
