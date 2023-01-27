import { useMatch, useNavigate } from "@tanstack/react-location";
import { Card, Col, Divider, Form, Modal, Row, Space, theme } from "antd";
import { capitalize } from "lodash-es";

import {
  FormCheckbox,
  FormInput,
  FormNumberInput,
  FormRadioSet,
  FormSelect,
} from "@jigbid/ui";
import {
  useCabinetQuery,
  useCachedCabinet,
  useMutateCabinet,
} from "hooks/queries";
import { LocationGenerics } from "router";
import {
  Cabinet,
  CABINET_BASE_TYPE,
  CABINET_CORNER_PLACEMENT,
  CABINET_TYPE,
} from "type-defs";

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
  const {
    token: { colorInfo },
  } = theme.useToken();
  const setFormFields = (cabinet: Cabinet) => {
    console.log("cabinet => ", cabinet);
    form.setFieldsValue(cabinet);
  };

  const {
    params: { id },
  } = useMatch<LocationGenerics>();
  const navigate = useNavigate<LocationGenerics>();

  const { refetch } = useCabinetQuery(id, {
    enabled: false,
    onSuccess: (data) => setFormFields(data),
  });

  // Checking for existing queries with requested cabinet
  // Using the same constant to render the form
  const cachedCabinet = useCachedCabinet(id);

  if (!cachedCabinet) {
    refetch();
  } else {
    setFormFields(cachedCabinet);
  }

  // Calling mutate cabinet hook
  const { mutate: mutateCabinet } = useMutateCabinet(id);

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
        onFinish={(values) => mutateCabinet(values)}
        // onChange={debounce(() => mutateCabinet(id), 300)}
      >
        <Row justify="center">
          <Col flex="50%">
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

                <FormCheckbox name="cornered" label="Cornered" />

                <FormNumberInput
                  name={["specifications", "partCounts", "sides"]}
                  label="Sides count"
                />
              </Space>

              <Form.Item shouldUpdate noStyle>
                {() => {
                  if (!form.getFieldValue("corner")) return null;

                  return (
                    <FormSelect
                      label="Corner Style"
                      name="cornerPlacement"
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
            </Card>

            <Divider orientation="left">Cabinet dimensions</Divider>

            <CabinetDimensions />

            <Divider orientation="left">Cabinet parts</Divider>

            <CabinetParts />
          </Col>

          <Col flex="auto">
            <CabinetIntrinsics />
          </Col>
        </Row>

        <Divider
          style={{
            borderBlockStartColor: colorInfo,
            marginTop: 5,
          }}
        />
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
