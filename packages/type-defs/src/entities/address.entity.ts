import {
  ChildEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";

import { ADDRESS_TYPE } from "../types";
import { Account } from "./account.entity";

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
@TableInheritance({
  column: { type: "text", name: "type", enum: ADDRESS_TYPE },
})
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(() => AddressName)
  name: AddressName;

  @Column("text")
  type: string;

  @Column("simple-array")
  phoneNumbers?: PhoneNumber[];

  @ManyToOne(() => Account, (account) => account.company?.addresses)
  account: Account;
}

@ChildEntity(ADDRESS_TYPE.PHYSICAL)
export class PhysicalAddress extends Address {}

@ChildEntity(ADDRESS_TYPE.MAILING)
export class MailingAddress extends Address {}
