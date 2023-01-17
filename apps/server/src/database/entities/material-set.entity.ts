// https://orkhan.gitbook.io/typeorm/docs/view-entities
// Later we could use strategy described above to create a view entity and construct it with
// the data from the other entities. This would allow us to remove overhead of "sets".
// For now, material set just contains relationships.

import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ProfileSet } from "./profile.entity";
import { Room } from "./room.entity";

class AppliedPart {
  @Column("text")
  model: string;

  @Column(() => ProfileSet)
  profileSet: ProfileSet;
}

@Entity()
export class MaterialSet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column(() => AppliedPart)
  door: AppliedPart;

  @OneToOne(() => Room, (room) => room.materialSet)
  room: Room;
}
