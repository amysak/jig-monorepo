import { ColumnsType } from "antd/lib/table";
import { isEmpty, isNil } from "lodash-es";
import React from "react";

import { Tag } from "@jigbid/ui";
import { Client } from "type-defs";

export const columns: ColumnsType<Client> = [
  // {
  //   title: "First name",
  //   dataIndex: "first_contact",
  //   key: "first_contact",
  //   width: 230,
  //   render(_, client) {
  //     const { first_contact, preferred_contact, second_contact } = client;
  //     const contact = (client[preferred_contact] ||
  //       first_contact ||
  //       second_contact) as Client["first_contact"];
  //     return !isNil(contact) && !isNil(contact?.first_name) ? (
  //       contact.first_name
  //     ) : (
  //       <Tag color="default">N/A</Tag>
  //     );
  //   },
  // },
  // {
  //   title: "Last name",
  //   dataIndex: "second_contact",
  //   key: "second_contact",
  //   width: 230,
  //   render(_, client) {
  //     const { first_contact, preferred_contact, second_contact } = client;
  //     const contact = (client[preferred_contact] ||
  //       first_contact ||
  //       second_contact) as Client["first_contact"];
  //     return !isNil(contact) && !isNil(contact?.last_name) ? (
  //       contact.last_name
  //     ) : (
  //       <Tag color="default">N/A</Tag>
  //     );
  //   },
  // },
  // {
  //   title: "Name",
  //   dataIndex: "name",
  //   key: "name",
  //   width: 230,
  //   render(name) {
  //     if (isEmpty(name) || isNil(name)) {
  //       return <Tag color="default">N/A</Tag>;
  //     }
  //     return name;
  //   },
  // },
];
