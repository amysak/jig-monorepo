import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";

import {
  EquipmentRowItems,
  type CabinetBaseType,
  type CabinetCornerType,
  type CabinetType,
} from "type-defs";
import { AppBaseEntity } from "./base.entity";
import { Equipment } from "./equipment.entity";
import { HardwareSet } from "./hardware-set.entity";
import { MaterialSet } from "./material-set.entity";
import { ToePlatform } from "./room-extension.entity";
import { Room } from "./room.entity";
import { Upcharge } from "./upcharge.entity";
import { User } from "./user.entity";
import { Expose } from "class-transformer";

// TODO: probably needs a lot of refactoring related to types
export class FaceFrame {
  @Column("boolean", { default: false })
  included: boolean;

  // What to subtract from the cabinet exterior
  @Column("bool", { default: "none" })
  mode: "stiles" | "both" | "none";

  // Based on equipmentRows but 1 level deeper
  @Column("jsonb", { default: [] })
  rails: { height: number; items?: number[] }[];

  // Stile widths per each row
  @Column("jsonb", { default: [] })
  stiles: number[][];

  @Column("int", { default: 2 })
  railFinishedSides: 0 | 1 | 2;

  @Column("int", { default: 1 })
  stileFinishedSides: 0 | 1 | 2;
}

export class FinishedSides {
  @Column("int")
  finishedSidesCount: 0 | 1 | 2;
}

export class SelfMeasuredPart extends FinishedSides {
  @Column("real")
  length: number;
}

export class HorizontalPart extends FinishedSides {
  @Column("real")
  difference: number;
}

export class CabinetBack extends FinishedSides {}

export class CabinetSide extends FinishedSides {}

export class CabinetTop extends HorizontalPart {}

export class CabinetShelf extends HorizontalPart {}

export class CabinetDeck extends HorizontalPart {}

export class CabinetStretcher extends SelfMeasuredPart {
  @Column("boolean", { default: true })
  requireEdgebanding: boolean;
}

export class CabinetNailer extends SelfMeasuredPart {
  @Column("boolean", { default: true })
  subtract: boolean;
}

export class CabinetShelves {
  @Column("jsonb", { default: [] })
  adjustable: CabinetShelf[];

  @Column("jsonb", { default: [] })
  fixed: CabinetShelf[];
}

// When adding end panel to a cabinet, these are getting set to the dimensions of a cabinet they're applied to
export class CabinetApplied extends SelfMeasuredPart {
  @Column("real")
  width: number;
}

export class CabinetOpening {
  @Column("real", { nullable: false })
  backHeight: number;

  @Column("real", { nullable: false })
  bottomDepth: number;

  @Column("real", { nullable: true })
  frontHeight?: number;

  @Column("real", { nullable: true })
  sideHeight?: number;
}

export class CabinetExterior {
  // rows are for example: [['drawerFront', 'drawerFront'], ['baseDoor', 'baseDoor']]
  // ---   ---
  // |||   |||
  // |||   |||
  // or: [['drawerFront'], ['baseDoor', 'baseDoor']]
  // drawer front, two doors below
  // ---------
  // |||   |||
  // |||   |||
  // or even: [[['drawer', 'drawer', 'drawer']], ['baseDoor'], ['baseDoor']]
  // 3 drawers, door, door as a single row (whole layout as single row lol)
  // ---   |||   |||
  // ---   |||   |||
  // ---   |||   |||
  @Column("jsonb", { default: [] })
  equipmentRows: {
    items: EquipmentRowItems;
    height: number;
  }[];

  // Usually configured in a room
  // Use "included" for defining if the cabinet uses face frame on front-end
  @Column("jsonb", { nullable: true })
  faceFrame: FaceFrame;

  // Usually used in a room
  @Column("jsonb", { default: [] })
  appliedEnds: CabinetApplied[];

  // Usually used in a room but can be predefined
  @Column("jsonb", { default: [] })
  fillers: CabinetApplied[];
}

export class CabinetInterior {
  @Column("jsonb", { nullable: true })
  top?: CabinetTop;

  @Column("jsonb", { nullable: true })
  back?: CabinetBack;

  @Column("jsonb", { nullable: true })
  deck?: CabinetDeck;

  @Column(() => CabinetShelves)
  shelves: CabinetShelves;

  @Column("jsonb", { default: [] })
  sides: CabinetSide[];

  @Column("jsonb", { default: [] })
  nailers: CabinetNailer[];

  @Column("jsonb", { default: [] })
  stretchers: CabinetStretcher[];
}

export class CabinetOpenings {
  @Column("real", { default: 0 })
  reveal: number;

  @Column("jsonb", { default: [] })
  drawers: CabinetOpening[];

  @Column("jsonb", { default: [] })
  trays: CabinetOpening[];
}

export class CabinetDimensions {
  @Column("real", { nullable: true })
  floorToTop: number;

  @Column("real", { nullable: true })
  floorToBottom: number; // floor to bottom, applicable to upper cabinets

  // Used in a room
  @Column("real", { nullable: true })
  width: number;

  @Column("real", { nullable: true })
  depth: number;

  // TODO: should be able to reset in a room and use room's toe height
  // This is set for adjustable legs and standard cabinets
  // Separate platform cabinets have their own toe platform which defines their toe height
  // which is not subtracted from the cabinet when defining layout in preview.tsx
  @Column("real", { nullable: true })
  overridenToeHeight?: number;
}

// Cannot use STI (Single Table Inheritance) because TypeORM is a bad library:
// https://github.com/typeorm/typeorm/issues/9033
// https://github.com/typeorm/typeorm/issues/7558
// https://github.com/typeorm/typeorm/pull/9034

// @TableInheritance({
//   column: { type: "text", name: "type" },
// })
@Entity()
export class Cabinet extends AppBaseEntity {
  @Column("text")
  name: string;

  @Column("boolean", { default: false })
  isFavourite: boolean;

  @Column({ type: "text" })
  type: CabinetType;

  @Column("boolean", { default: false })
  corner: boolean;

  @Column("text", { nullable: true })
  cornerType?: CabinetCornerType;

  // mb remove?
  // @Column("boolean", { default: true })
  // isFinished: boolean;

  @Column(() => CabinetDimensions)
  dimensions: CabinetDimensions;

  @Column(() => CabinetExterior)
  exterior: CabinetExterior;

  @Column(() => CabinetInterior)
  interior: CabinetInterior;

  @Column(() => CabinetOpenings)
  openings: CabinetOpenings;

  // If standard - the sides do not subtract toe kick height
  // If adjustable - most likely needs including legs (default accessories) and the sides subtract toe kick height
  // If separate - then warning in the room when no toe board / platform assigned
  // Toe board is a separate entity and the sides subtract its height when assigned
  @Column("text", { default: "standard" })
  baseType: CabinetBaseType;

  // TODO: a lot of work should be done about how we send and receive data from front-end
  // (DTOs and validators). Typegen is a temporary solution to finish the MVP faster.
  // Generally speaking, toe height of a cabinet should be a single prop in a returned object.
  // Assigning a toe platform if needed should be done via separate endpoint logic.

  // Used in a room
  @ManyToOne(() => ToePlatform, (toePlatform) => toePlatform.cabinets, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  toePlatform?: ToePlatform;

  // Used in a room but can be predefined
  @OneToMany(() => Equipment, (equipment) => equipment.cabinet, {
    cascade: true,
    eager: true,
  })
  equipment: Equipment[];

  @OneToMany(() => Upcharge, (upcharge) => upcharge.cabinet, {
    cascade: true,
    eager: true,
  })
  upcharges: Upcharge[];

  @OneToOne(() => MaterialSet, (materialSet) => materialSet.cabinet, {
    nullable: true,
    onDelete: "SET NULL",
    eager: true,
  })
  @JoinColumn()
  overridenMaterialSet?: MaterialSet;

  @OneToOne(() => HardwareSet, (hardwareSet) => hardwareSet.cabinet, {
    nullable: true,
    onDelete: "SET NULL",
    eager: true,
  })
  @JoinColumn()
  overridenHardwareSet?: HardwareSet;

  @ManyToOne(() => Room, (room) => room.cabinets, {
    nullable: true,
    onDelete: "CASCADE",
  })
  room?: Room;

  @ManyToOne(() => User, (user) => user.cabinets, {
    nullable: false,
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => User, (user) => user.preferences.defaultCabinets, {
    nullable: true,
    onDelete: "CASCADE",
  })
  defaultForUser?: User;

  @Expose()
  get toeHeight(): number {
    console.log("this => ", this);
    return this.dimensions.overridenToeHeight || this.toePlatform?.height || 0;
  }

  @Expose()
  get realHeight(): number {
    return (
      this.dimensions.floorToTop -
      this.dimensions.floorToBottom -
      this.toeHeight
    );
  }

  @Expose()
  get materialSet(): MaterialSet | undefined {
    return this.overridenMaterialSet || this.room?.materialSet;
  }

  @Expose()
  get hardwareSet(): HardwareSet | undefined {
    return this.overridenHardwareSet || this.room?.hardwareSet;
  }
}
