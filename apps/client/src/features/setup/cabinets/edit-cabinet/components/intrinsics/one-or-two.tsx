import { FormSelect } from "@jigbid/ui";

interface FinishedSidesSelectProps {
  name: string[];
  label?: string;
}

export const OneOrTwoSelect = ({ name, label }: FinishedSidesSelectProps) => {
  const sidesOptions = [0, 1, 2].map((num) => ({ value: num, label: num }));

  return (
    <FormSelect
      label={label || "Finished Sides"}
      name={name}
      options={sidesOptions}
      select={{ style: { maxWidth: 90, marginLeft: "auto" } }}
    />
  );
};
