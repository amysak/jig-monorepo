import { ResponsiveLine, Serie } from "@nivo/line";
import { Col, Row } from "antd";
import { isNil, upperFirst } from "lodash-es";
import { CSSProperties, useMemo } from "react";

import { SkeletonInput, Title } from "@jigbid/ui";
import { STATS_OPTION, type UserStats, type StatsOption } from "type-defs";

import { useLineSettingsType } from "../hooks/useLineSettings";
import { LineColorsByEntities, prepareData } from "../utils";
import { Settings } from "./Settings";

import "./Line.styles.scss";

const getDefaultData = (color: unknown, entity: StatsOption): Serie[] => [
  { id: entity, data: [], color },
];

interface LineProps extends ReturnType<useLineSettingsType> {
  data: UserStats;
  isLoading: boolean;
  entity: StatsOption;
}

// TODO: please refactor

export const Line = ({
  data,
  range,
  setRange,
  isLoading,
  entity,
  responseDates,
  setResponseDates,
  temporaryDate,
  setTemporaryDate,
}: LineProps) => {
  const title = `${upperFirst(entity)} Growth`;

  const style: CSSProperties = useMemo(
    () => ({ color: LineColorsByEntities[entity] }),
    [entity]
  );

  // it's pizdec
  const _data = useMemo(
    () =>
      isLoading || isNil(data)
        ? getDefaultData(style.color, entity)
        : prepareData((responseDates as any)[0], range, data, entity),
    [data, entity, isLoading, range, responseDates, style.color]
  );

  const subTitle = useMemo(() => {
    const total = isNil(_data) ? 0 : _data[0]?.total;
    const totalRevenue = `$${total}`;
    const plus = isNil(_data) ? 0 : _data[0]?.selected;

    return (
      <div className="line-counters">
        <Title className="line-count" level={5}>
          {entity === STATS_OPTION.REVENUE ? totalRevenue : total}
        </Title>
        {!(entity === STATS_OPTION.REVENUE) && (
          <Title
            className="line-count"
            level={5}
            style={style}
          >{` (+${plus})`}</Title>
        )}
      </div>
    );
  }, [_data, entity, style]);

  return (
    <Row
      justify="space-between"
      gutter={[5, 5]}
      align="stretch"
      className="card activityCard"
    >
      <Col xs={24}>
        <Row gutter={[5, 3]} className="line-main-title">
          <Col xs={24}>
            <Title style={style} level={5}>
              {title}
            </Title>
          </Col>
          <Col xs={24}>
            <div className="line-main-title-skeleton-container">
              {isLoading ? (
                <SkeletonInput size="small" active={isLoading} />
              ) : (
                subTitle
              )}
            </div>
          </Col>
        </Row>
      </Col>

      <Col xs={24}>
        <Settings
          responseDates={responseDates}
          setResponseDates={setResponseDates}
          temporaryDate={temporaryDate}
          setTemporaryDate={setTemporaryDate}
          range={range}
          setRange={setRange}
          isLoading={isLoading}
          entityName={entity}
        />
      </Col>

      <Col xs={24}>
        <div style={{ height: 300 }}>
          <ResponsiveLine
            useMesh={true}
            data={_data}
            margin={{
              top: 40,
              right: 20,
              bottom: 30,
              left: 40,
            }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legendOffset: -40,
              legendPosition: "middle",
            }}
            pointSize={10}
            pointColor={style.color}
            pointBorderWidth={3}
            pointLabelYOffset={-12}
            enablePointLabel={true}
            enableGridX={true}
            enableGridY={true}
            pointLabel={({ y }) => `+${y.toString()}`}
            lineWidth={3}
            enableCrosshair={true}
            colors={[style.color || ""]}
            isInteractive={true}
          />
        </div>
      </Col>
    </Row>
  );
};
