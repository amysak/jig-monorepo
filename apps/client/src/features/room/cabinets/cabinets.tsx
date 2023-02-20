import { blue } from "@ant-design/colors";
import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { PageSkeleton } from "@jigbid/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import {
  Button,
  Descriptions,
  List,
  Modal,
  Popconfirm,
  Tag,
  TreeSelect,
  TreeSelectProps,
  Typography,
} from "antd";
import { DefaultOptionType } from "antd/es/select";
import { capitalize, isEmpty } from "lodash-es";
import { useState } from "react";

import baseCabinetImage from "assets/images/cabinets/Base_Vanity.png";
import tallCabinetImage from "assets/images/cabinets/Upper_Tall.png";
import { CabinetEdit } from "features/edit";
import { api } from "lib/api";
import { useCabinetDeletion, useCabinetMutation } from "lib/hooks/queries";
import { queryClient } from "lib/query-client";
import { roomRoute } from "pages/rooms";

const { SHOW_PARENT } = TreeSelect;
const { Text } = Typography;

export const RoomCabinets = () => {
  const params = useParams({ from: roomRoute.id });
  const [cabinetEditId, setCabinetEditId] = useState<number>();

  const [value, setValue] = useState<string[]>([]);
  const [treeData, setTreeData] = useState<Omit<DefaultOptionType, "label">[]>([
    {
      id: "base",
      pId: 0,
      value: "base",
      title: "Base Cabinets",
      checkable: false,
    },
    {
      id: "vanity",
      pId: 0,
      value: "vanity",
      title: "Vanity Cabinets",
      checkable: false,
    },
    {
      id: "tall",
      pId: 0,
      value: "tall",
      title: "Tall Cabinets",
      checkable: false,
    },
    {
      id: "upper",
      pId: 0,
      value: "upper",
      title: "Upper Cabinets",
      checkable: false,
    },
  ]);

  const { data: room } = useQuery({
    queryKey: ["rooms", params.roomId],
    queryFn: () => api.rooms.getById(params.roomId),
  });

  const { mutateAsync: addCabinetsById } = useMutation({
    mutationKey: ["rooms", params.roomId, "cabinets", "add"],
    mutationFn: ({ ids }: { ids: number[] }) =>
      api.rooms.addCabinets(params.roomId, ids),
  });

  const { mutateAsync: updateCabinet } = useCabinetMutation();
  const { mutateAsync: deleteCabinet } = useCabinetDeletion({
    onSuccess: () => queryClient.invalidateQueries(["rooms"]),
  });

  if (!room) {
    return <PageSkeleton />;
  }

  const onLoadData: TreeSelectProps["loadData"] = async ({ id }) => {
    const query = { type: id };
    const response = await queryClient.fetchQuery({
      queryKey: ["cabinets", query],
      queryFn: () => api.cabinets.getAll(query),
    });

    setTreeData(
      treeData.concat(
        response.data.map((cabinet) => ({
          id: cabinet.id,
          pId: id,
          value: cabinet.id,
          title: cabinet.name,
          isLeaf: true,
        }))
      )
    );
  };

  const onChange = (newValue: string[]) => {
    setValue(newValue);
  };

  const tProps = {
    treeData,
    value,
    onChange,
    treeDataSimpleMode: true,
    treeLine: true,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%",
      minWidth: 270,
      maxWidth: 320,
    },
  };

  return (
    <>
      <Modal
        title="Edit cabinet"
        open={!!cabinetEditId}
        onCancel={() => setCabinetEditId(void 0)}
        footer={null}
        width="90%"
        style={{ maxWidth: "1200px" }}
      >
        <CabinetEdit id={cabinetEditId!} />
      </Modal>
      <Popconfirm
        onConfirm={async () => {
          await addCabinetsById({ ids: value.map(Number) });
          await queryClient.invalidateQueries(["rooms", params.roomId]);
          setValue([]);
        }}
        title="Select a cabinet"
        placement="bottomLeft"
        description={() => (
          <TreeSelect
            dropdownStyle={{ maxHeight: 400, overflow: "auto", zIndex: 10000 }}
            filterTreeNode={(inputValue, treeNode) => {
              return (
                (treeNode.title as string)
                  ?.toLowerCase()
                  .indexOf(inputValue.toLowerCase()) >= 0
              );
            }}
            loadData={onLoadData}
            {...tProps}
          />
        )}
      >
        <Button type="primary" size="large" block>
          Add cabinets
        </Button>
        {/* TODO: add option to add cabinets with default width to fill required space */}
      </Popconfirm>

      <List
        itemLayout="vertical"
        size="large"
        dataSource={room.cabinets}
        renderItem={(cabinet) => (
          <List.Item
            key={cabinet.id}
            actions={[
              <Link
                key="save"
                to="/setup/cabinets/$id"
                params={{ id: cabinet.id }}
                onClick={() => {
                  // Add endpoint for assigning cabinet to user
                  // updateCabinet({
                  //   id: cabinet.id,
                  //   values: { user: { id: user.id } },
                  // });
                }}
              >
                <Button size="middle" type="default" icon={<SaveOutlined />}>
                  Save to templates
                </Button>
              </Link>,
              <Button
                key="edit"
                size="middle"
                type="default"
                icon={<EditOutlined />}
                onClick={() => setCabinetEditId(cabinet.id)}
              >
                Edit
              </Button>,
              <Button
                key="delete"
                size="middle"
                type="default"
                icon={<DeleteOutlined />}
                onClick={async () => {
                  await deleteCabinet(cabinet.id);

                  // Optimistic done in a wrong way. We need to store prev data to be able to backfill
                  // if a query fails. TODO: view in documentation
                  // queryClient.setQueryData<DeepPartial<Room>>(
                  //   ["rooms", params.roomId],
                  //   (input) => ({
                  //     ...input,
                  //     cabinets: input?.cabinets?.filter(
                  //       (item) => item?.id !== cabinet.id
                  //     ),
                  //   })
                  // );
                }}
              >
                Delete
              </Button>,
            ]}
            extra={
              <>
                <img
                  width={272}
                  alt="logo"
                  src={
                    cabinet.type === "base" || cabinet.type === "vanity"
                      ? baseCabinetImage
                      : tallCabinetImage
                  }
                />
              </>
            }
          >
            <List.Item.Meta
              title={cabinet.name}
              description={
                <Descriptions bordered column={2}>
                  <Descriptions.Item label="Implementation model">
                    <Text strong>
                      {(cabinet.overridenMaterialSet || room.materialSet)
                        ?.exterior?.baseDoor?.model?.name || "N/A"}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Cabinet Type">
                    {capitalize(cabinet.type)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Parts applied" span={2}>
                    {!isEmpty(cabinet.equipment) ? (
                      cabinet.equipment!.map((equipmentItem, idx) => (
                        <Tag color={blue[4]} key={`end-${idx}`}>
                          {equipmentItem.name}
                        </Tag>
                      ))
                    ) : (
                      <Tag color="blue">No equipment applied</Tag>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Upcharges" span={2}>
                    {!isEmpty(cabinet.upcharges) ? (
                      cabinet.upcharges.map((upcharge) => (
                        <Tag key={upcharge.id} color="blue">
                          {upcharge.name}: ${upcharge.amount}
                        </Tag>
                      ))
                    ) : (
                      <Tag color="blue">No upcharges</Tag>
                    )}
                  </Descriptions.Item>
                </Descriptions>
              }
            />

            {/* {item.content} */}
          </List.Item>
        )}
      />
    </>
  );
};
