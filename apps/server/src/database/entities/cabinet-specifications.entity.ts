import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Cabinet } from "./cabinet.entity";
import { AccountPreferences } from "./preferences.entity";

class AdjustableShelves {
  @Column("int", { default: 0 })
  quantity: number;

  @Column("int", { default: 2 })
  finishedSidesCount: 0 | 1 | 2;

  @Column("real", { default: 0 })
  depthDifference: number;
}

class CabinetBack {
  @Column("boolean", { default: true })
  included: boolean;

  @Column("int", { default: 2 })
  finishedSidesCount: 0 | 1 | 2;
}

class CabinetDeck {
  @Column("boolean", { default: true })
  included: boolean;

  @Column("int", { default: 2 })
  finishedSidesCount: 0 | 1 | 2;

  @Column("real", { default: 0 })
  depthDifference: number;
}

class CabinetDrawers {
  @Column("real", { default: 0 })
  allowance: number;

  @Column("real", { default: 0 })
  depthDifference: number;
}

class CabinetFiller {
  @Column("real", { default: 0 })
  width: number;
}

class FaceFrame {
  @Column("boolean", { default: false })
  included: boolean;

  @Column("real", { default: 3 })
  railHeight: number;

  @Column("int", { default: 2 })
  railFinishedSides: 0 | 1 | 2;

  @Column("real", { default: 1.5 })
  stileWidth: number;

  @Column("int", { default: 2 })
  stileFinishedSides: 0 | 1 | 2;
}

class FixedShelves {
  @Column("int", { default: 0 })
  quantity: number;

  @Column("int", { default: 2 })
  finishedSidesCount: 0 | 1 | 2;

  @Column("real", { default: 0 })
  depthDifference: number;
}

class Nailer {
  @Column("real", { default: 0 })
  height: number;

  @Column("int", { default: 1 })
  quantity: number;

  @Column("int", { default: 2 })
  finishedSidesCount: 0 | 1 | 2;

  @Column("boolean", { default: false })
  subtractNailerFromBack: boolean;
}

class CabinetSides {
  @Column("int", { default: 2 })
  quantity: 1 | 2;

  @Column("int", { default: 2 })
  finishedSidesCount: 0 | 1 | 2;

  @Column("real", { default: 0 })
  depthDifference: number;
}

class StretcherBelowDrawer {
  @Column("real", { default: 0 })
  depth: number;

  @Column("int", { default: 2 })
  finishedSidesCount: 0 | 1 | 2;
}

class TopBackStretcher {
  @Column("real", { default: 0 })
  depth: number;

  @Column("int", { default: 2 })
  finishedSidesCount: 0 | 1 | 2;
}

class TopFrontStretcher {
  @Column("real", { default: 0 })
  depth: number;

  @Column("int", { default: 0 })
  finishedSidesCount: 0 | 1 | 2;
}

class CabinetTop {
  @Column("boolean", { default: true })
  included: boolean;

  @Column("int", { default: 2 })
  finishedSidesCount: 0 | 1 | 2;

  @Column("real", { default: 0 })
  depthDifference: number;
}

@Entity()
export class CabinetSpecifications extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Cabinet, (cabinet) => cabinet.specifications, {
    onDelete: "CASCADE",
    nullable: true,
  })
  cabinet?: Cabinet; // if tied to a cabinet, then its this cabinet's specs

  @OneToOne(
    () => AccountPreferences,
    (accountPreferences) => accountPreferences.cabinetSpecifications,
    { onDelete: "CASCADE", nullable: true }
  )
  accountPreferences?: AccountPreferences; // if tied to acc preferences, then its a default

  @Column("boolean")
  isInteriorFinished: boolean;

  @Column("real")
  height: number; // floor to top = height + elevation

  @Column("real", { default: 0 })
  elevation: number; // Defines floor to bottom of cabinet

  @Column("real")
  depth: number;

  @Column("integer")
  drawerCount: number;

  @Column("integer")
  trayCount: number;

  @Column("integer")
  doorCount: number;

  @Column("real", { default: 4.25 })
  toeKickHeight: number;

  @Column(() => CabinetTop)
  top: CabinetTop;

  @Column(() => CabinetBack)
  back: CabinetBack;

  @Column(() => CabinetDeck)
  deck: CabinetDeck;

  @Column(() => AdjustableShelves)
  adjustableShelves: AdjustableShelves;

  @Column(() => FixedShelves)
  fixedShelves: FixedShelves;

  @Column(() => Nailer)
  nailer: Nailer;

  @Column(() => CabinetSides)
  sides: CabinetSides;

  @Column(() => StretcherBelowDrawer)
  stretcherBelowDrawer: StretcherBelowDrawer;

  @Column(() => TopBackStretcher)
  topBackStretcher: TopBackStretcher;

  @Column(() => TopFrontStretcher)
  topFrontStretcher: TopFrontStretcher;

  @Column(() => FaceFrame)
  faceFrame: FaceFrame;

  @Column(() => CabinetFiller)
  filler: CabinetFiller;

  @Column(() => CabinetDrawers)
  drawers: CabinetDrawers;
}
