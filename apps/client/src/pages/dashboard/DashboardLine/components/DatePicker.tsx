import {
  DatePicker as BaseDatePicker,
  RangePicker,
} from "client-v1/src/components/atoms";
// TODO: create a global date object and reuse it from utils
import isBetween from "dayjs/plugin/isBetween";
import dayjs, { Dayjs } from "dayjs";
import React, { useCallback, useState } from "react";

import { formatsByRange, Ranges } from "../utils";

import { useLineSettingsType } from "../hooks/useLineSettings";

import { isNil } from "lodash-es";
import "./DatePicker.styles.scss";

interface DatePickerProps
  extends Omit<ReturnType<useLineSettingsType>, "setRange"> {
  range: Ranges;
}

dayjs.extend(isBetween);

export const DatePicker: React.FC<DatePickerProps> = ({
  range,
  responseDates,
  setResponseDates,
  temporaryDate,
  setTemporaryDate,
}) => {
  const [isOpen, setOpen] = useState(false);

  const disabledDate = useCallback(
    (current: Dayjs) => {
      if (!temporaryDate) {
        return false;
      }
      const [firstDate, secondDate] = temporaryDate;

      const getDisabled = (date?: Dayjs, isStart = false) => {
        if (isNil(date)) return false;

        const tooLate = isStart
          ? current.diff(date, "days") > 6
          : date.diff(current, "days") > 6;

        const isFirstSelectedDate = current.isSame(date, "day");

        const isBetweenArgs: [Dayjs, Dayjs] = isStart
          ? [date, date.clone().add(6, "day")]
          : [date.clone().subtract(6, "day"), date];
        const isBetweenStartLimit = current.isBetween(...isBetweenArgs);

        return !!tooLate || isBetweenStartLimit || isFirstSelectedDate;
      };
      return isNil(secondDate)
        ? getDisabled(firstDate || void 0, true)
        : getDisabled(secondDate);
    },
    [temporaryDate]
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        setTemporaryDate([null, null]);
      } else {
        setTemporaryDate(null);
      }
      setOpen(open);
    },
    [setTemporaryDate]
  );

  const handleCalendarChange = useCallback(
    (onCalendarChangeVal) => setTemporaryDate(onCalendarChangeVal),
    [setTemporaryDate]
  );

  const handleChange = useCallback(
    (onChangeVal) => setResponseDates(onChangeVal),
    [setResponseDates]
  );

  const dateRender = useCallback(
    (current) => {
      let className = "ant-picker-cell-inner";
      if (range === Ranges.week) {
        if (
          current.isBetween(
            responseDates?.[0],
            (responseDates as any)[1].clone().add(1, "d")
          )
        ) {
          className = `${className} range-picker-inner`;
        }

        if (
          temporaryDate?.[0] &&
          (current as Dayjs).isSame(
            temporaryDate[0].clone().add(6, "day"),
            "day"
          )
        ) {
          className = `${className} range-picker-limit-date ${temporaryDate?.[0]
            .clone()
            .add(6, "d")
            .format()}`;
        }

        return <div className={className}>{current.date()}</div>;
      }
    },
    [range, responseDates, temporaryDate]
  );

  const handleBaseDatePickerChange = useCallback(
    (date) => {
      const _date = date.clone().utc(false);
      setResponseDates([_date, _date]);
      setTemporaryDate([_date, _date]);
    },
    [setResponseDates, setTemporaryDate]
  );

  const rangePickerPlaceholder: [string, string] = [
    "Select date",
    "Select date",
  ];

  return range === Ranges.week ? (
    <RangePicker
      size="small"
      open={isOpen}
      allowClear={false}
      onChange={handleChange}
      dateRender={dateRender}
      format="MMMM DD YYYY"
      disabledDate={disabledDate}
      onOpenChange={handleOpenChange}
      placeholder={rangePickerPlaceholder}
      autoFocus={true}
      defaultValue={responseDates}
      className="settings-range-picker"
      value={temporaryDate || responseDates}
      onCalendarChange={handleCalendarChange}
      dropdownClassName="settings-range-picker-dropdown"
    />
  ) : (
    <BaseDatePicker
      size="small"
      picker={range}
      allowClear={false}
      value={(responseDates as any)[0]}
      format={formatsByRange[range]}
      className="settings-date-picker"
      onChange={handleBaseDatePickerChange}
      dropdownClassName="settings-date-picker-dropdown"
    />
  );
};
