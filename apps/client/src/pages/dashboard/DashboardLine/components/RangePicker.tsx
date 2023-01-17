import { FormSelect } from "@jigbid/ui";
import { SelectProps } from "antd";
import { upperFirst } from "lodash-es";
import * as React from "react";

import { Ranges } from "../utils";

import "./RangePicker.styles.scss";

interface RangePickerProps {
  range: Ranges;
  isLoading: boolean;
  onSelectRange: (selectedRange: Ranges) => void;
}

const options: SelectProps["options"] = [
  { value: Ranges.week, label: Ranges.week },
  { value: Ranges.month, label: Ranges.month },
  { value: Ranges.year, label: Ranges.year },
];

const _options = options.map(({ value }) => ({
  value,
  label: upperFirst(value as string),
}));

export const RangePicker: React.FC<RangePickerProps> = ({
  range,
  onSelectRange,
  isLoading,
}) => {
  return (
    <FormSelect
      options={_options}
      select={{
        loading: isLoading,
        className: "line-range-picker",
        defaultValue: range,
        style: { minWidth: 100 },
        onSelect: onSelectRange,
      }}
    />
  );
};
