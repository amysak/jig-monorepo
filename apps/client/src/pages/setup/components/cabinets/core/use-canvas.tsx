// This file is inside the codebase just to remind everyone how i hate d3.
// @visx for life!
export {};

// import { theme } from "antd";
// import * as d3 from "d3";
// import { Selection } from "d3";
// import {
//   MutableRefObject,
//   ReactPortal,
//   useCallback,
//   useEffect,
//   useRef,
// } from "react";

// import baseCabinetImage from "assets/images/cabinets/Base_Vanity.png";
// import tallCabinetImage from "assets/images/cabinets/Upper_Tall.png";
// import { CabinetType, CABINET_TYPE } from "type-defs";

// import { EditCabinetTop } from "../components/intrinsics";
// import { createPortal } from "react-dom";

// type Point = {
//   x: number;
//   y: number;
//   label: string;
//   element?: JSX.Element;
// };

// type PointsMap = {
//   [key in CabinetType]: () => { points: Point[]; image: string };
// };

// const pointsMap: PointsMap = {
//   [CABINET_TYPE.BASE]: () => ({
//     points: [
//       { x: 50, y: 50, label: "Top", element: <EditCabinetTop /> },
//       { x: 240, y: 180, label: "Back Nailer" },
//       { x: 180, y: 120, label: "Back Stretcher" },
//       { x: 220, y: 90, label: "Cabinet Back" },
//     ],
//     image: baseCabinetImage,
//   }),
//   [CABINET_TYPE.VANITY]: () => pointsMap[CABINET_TYPE.BASE](),
//   [CABINET_TYPE.TALL]: () => ({
//     points: [
//       { x: 0, y: 0, label: "A" },
//       { x: 100, y: 100, label: "B" },
//     ],
//     image: tallCabinetImage,
//   }),
//   [CABINET_TYPE.UPPER]: () => pointsMap[CABINET_TYPE.TALL](),
// };

// // const resizeWithRatio = (
// //   srcWidth: number,
// //   srcHeight: number,
// //   maxWidth: number,
// //   maxHeight: number
// // ) => {
// //   const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

// //   return { width: srcWidth * ratio, height: srcHeight * ratio };
// // };
// type PortalData = {
//   element: JSX.Element;
//   container: SVGGElement;
// };

// const getPortals = (
//   points: Point[],
//   svg: Selection<SVGSVGElement, unknown, null, undefined>,
//   fillColor: string
// ): ReactPortal[] => {
//   const portals = points.map((point) => {
//     const { x, y, label, element } = point;

//     const container = svg.append("g");

//     container
//       .append("circle")
//       .attr("cx", x)
//       .attr("cy", y)
//       .attr("fill", fillColor)
//       .attr("r", 5);

//     container
//       .append("text")
//       .text(label)
//       .attr("fill", fillColor)
//       .attr("x", x - 25)
//       .attr("y", y + 15);

//     container.style("cursor", "pointer").on("click", () => {
//       // do something
//       // const [visible, setVisible] = useState(false);
//     });

//     const containerNode = container.node();

//     if (!element || !containerNode) {
//       return null;
//     }

//     return createPortal(element, containerNode);
//   });

//   return portals.filter(Boolean) as NonNullable<(typeof portals)[number]>[];
// };
// // svg
// //   .append("text")
// //   .text(label)
// //   .attr("x", x - 25)
// //   .attr("y", y + 15);

// export type UseCanvasProps = {
//   containerRef: MutableRefObject<HTMLDivElement | null>;
//   cabinetType: CabinetType;
// };

// export const useCanvas = ({ containerRef, cabinetType }: UseCanvasProps) => {
//   const {
//     token: { colorInfo: fillColor },
//   } = theme.useToken();

//   const { points, image } = pointsMap[cabinetType]();

//   const renderCanvas = useCallback(() => {
//     const container = d3.select(containerRef.current);
//     const containerNode = container.node();

//     if (!containerNode) {
//       return;
//     }

//     // Adding cabinet image
//     const svg = container
//       .append("svg")
//       .attr("height", 500)
//       .attr("width", "100%");

//     svg
//       .append("svg:image")
//       .attr("width", "100%")
//       .attr("height", "100%")
//       .attr("xlink:href", image);

//     // const rect = svg
//     //   .append("rect")
//     //   .transition()
//     //   .duration(500)
//     //   .attr("width", 150)
//     //   .attr("height", 100)
//     //   .attr("x", 40)
//     //   .attr("y", 100)
//     //   .style("fill", "white")
//     //   .attr("stroke", "black");
//     // const text = svg
//     //   .append("text")
//     //   .text("This is some information about whatever")
//     //   .attr("x", 50)
//     //   .attr("y", 150)
//     //   .attr("fill", "black");

//     return getPortals(points, svg, fillColor);
//   }, [containerRef, fillColor, image, points]);

//   const portals = useRef<ReactPortal[]>([]);

//   useEffect(() => {
//     const result = renderCanvas();
//     console.log("result => ", result);
//     if (!result) return;

//     portals.current = result;
//   }, [renderCanvas]);

//   // Adding interactive points

//   return [points];
// };
