import Icon, {
  DeleteOutlined,
  PlusOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { FormCheckbox } from "@jigbid/ui";
import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Popover,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { debounce } from "lodash-es";
import { FC, useState } from "react";

import DoorIcon from "assets/images/setup/door.svg";
import DrawerIcon from "assets/images/setup/drawer.svg";

const { Paragraph, Text } = Typography;

type DraggableProps = {
  id: number | string;
  children: React.ReactNode;
};

const Draggable = (props: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
};

export function Droppable(props: DraggableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export const CabinetLayout = () => {
  const form = Form.useFormInstance();

  const [parent, setParent] = useState(null);

  const handleDragEnd = (event) => {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Card>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Row justify="space-between">
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => {
                form.setFieldValue(["exterior", "equipmentRows"], (prev) => {
                  const newItem = {
                    items: [],
                    // TODO: Can be done better
                    height:
                      form.getFieldValue(["dimensions", "floorToTop"]) -
                      form.getFieldValue(["dimensions", "floorToBottom"]) -
                      prev.reduce((acc, curr) => acc + curr.height, 0),
                  };

                  return [...prev, newItem];
                });
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
                should be given individual heights. This will help with automatic
                calculations for door and drawer heights. You can also leave rows
                empty to specify that there is no exterior parts included, hence it
                is just an open shelf.
              `}
            >
              <QuestionOutlined />
            </Tooltip>
          </Row>

          {layoutSnapshot.state.map((row, idx) => (
            <Card key={idx} style={{ padding: 4 }}>
              <Row justify="space-between" align="middle">
                <Col>
                  {layoutSnapshot.state.length === idx + 1 ? (
                    <>
                      <Text strong>Row {idx + 1}</Text>
                      <FormCheckbox name="lastRowAuto" label="Auto" />
                    </>
                  ) : (
                    <Paragraph strong>Row {idx + 1}</Paragraph>
                  )}
                  <Space>
                    <Input
                      style={{ display: "inline-block", width: 120 }}
                      width={50}
                      placeholder="Row Height"
                      disabled={
                        layoutSnapshot.state.length === idx + 1 &&
                        form.getFieldValue("lastRowAuto")
                      }
                      defaultValue={
                        cabinetLayoutStore.state[idx].height ||
                        form.getFieldValue(["equipmentRows", idx, "height"])
                      }
                      onChange={debounce((e) => {
                        const value = Number(e.target.value.trim());
                        if (value) {
                          cabinetLayoutStore.state[idx].height = value;
                        }
                      }, 500)}
                    />
                    <Popover
                      content={
                        <>
                          <Button
                            type="text"
                            icon={<PlusOutlined />}
                            onClick={() =>
                              layoutActions.set((prev) => {
                                prev[idx].items.push("baseDoor");
                                return prev;
                              })
                            }
                          >
                            Door
                          </Button>
                          <Button
                            type="text"
                            icon={<PlusOutlined />}
                            onClick={() =>
                              layoutActions.set((prev) => {
                                prev[idx].items.push("drawer");
                                return prev;
                              })
                            }
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
                      const items = cabinetLayoutStore.state.filter(
                        (_, i) => i !== idx
                      );
                      form.setFieldValue("equipmentRows", items);
                      layoutActions.set(() => items);
                    }}
                  />
                </Col>
              </Row>

              <Droppable key={idx} id={idx}>
                {row.items.map((part, partIdx) => {
                  let component: FC;
                  if (part === "baseDoor") {
                    component = DoorIcon;
                  } else if (part === "drawer") {
                    component = DrawerIcon;
                  } else {
                    return null;
                  }

                  return (
                    <Draggable
                      key={`icon-${partIdx}`}
                      id={`draggable-${partIdx}`}
                    >
                      <Icon component={component} />
                    </Draggable>
                  );
                })}
              </Droppable>
            </Card>
          ))}
        </Space>
      </Card>
    </DndContext>
  );
};
