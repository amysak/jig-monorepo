import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { Circle } from "@visx/shape";
import { Text } from "@visx/text";
import { TooltipWithBounds } from "@visx/tooltip";
import { Form, theme, Typography } from "antd";
import { nanoid } from "nanoid";
import { Fragment, useEffect, useRef, useState } from "react";

import { usePoints } from "../hooks";

const { Paragraph } = Typography;

export const CabinetInterior = () => {
  const form = Form.useFormInstance();

  const { points, image } = usePoints(form.getFieldValue("type"));

  const [activePoint, setPoint] = useState<(typeof points)[number]>();

  const {
    token: { colorPrimary: fillColor, colorInfo: textColor },
  } = theme.useToken();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current) {
        return;
      }

      if (
        !ref.current.contains(event.target) &&
        // clicked is not a select which is outside event.target for some reason in Antd implementation
        !event.target.classList.contains("ant-select-item-option-content")
      ) {
        setPoint(undefined);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <ParentSize>
      {(parent) => {
        return (
          <>
            <svg width="100%" height={500}>
              <image height="100%" xlinkHref={image} />
              {points.map((point) => {
                return (
                  <Fragment key={nanoid()}>
                    <polyline
                      points={`${point.x},${point.y} ${parent.width},${point.y}`}
                      stroke={fillColor}
                    />
                    <Group
                      style={{ cursor: "pointer" }}
                      onClick={() => setPoint(point)}
                    >
                      <Circle
                        cx={point.x}
                        cy={point.y}
                        r={5}
                        stroke={fillColor}
                        fill="none"
                      />
                      <Circle
                        cx={point.x}
                        cy={point.y}
                        r={3}
                        fill={fillColor}
                      />
                      <Circle
                        cx={point.x}
                        cy={point.y}
                        r={10}
                        fill="transparent"
                      />
                      {point.hint && (
                        <Text
                          fill={textColor}
                          x={point.x - 40}
                          y={point.y - 10}
                        >
                          {point.hint}
                        </Text>
                      )}
                    </Group>
                  </Fragment>
                );
              })}
              <polyline
                points={`${parent.width},0 ${parent.width},${parent.height}`}
                stroke={fillColor}
                strokeWidth={2}
              />
            </svg>
            {!!activePoint && (
              <TooltipWithBounds
                left={activePoint.x}
                top={activePoint.y}
                nodeRef={ref}
              >
                <div style={{ minWidth: 250 }}>
                  <Paragraph>{`Edit ${activePoint.label}`}</Paragraph>
                  {activePoint.element}
                </div>
              </TooltipWithBounds>
            )}
          </>
        );
      }}
    </ParentSize>
  );
};
