import {
  DeleteFilled,
  DeleteOutlined,
  DragOutlined,
  PlusOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Popover,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { FC } from "react";

import DoorIcon from "assets/images/setup/door.svg";
import DrawerIcon from "assets/images/setup/drawer.svg";
import { Cabinet } from "type-defs";
import { useCabinetState } from "../hooks";
import { red } from "@ant-design/colors";

const { Text } = Typography;

export function CabinetLayout() {
  const {
    cabinetState: {
      cabinet: { dimensions, exterior: stateExterior },
    },
    snapshot: {
      cabinet: {
        exterior: { equipmentRows: snapShotEquipmentRows },
      },
    },
  } = useCabinetState();

  return (
    <DndContext
      // collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      // onDragOver={handleDragEnd}
      // collisionDetection={closestCenter}
    >
      <Card>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Row justify="space-between">
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => {
                stateExterior.equipmentRows = [
                  ...stateExterior.equipmentRows,
                  {
                    items: [],
                    height: 0,
                  },
                ];
              }}
            >
              Add row
            </Button>

            <Tooltip
              title={`
              Here you would add rows to describe your cabinet's layout. By
              specifying a row, you can add several parts to it. You can
              also group those parts to specify that their height should be
              defined by splitting the row height evenly. All cabinet rows
              should be given individual heights except the last one. This 
              will help with automatic calculations for door and drawer heights. 
              You can also leave rows empty to specify that there is no exterior 
              parts included, hence it is just an open shelf.
            `}
            >
              <QuestionOutlined />
            </Tooltip>
          </Row>
          <SortableContext
            items={snapShotEquipmentRows.map((_, idx) => "row-" + idx)}
            strategy={verticalListSortingStrategy}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {snapShotEquipmentRows.map((_, rowIndex) => (
                <SortableRow
                  rowIndex={rowIndex}
                  id={`row-${rowIndex}`}
                  key={rowIndex}
                />
              ))}
            </Space>
          </SortableContext>
        </Space>
      </Card>

      {/* <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay> */}
    </DndContext>
  );

  function handleRowMove(from: number, to: number) {
    stateExterior.equipmentRows = arrayMove(
      stateExterior.equipmentRows,
      from,
      to
    );

    const fromHeight = stateExterior.equipmentRows[from].height;
    stateExterior.equipmentRows[from].height =
      stateExterior.equipmentRows[to].height;
    stateExterior.equipmentRows[to].height = fromHeight;
  }

  function handleItemMove(activeIndices: number[], overIndices: number[]) {
    const [activeRowIndex, activePartIndex] = activeIndices;
    const [overRowIndex, overPartIndex] = overIndices;
    // TODO: move to different row
    if (activeRowIndex === overRowIndex) {
      // Move item within the same row
      stateExterior.equipmentRows[activeRowIndex].items = arrayMove(
        stateExterior.equipmentRows[activeRowIndex].items,
        activePartIndex,
        overPartIndex
      );
    } else {
      // TODO: groups and move to different row
      // Move item to a different row
      // const fromItems = [...stateExterior.equipmentRows[fromRow].items];
      // const [removed] = fromItems.splice(fromIndex, 1);
      // const toItems = [...stateExterior.equipmentRows[toRow].items];
      // toItems.splice(toIndex, 0, removed);
      // stateExterior.equipmentRows = stateExterior.equipmentRows.map(
      //   (row, index) => {
      //     if (index === fromRow) {
      //       return { ...row, items: fromItems };
      //     }
      //     if (index === toRow) {
      //       return { ...row, items: toItems };
      //     }
      //     return row;
      //   }
      // );
    }
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (typeof active.id !== "string" || typeof over?.id !== "string") {
      return;
    }
    const [activeType, ...activeIndices] = active.id.split("-");
    const [, ...overIndices] = over.id.split("-");
    if (!overIndices[0]) {
      return;
    }

    if (activeType === "row") {
      handleRowMove(Number(activeIndices[0]), Number(overIndices[0]));
    } else if (activeType === "part") {
      handleItemMove(activeIndices.map(Number), overIndices.map(Number));
    }
  }
}

type DraggablePartProps = {
  id: string;
  part: Cabinet["exterior"]["equipmentRows"][number]["items"][number];
};

const SortableCabinetPart = ({ id }: DraggablePartProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      animateLayoutChanges: () => false,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };
  const {
    cabinetState: {
      cabinet: { exterior: stateExterior },
    },
  } = useCabinetState();

  const [, rowIndex, partIndex] = id.split("-").map(Number);
  const part = stateExterior.equipmentRows[rowIndex].items[partIndex];
  let Component: FC<React.SVGProps<SVGSVGElement>> | null;
  if (Array.isArray(part)) {
    // TODO: group support
    Component = null;
  } else if (part.type === "baseDoor") {
    Component = DoorIcon;
  } else if (part.type === "drawer") {
    Component = DrawerIcon;
  } else {
    return null;
  }

  return (
    <>
      {Component && (
        <Card ref={setNodeRef} style={{ ...style, position: "relative" }}>
          <DeleteFilled
            onClick={() => {
              stateExterior.equipmentRows[rowIndex].items =
                stateExterior.equipmentRows[rowIndex].items.filter(
                  (_, index) => index !== partIndex
                );
            }}
            style={{
              cursor: "pointer",
              position: "absolute",
              color: red[4],
              top: 2,
              right: 2,
            }}
          />
          <Component {...attributes} {...listeners} height="2em" width="2em" />
        </Card>
      )}
    </>
  );
};

type DraggableRowProps = {
  id: string;
  rowIndex: number;
};

function SortableRow({ id }: DraggableRowProps) {
  const {
    cabinetState: {
      cabinet: { exterior: stateExterior },
    },
    snapshot: {
      cabinet: {
        exterior: { equipmentRows: snapshotRows },
      },
    },
  } = useCabinetState();
  const rowIndex = Number(id.split("-")[1]);
  const row = snapshotRows[rowIndex];

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      animateLayoutChanges: () => false,
    });

  return (
    <Card
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
        padding: 4,
        // position: "relative",
      }}
    >
      <Row justify="space-between" align="middle">
        <Col>
          <Space>
            <DragOutlined
              {...listeners}
              {...attributes}
              style={{
                cursor: "grab",
                // position: "absolute", top: 10, right: 10,
              }}
            />
            <Text strong>Row {rowIndex + 1}</Text>
          </Space>
          <Space>
            <Input
              style={{ display: "inline-block", width: 120 }}
              width={50}
              placeholder="Row Height"
              value={stateExterior.equipmentRows[rowIndex].height}
              disabled={rowIndex === snapshotRows.length - 1}
              onChange={(e) => {
                stateExterior.equipmentRows[rowIndex].height =
                  Number(e.target.value) || 0;
              }}
            />
            <Popover
              content={
                <>
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      stateExterior.equipmentRows[rowIndex].items = [
                        ...row.items,
                        { type: "baseDoor" },
                      ];
                    }}
                  >
                    Door
                  </Button>
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      stateExterior.equipmentRows[rowIndex].items = [
                        ...row.items,
                        { type: "drawer" },
                      ];
                    }}
                  >
                    Drawer
                  </Button>
                </>
              }
              trigger="click"
            >
              <Button type="text" icon={<PlusOutlined />}>
                Add
              </Button>
            </Popover>
          </Space>
        </Col>
        <Col>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              stateExterior.equipmentRows.splice(rowIndex, 1);
              stateExterior.equipmentRows[rowIndex - 1].height += row.height;
              // stateExterior.equipmentRows = stateExterior.equipmentRows.filter(
              //   (_, i) => {
              //     if (i === rowIndex) {
              //       stateExterior.equipmentRows[rowIndex - 1].height += row.height;
              //       return false;
              //     }
              //     return true
              //   }
              // );
            }}
          />
        </Col>
      </Row>

      <SortableContext
        items={row.items.map((_, partIndex) => `part-${rowIndex}-${partIndex}`)}
        strategy={horizontalListSortingStrategy}
      >
        <Divider>Row items</Divider>
        <Space>
          {row.items.map((part, partIndex) => (
            <SortableCabinetPart
              part={part}
              key={`part-${rowIndex}-${partIndex}`}
              id={`part-${rowIndex}-${partIndex}`}
            />
          ))}
        </Space>
      </SortableContext>
    </Card>
  );
}
