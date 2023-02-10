import { useQuery } from "@tanstack/react-query";
import {
  Navigate,
  Outlet,
  useNavigate,
  useParams,
  useSearch,
} from "@tanstack/react-router";
import { Button, Divider, TableProps } from "antd";
import { MaterialSet } from "type-defs";

import { SetupTable, useSetsColumns } from "features/setup";
import { api } from "lib/api";
import { useCreateMaterialSet } from "lib/hooks/queries";
import { setsIndexRoute, setsRoute } from "./routes";

import "./sets.scss";
import { ReactNode } from "react";

export default function SetsPage() {
  const navigate = useNavigate({ from: setsRoute.id });
  const search = useSearch({ from: setsIndexRoute.id, strict: false });
  const params = useParams({ from: setsIndexRoute.id });

  // TOOD: review keepPreviousData
  const { data: materialSet, isLoading: isMaterialSetLoading } = useQuery({
    queryKey: ["material-sets", search],
    queryFn: () => api.materialSets.getAll(search),
  });

  const { data: hardwareSet, isLoading: isHardwareSetLoading } = useQuery({
    queryKey: ["hardware-sets", search],
    queryFn: () => api.hardwareSets.getAll(search),
  });

  const { mutateAsync: createMaterialSet } = useCreateMaterialSet();
  const { materialSetColumns, hardwareSetColumns } = useSetsColumns();

  const onCreateMaterialSet = async () => {
    const newSet = await createMaterialSet({ name: "New set" });

    navigate({
      to: "/setup/sets/$setType/$id",
      params: { setType: "material", id: newSet.id },
    });
  };

  const materialSetExpanded: TableProps<MaterialSet>["expandable"] = {};

  const materialSetView = (
    <>
      <SetupTable
        rowClassName="sets-table-row"
        columns={materialSetColumns}
        expandableProps={materialSetExpanded}
        displayData={materialSet || { data: [] }}
        isLoading={isMaterialSetLoading}
      />

      <Button type="primary" size="middle" block onClick={onCreateMaterialSet}>
        Add new
      </Button>
    </>
  );

  const onCreateHardwareSet = async () => {
    const newSet = await createMaterialSet({ name: "New set" });
    // TODO: Remove any
    navigate({
      to: "/setup/sets/$setType/$id",
      params: { setType: "hardware", id: newSet.id },
    });
  };

  const hardwareSetExpanded: TableProps<MaterialSet>["expandable"] = {};

  const hardwareSetView = (
    <>
      <SetupTable
        rowClassName="sets-table-row"
        columns={hardwareSetColumns}
        expandableProps={hardwareSetExpanded}
        displayData={hardwareSet || { data: [] }}
        isLoading={isHardwareSetLoading}
      />

      <Button type="primary" size="middle" block onClick={onCreateHardwareSet}>
        Add new
      </Button>
    </>
  );

  let content: ReactNode;

  if (params.setType === "material") {
    content = materialSetView;
  } else if (params.setType === "hardware") {
    content = hardwareSetView;
  } else if (!params.setType) {
    // If no setType matched at all

    content = (
      <>
        <Divider orientation="left">Material Sets</Divider>
        {materialSetView}
        <Divider orientation="left">Hardware Sets</Divider>
        {hardwareSetView}
      </>
    );
  } else {
    return <Navigate to="/setup/sets" replace />;
  }

  return (
    <>
      <Outlet />
      {content}
    </>
  );
}
