import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { ProfileType } from "type-defs";
import { Account } from "./account.entity";
import { DefaultableBaseEntity } from "./base.entity";
import { Room } from "./room.entity";
import { Vendor } from "./vendor.entity";

@Entity()
// @TableInheritance({
//   column: { type: "varchar", name: "type", enum: PROFILE_TYPE },
// })
export class Profile extends DefaultableBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: ProfileType;

  @Column("text")
  type: ProfileType;

  @Column("real", { nullable: true })
  upcharge?: number;

  @Column("text", { nullable: true })
  imageUrl?: string;

  @ManyToOne(() => Vendor, { onDelete: "SET NULL" })
  vendor: Vendor;

  // If tied to an account - it's a default. Else - should be tied to room, then it's
  // determined by account rooms that it belongs to this account and it means that it
  // is allowed to edit
  @ManyToOne(() => Account, { nullable: true, onDelete: "CASCADE" })
  account?: Account;

  @ManyToOne(() => Room, { nullable: true, onDelete: "CASCADE" })
  room?: Room;
}

// @ChildEntity(PROFILE_TYPE.EDGE)
// export class EdgeProfile extends Profile {}

// @ChildEntity(PROFILE_TYPE.FRAME)
// export class FrameProfile extends Profile {}

// @ChildEntity(PROFILE_TYPE.PANEL)
// export class PanelProfile extends Profile {}

export class ProfileSet {
  @ManyToOne(() => Profile, { nullable: true })
  edge?: Profile;

  @ManyToOne(() => Profile, { nullable: true })
  frame?: Profile;

  @ManyToOne(() => Profile, { nullable: true })
  panel?: Profile;
}
