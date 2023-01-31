import { Row } from "antd";
import React, { FC, useMemo } from "react";

import { Text } from "@jigbid/ui";
import type { StatsOption } from "type-defs";

import { LineColorsByEntities } from "../utils";

interface TitleProps {
  entity: StatsOption;
  period: string;
}

export const Title: FC<TitleProps> = ({ entity, period }) => {
  const style: React.CSSProperties = useMemo(
    () => ({ color: LineColorsByEntities[entity] }),
    [entity]
  );
  const subTitle = `Total ${entity} Growth per ${period}`;

  return (
    <Row>
      <Text style={style}>{subTitle}</Text>
    </Row>
  );
};
