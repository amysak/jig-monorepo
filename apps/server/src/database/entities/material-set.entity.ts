import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Exclude } from "class-transformer";

import { FinishSet } from "./finish.entity";
import { Material } from "./material.entity";
import { ProfileSet } from "./profile.entity";
import { Room } from "./room.entity";
import { Account } from "./account.entity";
import { AppBaseEntity } from "./base.entity";

class AppliedPart {
  @Column("text")
  model?: string;

  @ManyToOne(() => Material, { nullable: true })
  material?: Material;

  @Column(() => ProfileSet)
  profileSet?: ProfileSet;

  @Column(() => FinishSet)
  finishSet?: FinishSet;
}

class NonProfiledPart extends AppliedPart {
  @Exclude()
  finishSet?: FinishSet;

  @Exclude()
  material?: Material;
}

class OnlyMaterialPart extends AppliedPart {
  @Exclude()
  model?: string;

  @Exclude()
  profileSet?: ProfileSet;

  @Exclude()
  finishSet?: FinishSet;
}

class MoldingPart extends AppliedPart {
  @Exclude()
  profileSet?: ProfileSet;

  @Exclude()
  material?: Material;
}

class MaterialSetDoors {
  @Column(() => AppliedPart)
  base?: AppliedPart;

  @Column(() => AppliedPart)
  upper?: AppliedPart;
}

class MaterialSetPanels {
  @Column(() => AppliedPart)
  appliance?: AppliedPart;

  @Column(() => AppliedPart)
  end?: AppliedPart;

  @Column(() => AppliedPart)
  wainscot?: AppliedPart;

  // Technically a wrong inheritance
  @Column(() => AppliedPart)
  slab?: AppliedPart & { profileSet: Pick<ProfileSet, "edge"> };
}

class MaterialSetMolding {
  @Column(() => MoldingPart)
  crown: MoldingPart;

  @Column(() => MoldingPart)
  lightRail: MoldingPart;
}

class CabinetPart {
  @ManyToOne(() => Material)
  interior?: Material;

  @ManyToOne(() => Material)
  back?: Material;

  @Column(() => FinishSet)
  finishSet?: FinishSet;
}

class CabinetParts {
  @Column(() => CabinetPart)
  unfinished?: CabinetPart;

  @Column(() => CabinetPart)
  finished?: CabinetPart;
}

class OpeningPart {
  @Column("text")
  model?: string;

  @ManyToOne(() => Material)
  material?: Material;

  @Column(() => FinishSet)
  finishSet?: FinishSet;
}

class OpeningParts {
  @Column(() => OpeningPart)
  box?: OpeningPart;

  @Column(() => OpeningPart)
  tray?: OpeningPart;
}

class MaterialSetInterior {
  @Column(() => CabinetParts)
  cabinets?: CabinetParts;

  @Column(() => OpeningParts)
  openings?: OpeningParts;
}

@Entity()
export class MaterialSet extends AppBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column(() => MaterialSetDoors)
  doors: MaterialSetDoors;

  @Column(() => MaterialSetPanels)
  panels: MaterialSetPanels;

  @Column(() => NonProfiledPart)
  fillers: NonProfiledPart;

  @Column(() => NonProfiledPart)
  toeBoard: NonProfiledPart;

  @Column(() => NonProfiledPart)
  faceFrame: NonProfiledPart;

  @Column(() => OnlyMaterialPart)
  edgebanding: OnlyMaterialPart;

  @Column(() => MaterialSetMolding)
  molding: MaterialSetMolding;

  @Column(() => MaterialSetInterior)
  interior: MaterialSetInterior;

  @OneToOne(() => Room, (room) => room.materialSet)
  room: Room;

  @ManyToOne(() => Account)
  account: Account;
}
