import { Exclude } from "class-transformer";
import { type UserRole } from "type-defs";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

import { Address } from "./address.entity";
import { AppBaseEntity } from "./base.entity";
import { Cabinet } from "./cabinet.entity";
import { Client } from "./client.entity";
import { HardwareSet } from "./hardware-set.entity";
import { Job } from "./job.entity";
import { Markup } from "./markup.entity";
import { MaterialSet } from "./material-set.entity";
import { Terms } from "./terms.entity";

// Favorites and preferences
export class UserPreferences {
  @Column("text", { nullable: true })
  reportText?: string;

  @Column("real", { default: 0 })
  ratePerMinute: number;

  @OneToOne(() => Terms, (terms) => terms.defaultForUser, {
    nullable: true,
    onDelete: "SET NULL",
    cascade: true,
  })
  @JoinColumn()
  terms?: Terms;

  @OneToOne(() => Markup, (markup) => markup.defaultForUser, {
    nullable: true,
    onDelete: "SET NULL",
    cascade: true,
  })
  @JoinColumn()
  markup?: Markup;

  @OneToOne(() => MaterialSet, (materialSet) => materialSet.defaultForUser, {
    nullable: true,
    onDelete: "SET NULL",
    cascade: true,
  })
  @JoinColumn()
  materialSet?: MaterialSet;

  @OneToOne(() => HardwareSet, {
    nullable: true,
    onDelete: "SET NULL",
    cascade: true,
  })
  @JoinColumn()
  hardwareSet?: HardwareSet;

  @OneToMany(() => Cabinet, (cabinet) => cabinet.defaultForUser, {
    nullable: true,
    onDelete: "SET NULL",
  })
  defaultCabinets?: HardwareSet;
}

@Entity({ name: "users" })
export class User extends AppBaseEntity {
  @Column("text")
  name: string;

  @Column("text", { unique: true })
  email: string;

  @Exclude()
  @Column("text", { nullable: true })
  password?: string; // pw hash

  @Exclude()
  @Column("text", { nullable: true })
  salt?: string; // individually generated salt to match against when calling bcrypt.compare()

  @Column("text", { default: "sales" })
  role: UserRole;

  @Exclude()
  @Column("text", { nullable: true })
  stripeKey?: string;

  @Column("text", { nullable: true })
  contactName?: string;

  @OneToMany(() => Address, (address) => address.user)
  addresses?: Address[];

  @Column("text", { nullable: true })
  image?: string; // blob / link to storage

  @Column(() => UserPreferences)
  preferences: UserPreferences;

  @OneToMany(() => Client, (client) => client.user)
  clients: Client[];

  @OneToMany(() => Job, (job) => job.user)
  jobs: Job[];

  @OneToMany(() => Cabinet, (cabinet) => cabinet.user)
  cabinets: Cabinet[];

  // The solution below is an alternative to using @UseInterceptors(ClassSerializerInterceptor)
  // toJSON() {
  //   return instanceToPlain(this);
  // }
}
