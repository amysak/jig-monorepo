import { Column, Entity, ManyToOne } from "typeorm";
import { AppBaseEntity } from "./base.entity";

import { User } from "./user.entity";

export class PhoneNumber {
  @Column("text", { nullable: true })
  label?: string;

  @Column("text")
  digits: string;
}

class AddressName {
  @Column("text")
  salutation: string;

  @Column("text")
  first: string;

  @Column("text")
  last: string;

  @Column("text", { nullable: true })
  title?: string;
}

@Entity()
export class Address extends AppBaseEntity {
  @Column("text")
  type: string;

  @Column(() => AddressName)
  name: AddressName;

  @Column("text", { nullable: true })
  addressLine: string;

  @Column("jsonb", { default: [] })
  phoneNumbers?: PhoneNumber[];

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;
}
