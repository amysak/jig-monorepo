import { Col, Row } from "antd";
import dayjs from "dayjs";
import { FC, useCallback } from "react";
import type { DashboardEntities } from "type-defs";

import { useLineSettingsType } from "../hooks/useLineSettings";
import { Ranges } from "../utils";
import { DatePicker } from "./DatePicker";
import { RangePicker } from "./RangePicker";
import { Title } from "./Title";

import "./Settings.styles.scss";

interface SettingsProps extends ReturnType<useLineSettingsType> {
  entityName: DashboardEntities;
  range: Ranges;
  isLoading: boolean;
}

export const Settings: FC<SettingsProps> = ({
  entityName,
  range,
  isLoading,
  responseDates,
  setResponseDates,
  temporaryDate,
  setTemporaryDate,
  setRange,
}) => {
  const handleRangeChange = useCallback<(selectedRange: Ranges) => void>(
    (range) => {
      if (range === Ranges.week) {
        const date = dayjs((responseDates as any)[0])
          .utc(false)
          .startOf(range);

        setResponseDates([date, date.clone().add(7, "day")]);
        setTemporaryDate([null, null]);
      }
      setRange(range);
    },

    [responseDates, setRange, setResponseDates, setTemporaryDate]
  );
  return (
    <Row gutter={[5, 8]} justify="space-between" align="stretch">
      <Col xs={24} className="settings-title">
        <Title entity={entityName} period={range} />
      </Col>

      <Col xs={24}>
        <Row justify="space-between" align="stretch" gutter={[10, 10]}>
          <Col span={16}>
            <DatePicker
              temporaryDate={temporaryDate}
              setTemporaryDate={setTemporaryDate}
              responseDates={responseDates}
              setResponseDates={setResponseDates}
              range={range}
            />
          </Col>

          <Col>
            <RangePicker
              isLoading={isLoading}
              range={range}
              onSelectRange={handleRangeChange}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
