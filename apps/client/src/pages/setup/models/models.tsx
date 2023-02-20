import { PageSkeleton } from "@jigbid/ui";
import { Outlet } from "@tanstack/react-router";
import { TableProps, Typography } from "antd";

import { SetupTable, useModelsColumns } from "features/setup";
import { useModelsQuery } from "lib/hooks/queries";
import { useToggles } from "lib/store";
import { Model } from "type-defs";

import "./models.scss";

const { Paragraph } = Typography;

function ModelsPage() {
  const { data: models, isLoading } = useModelsQuery();

  const [columns] = useModelsColumns();
  const toggles = useToggles();

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (!models) {
    return null;
  }

  const modelExpanded: TableProps<Model>["expandable"] = {
    expandedRowRender: (model) => <Paragraph>{model.description}</Paragraph>,
    rowExpandable: (model) => !!model.description,
  };

  return (
    <>
      {/* Modal rendering */}
      <Outlet />
      {toggles.setup.view === "table" ? (
        <SetupTable
          rowClassName="models-table-row"
          columns={columns}
          expandableProps={modelExpanded}
          displayData={{ data: models }}
          isLoading={isLoading}
        />
      ) : null}
    </>
  );
}

export default ModelsPage;
