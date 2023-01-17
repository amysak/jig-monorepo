import { Tabs as AntTabs, TabsProps as AntTabsProps } from "antd";
import { FC } from "react";

export type TabsProps = AntTabsProps;

export const Tabs: FC<TabsProps> = (props: TabsProps) => {
  return <AntTabs {...props} />;
};

export const TabPane = AntTabs.TabPane;
