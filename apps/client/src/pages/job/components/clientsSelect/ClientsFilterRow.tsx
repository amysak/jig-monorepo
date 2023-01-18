import { Row } from "antd";

import { FormInput, FormSelect } from "@jigbid/ui";
import { ACTIVE_INACTIVE_STATUSES_OPTIONS } from "utilities/constants";

export function ClientsFilterRow() {
  return (
    <Row className="cabinets-filter-row">
      <FormInput />

      <FormSelect
        name="status"
        options={ACTIVE_INACTIVE_STATUSES_OPTIONS}
        select={{
          style: { minWidth: "200px" },
          allowClear: true,
          placeholder: "Status",
        }}
      />
    </Row>
  );
}
