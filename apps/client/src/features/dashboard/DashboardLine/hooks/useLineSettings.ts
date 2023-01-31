import { Dispatch, SetStateAction, useCallback, useState } from "react";

import { dayjs, Dayjs } from "lib/dayjs";

import { Ranges } from "../utils";
import { useRange } from "./useRange";

type RangeValue = [Dayjs | null, Dayjs | null] | null;
export interface useLineSettingsType {
  (defaultRange?: Ranges): {
    range: Ranges;
    setRange: Dispatch<SetStateAction<Ranges>>;
    responseDates: RangeValue;
    setResponseDates: Dispatch<SetStateAction<RangeValue>>;
    temporaryDate: RangeValue;
    setTemporaryDate: Dispatch<SetStateAction<RangeValue>>;
  };
}

export const useLineSettings: any = (defaultRange = Ranges.week) => {
  const [range, setRange] = useRange(defaultRange);

  const [responseDates, setResponseDates] = useState<RangeValue>([
    dayjs().utc(false).startOf(defaultRange),
    dayjs().utc(false).endOf(defaultRange).subtract(1, "d"),
  ]);

  const [temporaryDate, setTemporaryDate] = useState<RangeValue>([null, null]);

  const onOpenChange = useCallback((open: boolean) => {
    if (open) {
      setTemporaryDate([null, null]);
    } else {
      setTemporaryDate(null);
    }
  }, []);

  const handleRangeChange = useCallback<(range: Ranges) => void>(
    (range) => {
      let start = (responseDates as any)[0].clone().utc(false).startOf(range);
      let end = (responseDates as any)[0]
        .clone()
        .utc(false)
        .endOf(range)
        .subtract(1, "day");

      if (range === Ranges.week) {
        start = (responseDates as any)[0].clone();
        end = (responseDates as any)[0].clone().add(6, "day");
      }
      setResponseDates([start, end]);
      setRange(range);
    },

    [responseDates, setRange]
  );

  return {
    range,
    setRange: handleRangeChange,
    responseDates,
    setResponseDates,
    temporaryDate,
    setTemporaryDate,
    onOpenChange,
  };
};
