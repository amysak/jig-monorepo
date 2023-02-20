import { PageSkeleton } from "@jigbid/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { AutoComplete, Divider, Radio, Typography } from "antd";
import { useState } from "react";

import { MaterialSetView } from "components/material-set";
import { api } from "lib/api";
import { useMaterialSetsQuery } from "lib/hooks/queries";
import { queryClient } from "lib/query-client";
import { roomRoute } from "pages/rooms";

const { Text, Paragraph } = Typography;
type SetType = "material" | "hardware";

export const RoomMaterials = () => {
  const params = useParams({ from: roomRoute.id });
  const [dataType, setDataType] = useState<SetType>("material");

  const [value, setValue] = useState<string | null>();
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
    onSuccess: () => {
      queryClient.invalidateQueries(["rooms"]);
    },
  });

  if (!room || isLoading || !materialSets?.data) {
    return <PageSkeleton />;
  }

  const onSelect = async (selectValue: string) => {
    setValue(null);
    await assignSet({
      originalId: room.materialSet.id,
      newId: +selectValue,
    });
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
      {/* <Switch
        checkedChildren="Material"
        unCheckedChildren="Hardware"
        defaultChecked
        onChange={(checked) => setDataType(checked ? "material" : "hardware")}
      /> */}
      <Radio.Group
        defaultValue="material"
        buttonStyle="solid"
        onChange={(e) => setDataType(e.target.value)}
        size="middle"
        style={{ marginBottom: 16 }}
      >
        <Radio.Button value="material">Material</Radio.Button>
        <Radio.Button value="hardware">Hardware</Radio.Button>
      </Radio.Group>

      {dataType === "material" ? (
        <>
          <Paragraph>
            Edit a material set used for this room. You can override current
            material set by hovering over room's set title below.
          </Paragraph>
          <AutoComplete
            size="small"
            style={{ width: 250 }}
            value={value}
            onSearch={onSearch}
            onSelect={onSelect}
            placeholder="Enter name or description..."
            options={options}
          />
          <Divider orientation="left">
            {/* <Popover
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
            </Popover> */}
            <Text strong>{room.materialSet.name}</Text>
          </Divider>

          <MaterialSetView materialSet={room.materialSet} />
        </>
      ) : null}
    </>
  );
};
