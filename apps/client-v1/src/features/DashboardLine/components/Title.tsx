import React, { FC, useMemo } from "react";

import { Row, Text } from "components/atoms";
import { DashboardEntities } from "entities";

import { LineColorsByEntities } from "../utils";

interface TitleProps {
  entity: DashboardEntities;
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
