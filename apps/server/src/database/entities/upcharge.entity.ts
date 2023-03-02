import { Column, Entity, ManyToOne } from "typeorm";

import { AppBaseEntity } from "./base.entity";
import { Cabinet } from "./cabinet.entity";
import { Model } from "./model.entity";
import { Profile } from "./profile.entity";
import { Room } from "./room.entity";
import { User } from "./user.entity";

@Entity()
export class Upcharge extends AppBaseEntity {
  @Column("text")
  name: string;

  @Column("real")
  amount: number;

  // @Column("text", {default: "none"})
  // type: UpchargeType;

  @Column("text", { nullable: true })
  description?: string;

  @Column("boolean", { default: true })
  report: boolean;

  @ManyToOne(() => Model, (model) => model.upcharges, {
    nullable: true,
    onDelete: "CASCADE",
  })
  model?: Model;

  @ManyToOne(() => Profile, (profile) => profile.upcharges, {
    nullable: true,
    onDelete: "CASCADE",
  })
  profile?: Profile;

  @ManyToOne(() => Cabinet, (cabinet) => cabinet.upcharges, {
    nullable: true,
    onDelete: "CASCADE",
  })
  cabinet?: Cabinet;

  @ManyToOne(() => Room, (room) => room.upcharges, {
    nullable: true,
    onDelete: "CASCADE",
  })
  room?: Room;

  @ManyToOne(() => User, { nullable: true, onDelete: "CASCADE" })
  user?: User;
}
