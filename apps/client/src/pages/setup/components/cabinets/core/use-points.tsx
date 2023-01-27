import baseCabinetImage from "assets/images/cabinets/Base_Vanity.png";
import tallCabinetImage from "assets/images/cabinets/Upper_Tall.png";
import { CabinetType, CABINET_TYPE } from "type-defs";

import { EditCabinetTop } from "../components/intrinsics";

type Point = {
  x: number;
  y: number;
  label: string;
  element?: JSX.Element;
};

type PointsMap = {
  [key in CabinetType]: () => { points: Point[]; image: string };
};

const pointsMap: PointsMap = {
  [CABINET_TYPE.BASE]: () => ({
    points: [
      { x: 50, y: 50, label: "Top", element: <EditCabinetTop /> },
      { x: 240, y: 180, label: "Back Nailer" },
      { x: 180, y: 120, label: "Back Stretcher" },
      { x: 220, y: 90, label: "Cabinet Back" },
    ],
    image: baseCabinetImage,
  }),
  [CABINET_TYPE.VANITY]: () => pointsMap[CABINET_TYPE.BASE](),
  [CABINET_TYPE.TALL]: () => ({
    points: [
      { x: 0, y: 0, label: "A" },
      { x: 100, y: 100, label: "B" },
    ],
    image: tallCabinetImage,
  }),
  [CABINET_TYPE.UPPER]: () => pointsMap[CABINET_TYPE.TALL](),
};

export const usePoints = (cabinetType: CabinetType) => {
  return pointsMap[cabinetType]();
};
