import { Group } from "@visx/group";
import { Space, Switch, theme, Typography } from "antd";
import { useAuthorization } from "lib/hooks";
import { isEmpty } from "lodash-es";
import { nanoid } from "nanoid";

import { useCabinetState } from "../hooks";

const { Text } = Typography;

export const CabinetPreview = () => {
  const {
    cabinetState: {
      cabinet: { exterior: stateExterior },
    },
    snapshot: {
      cabinet: {
        dimensions,
        exterior: { equipmentRows, faceFrame },
      },
    },
  } = useCabinetState();

  // Weird, considering we have a state manager, but tbh react-query is a state-manager itself
  // and I don't even know why I decided to use valtio, probably just 4 fun
  const { user } = useAuthorization();
  console.log("user => ", user);
  // TODO: Should be done somewhere else
  const cabinetHeight = dimensions.floorToTop - dimensions.floorToBottom;
  const realCabinetHeight =
    cabinetHeight - (dimensions.overridenToeHeight || 0);
  // TODO: use default width instead of cabinetWidth from user preferences
  const cabinetWidth = dimensions.width || 30;

  const {
    token: { colorPrimary: fillColor, colorInfo: textColor },
  } = theme.useToken();

  const preparedItems = equipmentRows.map((item, idx) => ({
    ...item,
    // TODO: kinda costly
    height:
      idx === equipmentRows.length - 1
        ? realCabinetHeight
        : equipmentRows
            .slice(0, idx)
            .reduce((acc, row) => acc + row.height, item.height),
  }));

  return (
    <>
      <Space>
        <Switch
          checked={!isEmpty(faceFrame)}
          onChange={(checked) => {
            stateExterior.faceFrame.included = checked;
          }}
        />
        <Text>Use Face Frame</Text>
      </Space>

      <svg viewBox={`-1 -1 ${cabinetWidth + 2} ${cabinetHeight + 2}`}>
        <polyline
          points={`0,${cabinetHeight} 0,0 ${cabinetWidth},0 ${cabinetWidth},${cabinetHeight}`}
          stroke={fillColor}
          fill="none"
          strokeWidth={0.5}
        />
        {preparedItems.map((cabinetRow, idx) => {
          const rowColumnsCount = cabinetRow.items.length;
          const singleMargin = cabinetWidth / rowColumnsCount;
          const xS = Array.from({ length: rowColumnsCount - 1 }).map(
            (_, idx) => singleMargin * (idx + 1)
          );

          const key = nanoid();
          return (
            <Group key={key}>
              <polyline
                points={`0,${cabinetRow.height} ${cabinetWidth},${cabinetRow.height}`}
                stroke={fillColor}
                strokeWidth={0.5}
              />
              {xS.map((x, xIdx) => (
                <polyline
                  key={`x-${xIdx}`}
                  points={`${x},${cabinetRow.height} ${x},${
                    idx === 0 ? 0 : preparedItems[idx - 1].height
                  }`}
                  stroke={fillColor}
                  strokeWidth={0.5}
                />
              ))}
            </Group>
          );
        })}
        <polyline
          points={`0,${realCabinetHeight} ${cabinetWidth},${realCabinetHeight}`}
          stroke={fillColor}
          strokeWidth={0.5}
        />
      </svg>
    </>
  );
};
