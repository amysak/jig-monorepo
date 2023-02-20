import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";

import { Address } from "./address.entity";
import { AppBaseEntity } from "./base.entity";
import { Job } from "./job.entity";
import { User } from "./user.entity";

class ClientAddresses {
  @OneToOne(() => Address, { nullable: true })
  @JoinColumn()
  mailing?: Address;

  @OneToOne(() => Address, { nullable: true })
  @JoinColumn()
  physical?: Address;
}

@Entity()
export class Client extends AppBaseEntity {
  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  email?: string;

  @Column(() => ClientAddresses)
  addresses: ClientAddresses;

  @OneToMany(() => Job, (job) => job.client)
  jobs: Job[];

  @ManyToOne(() => User, (user) => user.clients, {
    nullable: false,
    onDelete: "CASCADE",
  })
  user: User;
}
