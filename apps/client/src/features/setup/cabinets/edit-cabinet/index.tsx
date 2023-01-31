import {
  FormCheckbox,
  FormInput,
  FormNumberInput,
  FormRadioSet,
  FormSelect,
} from "@jigbid/ui";
import { useQueryClient } from "@tanstack/react-query";
import { Card, Col, Divider, Form, Modal, Row, Space } from "antd";
import { capitalize, debounce } from "lodash-es";
import {
  Cabinet,
  CABINET_BASE_TYPE,
  CABINET_CORNER_PLACEMENT,
  CABINET_TYPE,
} from "type-defs";

import { useCabinetQuery, useMutateCabinet } from "hooks/queries";
import { useMatch, useNavigate } from "hooks/router";

import {
  CabinetDimensions,
  CabinetIntrinsics,
  CabinetParts,
} from "./components";

// const panes = [
//   {
//     tab: "Cabinet Specifications",
//     children: <CabinetSpecifications />,
//     route: "cabinet-specifications",
//   },
//   {
//     tab: "Door Specifications",
//     children: <DoorSpecification />,
//     route: "door-specifications",
//   },
//   {
//     tab: "Metal Drawer System",
//     children: <MetalDrawerSystem />,
//     route: "metal-drawer-system",
//   },
//   {
//     tab: "Five Part Drawer Box",
//     children: <FivePartDrawerBox />,
//     route: "five-part-drawer-box",
//   },
//   {
//     tab: "Metal Tray System",
//     children: <MetalTraySystem />,
//     route: "metal-tray-system",
//   },
//   {
//     tab: "Five Part Tray Box",
//     children: <FivePartTrayBox />,
//     route: "five-part-tray-box",
//   },
//   {
//     tab: "Face Frame Specifications",
//     children: <FaceFrameSpecification />,
//     route: "face-frame-specifications",
//   },
// ];

export const EditCabinet = () => {
  const [form] = Form.useForm<Cabinet>();
  const setFormFields = (cabinet: Cabinet) => {
    form.setFieldsValue(cabinet);
  };

  const {
    params: { id },
  } = useMatch();
  const navigate = useNavigate();

  const { data: cabinet, isLoading } = useCabinetQuery(id, {
    onSuccess: setFormFields,
  });

  const queryClient = useQueryClient();

  // Calling mutate cabinet hook
  const { mutate: mutateCabinet } = useMutateCabinet(id, {
    onSettled: () => {
      queryClient.invalidateQueries(["cabinets", id]);
    },
  });

  // Checking for existing queries with requested cabinet
  // Using the same constant to render the form
  // THIS DOES NOT WORK BECAUSE IT DOES NOT UPDATE THE FORM STATE IN USEEFFECT
  // AND WHEN OUTSIDE OF USEEFFECT, IT RENDERS EVEN WITHOUT VALUES AND DOES NOT RERENDER ON GETTING THEM
  // I DONT WANT TO PUT THIS IN STATE SO WE REFUSE TO CACHE THIS
  // const cachedCabinet = useCachedCabinet(id);

  // if (!cachedCabinet) {
  //   refetch();
  // } else {
  //   setFormFields(cachedCabinet);
  // }

  return (
    <Modal
      title="Edit Cabinet"
      open={!!id}
      footer={null}
      onCancel={() => navigate({ to: "/setup/cabinets" })}
      width="90%"
      style={{ maxWidth: "1200px" }}
    >
      <Form
        form={form}
        initialValues={cabinet}
        onValuesChange={debounce((values) => mutateCabinet(values), 300)}
      >
        <Row justify="center">
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Card>
              <FormInput label="Cabinet" name="name" />

              <FormSelect
                label="Type"
                name="type"
                options={Object.values(CABINET_TYPE).map((type) => ({
                  label: capitalize(type),
                  value: type,
                }))}
              />

              <FormSelect
                label="Base Type"
                name="baseType"
                options={Object.values(CABINET_BASE_TYPE).map((baseType) => ({
                  label: capitalize(baseType),
                  value: baseType,
                }))}
              />

              <FormRadioSet
                options={[
                  { label: "Face Frame", value: true },
                  { label: "Full Access", value: false },
                ]}
                label="Cabinet Style"
                name="isFramed"
              />

              <FormRadioSet
                options={[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ]}
                label="Interior Finished?"
                name="isInteriorFinished"
              />

              <Space>
                <FormCheckbox name="favourite" label="Favourite" />

                <FormNumberInput
                  name={["specifications", "partCounts", "sides"]}
                  label="Sides count"
                />
              </Space>

              <br />

              <Space>
                <FormCheckbox name="cornered" label="Cornered" />

                <Form.Item shouldUpdate noStyle>
                  {() => {
                    if (!form.getFieldValue("cornered")) return null;

                    return (
                      <FormSelect
                        label="Corner Style"
                        name="cornerPlacement"
                        select={{
                          style: {
                            minWidth: 100,
                          },
                        }}
                        options={Object.values(CABINET_CORNER_PLACEMENT).map(
                          (placement) => ({
                            label: capitalize(placement),
                            value: placement,
                          })
                        )}
                      />
                    );
                  }}
                </Form.Item>
              </Space>
            </Card>

            <Divider orientation="left">Cabinet dimensions</Divider>

            {/* TODO: might need to be in its own comp with form */}
            <CabinetDimensions />

            <Divider orientation="left">Cabinet parts</Divider>

            {/* TODO: might need to be in its own comp with form */}
            <CabinetParts />
          </Col>

          {/* Potentially needs different solution
            this is done because canvas renders before data is received
            and is not re-rendered when data is fetched */}
          {/* TODO: might need to be in its own comp with form */}
          <Col offset={1} flex="auto">
            {!isLoading && <CabinetIntrinsics />}
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditCabinet;

//     <Title level={4}>Additional Costs</Title>
//     <Form.Item
//       name="additional_material_cost"
//       label="Additional Material Cost"
//     >
//       {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
//       <InputNumber {...inputNumberCostProps} />
//     </Form.Item>
//     <Form.Item
//       name="additional_installation_cost"
//       label="Additional Installation Labor"
//     >
//       <InputNumber {...inputNumberCostProps} />
//     </Form.Item>
//     <Form.Item name="additional_shop_labor" label="Additional Shop Labor">
//       <InputNumber {...inputNumberCostProps} />
//     </Form.Item>
//   </>
