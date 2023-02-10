export {};
// import { PageSkeleton } from "@jigbid/ui";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useParams } from "@tanstack/react-router";
// import { AutoComplete, Col, Row, Typography } from "antd";
// import { useState } from "react";

// import { MaterialSetView } from "components/material-set";
// import { api } from "lib/api";
// import {
//   useCreateMaterialSet,
//   useMaterialSetsQuery,
//   useMutateMaterialSet,
//   useMutateRoom,
// } from "lib/hooks/queries";
// import { roomRoute } from "pages/rooms";
// import { queryClient } from "lib/query-client";

// const { Paragraph } = Typography;

// const getCleanName = (name: string) =>
//   name.includes("new") ? name.slice(4) : name;

// export const RoomMaterials = () => {
//   const params = useParams({ from: roomRoute.id });

//   const [value, setValue] = useState<string>();
//   const [options, setOptions] = useState<{ label: string; value: string }[]>(
//     []
//   );

//   const { data: room } = useQuery({
//     queryKey: ["rooms", params.roomId],
//     queryFn: () => api.rooms.getById(params.roomId),
//     onSuccess: (queryResult) => setValue(queryResult.materialSet?.name),
//   });
//   const { mutateAsync: mutateRoom } = useMutateRoom(params.roomId);

//   const { data: materialSets, isLoading } = useMaterialSetsQuery({
//     onSuccess: (queryResult) =>
//       setOptions(
//         queryResult.data.map((set) => ({
//           label: set.name,
//           value: set.id.toString(),
//         }))
//       ),
//   });
//   const { mutateAsync: createSet } = useCreateMaterialSet();
//   const { mutateAsync: assignSet } = useMutation(
//     ["material-sets", "assign"],
//     ({ originalId, setId }: { originalId: number; setId: number }) =>
//       api.materialSets.assign(originalId, setId),
//     {
//       onSettled: () => {
//         queryClient.invalidateQueries(["cabinets"]);
//       },
//       ...options,
//     }
//   );

//   if (!room || isLoading || !materialSets?.data) {
//     return <PageSkeleton />;
//   }

//   const onSelect = async (
//     value: string,
//     option: { label: string; value: string }
//   ) => {
//     let name = option.label;
//     let setId = +option.value;

//     if (value.includes("new")) {
//       name = getCleanName(value);
//       // const newSet = await createSet({
//       //   name,
//       // });
//       setId = newSet.id;
//     }

//     await assignSet({ materialSet: { id: setId } });
//     await queryClient.invalidateQueries(["material-sets"]);
//     setValue(name);
//   };

//   const onSearch = (searchText: string) => {
//     const newOptions = materialSets.data.map((set) => ({
//       label: set.name,
//       value: set.id.toString(),
//     }));

//     if (!searchText) {
//       return setOptions(newOptions);
//     }

//     const found = newOptions.filter((option) =>
//       option.label.toLowerCase().includes(searchText)
//     );

//     setOptions(
//       [{ label: `Create ${searchText}...`, value: `new ${searchText}` }].concat(
//         found
//       )
//     );
//   };

//   return (
//     <>
//       <Paragraph>
//         Assign a material set to this room. If you don't have a material set,
//         type a name for it:
//       </Paragraph>
//       <Row>
//         <Col span={10}>
//           <AutoComplete
//             size="large"
//             // defaultValue={value}
//             value={value}
//             onSearch={onSearch}
//             onSelect={onSelect}
//             onChange={(value, option) =>
//               setValue(
//                 isNaN(Number(value))
//                   ? getCleanName(value)
//                   : (option as any).label
//               )
//             }
//             placeholder="Enter a set name..."
//             options={options}
//           />
//         </Col>

//         <Col span={14}></Col>
//       </Row>

//       <br />
//       {room.materialSet && <MaterialSetView materialSet={room.materialSet} />}
//     </>
//   );
// };
