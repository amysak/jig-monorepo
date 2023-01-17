import { Typography } from "antd";

interface PaginateTableMetaDataProps {
  data: any[];
  count: number;
  filters: { pageSize: number; current: number } | any;
}

const { Title } = Typography;

export default function PaginateTableMetaData({
  data,
  count,
  filters,
}: PaginateTableMetaDataProps) {
  const currentPageSize = data.length;
  const currentStart = count ? (filters.skip || 0) + 1 : 0;
  const currentEnd = (filters.skip || 0) + currentPageSize;

  return (
    <Title level={4}>
      {currentStart} - {currentEnd} of {count}
    </Title>
  );
}

PaginateTableMetaData.defaultProps = {
  data: [[], 0],
};
