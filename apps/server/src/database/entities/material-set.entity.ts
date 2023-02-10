import { Exclude } from "class-transformer";
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Account } from "./account.entity";
import { AppBaseEntity } from "./base.entity";
import { Cabinet } from "./cabinet.entity";
import { FinishSet } from "./finish.entity";
import { Material } from "./material.entity";
import { Model } from "./model.entity";
import { ProfileSet } from "./profile.entity";
import { Room } from "./room.entity";

export class AppliedPart {
  @ManyToOne(() => Model, { nullable: true })
  model?: Model;

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
  model: Model;

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

class MaterialSetOpenings {
  @Column(() => AppliedPart)
  door?: AppliedPart;

  @Column(() => AppliedPart)
  drawer?: AppliedPart;
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
  crown?: MoldingPart;

  @Column(() => MoldingPart)
  lightRail?: MoldingPart;
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

class OpeningPart extends AppliedPart {
  @Exclude()
  profileSet?: ProfileSet;
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

class MaterialSetExterior {
  @Column(() => MaterialSetOpenings)
  openings?: MaterialSetOpenings;

  @Column(() => MaterialSetPanels)
  panels?: MaterialSetPanels;

  @Column(() => NonProfiledPart)
  fillers?: NonProfiledPart;

  @Column(() => NonProfiledPart)
  toes?: NonProfiledPart;

  @Column(() => NonProfiledPart)
  faceFrame?: NonProfiledPart;

  @Column(() => OnlyMaterialPart)
  edgebanding?: OnlyMaterialPart;

  @Column(() => MaterialSetMolding)
  molding?: MaterialSetMolding;
}

@Entity()
export class MaterialSet extends AppBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column(() => MaterialSetExterior)
  exterior?: MaterialSetExterior;

  @Column(() => MaterialSetInterior)
  interior?: MaterialSetInterior;

  @OneToOne(() => Cabinet, (cabinet) => cabinet.materialSet, {
    nullable: true,
    onDelete: "CASCADE",
  })
  cabinet?: Cabinet;

  @OneToOne(() => Room, (room) => room.materialSet, {
    nullable: true,
    onDelete: "CASCADE",
  })
  room?: Room;

  @ManyToOne(() => Account, { nullable: true, onDelete: "CASCADE" })
  account: Account;
}
