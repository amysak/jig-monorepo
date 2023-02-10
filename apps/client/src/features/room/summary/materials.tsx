import { PageSkeleton } from "@jigbid/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { AutoComplete, Divider, Popover, Space, Typography } from "antd";
import { useState } from "react";

import { MaterialSetView } from "components/material-set";
import { api } from "lib/api";
import { useMaterialSetsQuery } from "lib/hooks/queries";
import { queryClient } from "lib/query-client";
import { roomRoute } from "pages/rooms";

const { Text, Paragraph } = Typography;

export const RoomMaterials = () => {
  const params = useParams({ from: roomRoute.id });

  const [value, setValue] = useState<string>();
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );

  const { data: room } = useQuery({
    queryKey: ["rooms", params.roomId],
    queryFn: () => api.rooms.getById(params.roomId),
  });

  const { data: materialSets, isLoading } = useMaterialSetsQuery({
    onSuccess: (queryResult) =>
      setOptions(
        queryResult.data.map((set) => ({
          label: set.name,
          value: set.id.toString(),
        }))
      ),
  });
  const { mutateAsync: assignSet } = useMutation({
    mutationKey: ["material-sets", "assign"],
    mutationFn: ({
      originalId,
      newId,
    }: {
      originalId: number;
      newId: number;
    }) => api.materialSets.assign(originalId, newId),
    onSettled: () => {
      queryClient.invalidateQueries(["rooms"]);
    },
  });

  if (!room || isLoading || !materialSets?.data) {
    return <PageSkeleton />;
  }

  const onSelect = async (value: string, option: { label: string }) => {
    await assignSet({
      originalId: room.materialSet.id,
      newId: +value,
    });
    setValue(option.label);
  };

  const onSearch = (searchText: string) => {
    const newOptions = materialSets.data.map((set) => ({
      label: set.name,
      value: set.id.toString(),
    }));

    if (!searchText) {
      return setOptions(newOptions);
    }

    const found = newOptions.filter((option) =>
      option.label.toLowerCase().includes(searchText)
    );

    setOptions(found);
  };

  return (
    <>
      <Paragraph>
        Edit a material set used for this room. You can override current
        material set by hovering over room's set title below.
      </Paragraph>
      <Divider orientation="left">
        <Popover
          content={
            <Space direction="vertical">
              <Text>Override current material set</Text>
              <AutoComplete
                size="small"
                style={{ width: 250 }}
                value={value}
                onSearch={onSearch}
                onSelect={onSelect}
                placeholder="Enter name or description..."
                options={options}
              />
            </Space>
          }
        >
          <Text strong>{room.materialSet.name}</Text>
        </Popover>
      </Divider>

      <MaterialSetView materialSet={room.materialSet} />
    </>
  );
};
