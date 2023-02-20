import { Group } from "@visx/group";
import { Form, theme } from "antd";
import { nanoid } from "nanoid";
import { Cabinet } from "type-defs";

export const CabinetPreview = () => {
  const form = Form.useFormInstance();
  const cabinetHeight = form.getFieldValue(["dimensions", "floorToTop"]);
  const cabinetLayout = form.getFieldValue([
    "exterior",
    "equipmentRows",
  ]) as Cabinet["exterior"]["equipmentRows"];

  const {
    token: { colorPrimary: fillColor, colorInfo: textColor },
  } = theme.useToken();

  const lastRowAuto = form.getFieldValue("lastRowAuto") as boolean;

  const preparedItems = cabinetLayout.map((item, idx) => ({
    ...item,
    // TODO: Costly
    height: cabinetLayout
      .slice(0, idx)
      .reduce((acc, row) => acc + row.height, item.height),
  }));

  // TODO: use default width instead of 30 from user preferences
  return (
    <svg viewBox={`0 0 30 ${cabinetHeight}`}>
      <polyline
        points={`0,${cabinetHeight} 0,0 30,0 30,${cabinetHeight}`}
        stroke={fillColor}
        fill="none"
        strokeWidth={2}
      />
      {preparedItems.map((cabinetRow, idx) => {
        const rowColumnsCount = cabinetRow.items.length;
        // TODO: hardcoded
        const singleMargin = 30 / rowColumnsCount;
        const xS = Array.from({ length: rowColumnsCount - 1 }).map(
          (_, idx) => singleMargin * (idx + 1)
        );

        const key = nanoid();
        return (
          <Group key={key}>
            <polyline
              points={`0,${cabinetRow.height} 30,${cabinetRow.height}`}
              stroke={fillColor}
              fill="none"
              strokeWidth={1}
            />
            {xS.map((x, xIdx) => (
              <polyline
                key={`x-${xIdx}`}
                points={`${x},${preparedItems[idx - 1]?.height || 0} ${x},${
                  idx === preparedItems.length
                    ? cabinetRow.height
                    : cabinetHeight
                }`}
                stroke={fillColor}
                fill="none"
                strokeWidth={1}
              />
            ))}
            {/* <Text fill={textColor} x={x * 0.5} y={y * 0.5}>
              {point.hint}
            </Text> */}
          </Group>
        );
      })}
      {lastRowAuto ? (
        <polyline
          points={`0,${cabinetHeight} 30,${cabinetHeight}`}
          stroke={fillColor}
          fill="none"
          strokeWidth={2}
        />
      ) : null}
    </svg>
  );
};
