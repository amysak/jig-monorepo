import baseCabinetImage from "assets/images/cabinets/Base_Vanity.png";
import tallCabinetImage from "assets/images/cabinets/Upper_Tall.png";
import { CabinetType } from "type-defs";

import {
  EditBack,
  EditBackStretcher,
  EditDeck,
  EditNailer,
  EditShelves,
  EditSides,
  EditStretchers,
  EditTop,
} from "../components/points-interior-forms";

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
  base: {
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
  },
  get vanity() {
    return this.base;
  },
  tall: {
    points: [
      { x: 0, y: 0, label: "A" },
      { x: 100, y: 100, label: "B" },
    ],
    image: tallCabinetImage,
  },
  get upper() {
    return this.tall;
  },
};

export const usePoints = (cabinetType: CabinetType) => {
  return pointsMap[cabinetType];
};
