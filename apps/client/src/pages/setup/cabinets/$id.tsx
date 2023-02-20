import { useParams } from "@tanstack/react-router";
import { CabinetEdit, EditModal } from "features/edit";

import { cabinetRoute } from "./routes";

export default function CabinetPage() {
  const params = useParams({ from: cabinetRoute.id });

  return <EditModal content={<CabinetEdit id={params.id} />} />;
}
