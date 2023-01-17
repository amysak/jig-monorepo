import {
  BaseEntity,
  ChildEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";

import { PROFILE_TYPE } from "type-defs";

@Entity()
@TableInheritance({
  column: { type: "varchar", name: "type", enum: PROFILE_TYPE },
})
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  type: string;
}

@ChildEntity(PROFILE_TYPE.EDGE)
export class EdgeProfile extends Profile {}

@ChildEntity(PROFILE_TYPE.FRAME)
export class FrameProfile extends Profile {}

@ChildEntity(PROFILE_TYPE.PANEL)
export class PanelProfile extends Profile {}

export class ProfileSet {
  @ManyToOne(() => EdgeProfile)
  edge?: EdgeProfile;

  @ManyToOne(() => FrameProfile)
  frame?: FrameProfile;

  @ManyToOne(() => PanelProfile)
  panel?: PanelProfile;
}
