import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { Circle } from "@visx/shape";
import { TooltipWithBounds } from "@visx/tooltip";
import { Form, theme } from "antd";
import { Fragment, useEffect, useRef, useState } from "react";

import { usePoints } from "../../core";

export const CabinetIntrinsics = () => {
  const form = Form.useFormInstance();

  const { points, image } = usePoints(form.getFieldValue("type"));

  const [activePoint, setPoint] = useState<(typeof points)[number]>();

  const {
    token: { colorInfo: fillColor },
  } = theme.useToken();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
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
            <svg width="100%%" height={500}>
              <image width="100%" height="100%" xlinkHref={image}></image>
              {points.map((point) => {
                return (
                  <Fragment key={point.x}>
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
                    </Group>
                    <polyline
                      points={`${point.x},${point.y} ${parent.width},${point.y}`}
                      stroke={fillColor}
                    />
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
              <div ref={ref}>
                <TooltipWithBounds
                  left={activePoint.x}
                  top={activePoint.y}
                  // onOpenChange={() => setPoint(undefined)}
                >
                  {`Edit ${activePoint.label}`}
                  {activePoint.element}
                </TooltipWithBounds>
              </div>
            )}
          </>
        );
      }}
    </ParentSize>
  );
};
