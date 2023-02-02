import baseCabinetImage from "assets/images/cabinets/Base_Vanity.png";
import tallCabinetImage from "assets/images/cabinets/Upper_Tall.png";
import { CabinetType, CABINET_TYPE } from "type-defs";

import {
  EditBackStretcher,
  EditShelves,
  EditTop,
  EditSides,
  EditNailer,
  EditDeck,
  EditBack,
  EditStretchers,
} from "../intrinsics";

type Point = {
  x: number;
  y: number;
  label: string;
  element?: JSX.Element;
  hint?: string;
};

type PointsMap = {
  [key in CabinetType]: { points: Point[]; image: string };
};

const pointsMap: PointsMap = {
  get [CABINET_TYPE.BASE]() {
    return {
      points: [
        // Sorted by Y
        {
          x: 50,
          y: 50,
          label: "cabinet top",
          hint: "Cabinet top",
          element: <EditTop />,
        },
        {
          x: 220,
          y: 90,
          label: "back stretcher",
          element: <EditBackStretcher />,
        },
        {
          x: 330,
          y: 130,
          label: "cabinet back",
          element: <EditBack />,
        },
        { x: 270, y: 150, label: "back nailer", element: <EditNailer /> },
        {
          x: 120,
          y: 220,
          label: "cabinet stretchers",
          element: <EditStretchers />,
        },
        { x: 150, y: 280, label: "cabinet shelves", element: <EditShelves /> },
        {
          x: 310,
          y: 320,
          label: "cabinet sides",

          element: <EditSides />,
        },
        { x: 150, y: 370, label: "cabinet deck", element: <EditDeck /> },
      ],
      image: baseCabinetImage,
    };
  },
  get [CABINET_TYPE.VANITY]() {
    return pointsMap[CABINET_TYPE.BASE];
  },
  get [CABINET_TYPE.TALL]() {
    return {
      points: [
        { x: 0, y: 0, label: "A" },
        { x: 100, y: 100, label: "B" },
      ],
      image: tallCabinetImage,
    };
  },
  get [CABINET_TYPE.UPPER]() {
    return pointsMap[CABINET_TYPE.TALL];
  },
};

export const usePoints = (cabinetType: CabinetType) => {
  return pointsMap[cabinetType];
};
