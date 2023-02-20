import { ProfileType } from "type-defs";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import { AppBaseEntity } from "./base.entity";
import { Room } from "./room.entity";
import { Upcharge } from "./upcharge.entity";
import { User } from "./user.entity";
import { Vendor } from "./vendor.entity";

@Entity()
// @TableInheritance({
//   column: { type: "varchar", name: "type", enum: PROFILE_TYPE },
// })
export class Profile extends AppBaseEntity {
  @Column("text")
  name: ProfileType;

  @Column("text")
  type: ProfileType;

  @OneToMany(() => Upcharge, (upcharge) => upcharge.profile)
  upcharges: Upcharge;

  @Column("text", { nullable: true })
  image?: string;

  @ManyToOne(() => Vendor, { onDelete: "SET NULL" })
  vendor: Vendor;

  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  user: User;

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
  @ManyToOne(() => Profile, { nullable: true, eager: true })
  @JoinColumn({ name: "edge_id" })
  edge?: Profile;

  @Column("int", { nullable: true })
  edgeId?: number;

  @ManyToOne(() => Profile, { nullable: true, eager: true })
  @JoinColumn({ name: "frame_id" })
  frame?: Profile;

  @Column("int", { nullable: true })
  frameId?: number;

  @ManyToOne(() => Profile, { nullable: true, eager: true })
  @JoinColumn({ name: "panel_id" })
  panel?: Profile;

  @Column("int", { nullable: true })
  panelId?: number;
}
