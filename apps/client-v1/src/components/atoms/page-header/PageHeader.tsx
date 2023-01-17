import {
  PageHeader as AntPageHeader,
  PageHeaderProps as AntPageHeaderProps,
} from "@ant-design/pro-layout";

type PageHeaderProps = AntPageHeaderProps;

export const PageHeader = (props: PageHeaderProps) => {
  return <AntPageHeader {...props} />;
};
