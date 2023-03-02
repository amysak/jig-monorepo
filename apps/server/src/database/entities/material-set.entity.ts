import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

import { AppBaseEntity } from "./base.entity";
import { Cabinet } from "./cabinet.entity";
import { FinishSet } from "./finish.entity";
import { Material } from "./material.entity";
import { Model } from "./model.entity";
import { ProfileSet } from "./profile.entity";
import { Room } from "./room.entity";
import { User } from "./user.entity";

export class NoProfilesPart {
  @ManyToOne(() => Model, { nullable: true })
  @JoinColumn({ name: "model_id" })
  model?: Model;

  @Column("int", { nullable: true })
  modelId?: number;

  @ManyToOne(() => Material, { nullable: true })
  @JoinColumn({ name: "material_id" })
  material?: Material;

  @Column("int", { nullable: true })
  materialId?: number;

  @Column(() => FinishSet)
  finishes?: FinishSet;
}

export class AppliedPart extends NoProfilesPart {
  @Column(() => ProfileSet)
  profiles?: ProfileSet;
}

class MaterialSetMolding {
  @Column(() => NoProfilesPart)
  crown?: NoProfilesPart;

  @Column(() => NoProfilesPart)
  lightRail?: NoProfilesPart;
}

class InteriorMaterials {
  @ManyToOne(() => Material, { nullable: true })
  @JoinColumn({ name: "interior_id" })
  interior?: Material;

  @Column("int", { nullable: true })
  interiorId?: number;

  @ManyToOne(() => Material, { nullable: true })
  @JoinColumn({ name: "back_id" })
  back?: Material;

  @Column("int", { nullable: true })
  backId?: number;

  @ManyToOne(() => Material, { nullable: true })
  @JoinColumn({ name: "shelves_id" })
  shelves?: Material;

  @Column("int", { nullable: true })
  shelvesId?: number;

  @Column(() => FinishSet)
  finishes?: FinishSet;
}

class RoomInterior {
  @Column(() => InteriorMaterials)
  finished?: InteriorMaterials;

  @Column(() => InteriorMaterials)
  unfinished?: InteriorMaterials;

  @Column(() => NoProfilesPart)
  drawerBox?: NoProfilesPart;

  @Column(() => NoProfilesPart)
  tray?: NoProfilesPart;

  @ManyToOne(() => Material)
  platform?: Material;
}

class RoomExterior {
  @Column(() => AppliedPart)
  baseDoor: AppliedPart;

  @Column(() => AppliedPart)
  upperDoor: AppliedPart;

  @Column(() => AppliedPart)
  drawerFront: AppliedPart;

  @Column(() => AppliedPart)
  appliancePanel: AppliedPart;

  @Column(() => AppliedPart)
  wainscotPanel: AppliedPart;

  @Column(() => AppliedPart)
  endPanel: AppliedPart;

  @Column(() => AppliedPart)
  slabEnd: AppliedPart;

  @Column(() => NoProfilesPart)
  toe?: NoProfilesPart;

  @Column(() => NoProfilesPart)
  fillers?: NoProfilesPart;

  @Column(() => NoProfilesPart)
  faceFrame?: NoProfilesPart;

  @ManyToOne(() => Material, { nullable: true })
  edgebanding?: Material;

  @Column(() => MaterialSetMolding)
  molding?: MaterialSetMolding;
}

@Entity()
export class MaterialSet extends AppBaseEntity {
  @Column("text")
  name: string;

  @Column(() => RoomExterior)
  exterior?: RoomExterior;

  @Column(() => RoomInterior)
  interior?: RoomInterior;

  @OneToOne(() => Cabinet, (cabinet) => cabinet.overridenMaterialSet, {
    nullable: true,
    onDelete: "CASCADE",
  })
  cabinet?: Cabinet;

  @OneToOne(() => Room, (room) => room.materialSet, {
    nullable: true,
    onDelete: "CASCADE",
  })
  room?: Room;

  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  user: User;

  @OneToOne(() => User, (user) => user.preferences.materialSet, {
    nullable: true,
    onDelete: "CASCADE",
  })
  defaultForUser?: User;
}
