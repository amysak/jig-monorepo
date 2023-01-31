import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { AppBaseEntity } from "./base.entity";
import { Cabinet } from "./cabinet.entity";
import { AccountPreferences } from "./preferences.entity";

class CabinetBack {
  @Column("boolean", { default: true })
  included: boolean;

  @Column("text", { default: "behind" })
  // TODO: consider enum
  position: "behind" | "front";

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
  @Column("real", { default: 3 })
  railHeight: number;

  @Column("int", { default: 2 })
  railFinishedSides: 0 | 1 | 2;

  @Column("real", { default: 1.5 })
  stileWidth: number;

  @Column("int", { default: 2 })
  stileFinishedSides: 0 | 1 | 2;
}

class CabinetShelf {
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
  // @Column("int", { default: 2 })
  // quantity: 1 | 2;

  @Column("int", { default: 2 })
  finishedSidesCount: 0 | 1 | 2;

  @Column("real", { default: 0 })
  depthDifference: number;
}

class CabinetStretcher {
  @Column("real", { default: 0 })
  depth: number;

  @Column("int", { default: 0 })
  finishedSidesCount: 0 | 1 | 2;
}

class CabinetStretchers {
  @Column(() => CabinetStretcher)
  back: CabinetStretcher;

  @Column(() => CabinetStretcher)
  top: CabinetStretcher;

  @Column(() => CabinetStretcher)
  bottom: CabinetStretcher;
}

class CabinetTop {
  @Column("boolean", { default: true })
  included: boolean;

  @Column("int", { default: 2 })
  finishedSidesCount: 0 | 1 | 2;

  @Column("real", { default: 0 })
  depthDifference: number;
}

class CabinetShelves {
  @Column(() => CabinetShelf)
  adjustable: CabinetShelf;

  @Column(() => CabinetShelf)
  fixed: CabinetShelf;
}

class CabinetDimensions {
  @Column("real")
  height: number; // floor to top = height + elevation

  @Column("real", { default: 0 })
  elevation: number; // floor to bottom

  @Column("real")
  depth: number;

  @Column("real", { default: 4.25 })
  toeKickHeight: number;
}

class CabinetCounts {
  @Column("integer")
  sides: number;

  @Column("integer")
  trays: number;

  @Column("integer")
  doors: number;

  @Column("integer")
  drawers: number;

  @Column("integer")
  drawerFronts: number;
}

export class CabinetIntrinsicDimensions {
  @Column(() => CabinetTop)
  top: CabinetTop;

  @Column(() => CabinetBack)
  back: CabinetBack;

  @Column(() => CabinetDeck)
  deck: CabinetDeck;

  @Column(() => CabinetShelves)
  shelves: CabinetShelves;

  @Column(() => Nailer)
  nailer: Nailer;

  @Column(() => CabinetSides)
  sides: CabinetSides;

  @Column(() => CabinetStretchers)
  stretchers: CabinetStretchers;

  @Column(() => FaceFrame)
  faceFrame: FaceFrame;

  @Column(() => CabinetFiller)
  filler: CabinetFiller;

  @Column(() => CabinetDrawers)
  drawers: CabinetDrawers;
}

@Entity()
export class CabinetSpecifications extends AppBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(() => CabinetDimensions)
  dimensions: CabinetDimensions;

  @Column(() => CabinetCounts)
  partCounts: CabinetCounts;

  @Column(() => CabinetIntrinsicDimensions)
  intrinsic: CabinetIntrinsicDimensions;

  // ?? TODO
  get partsQuantity() {
    return (
      this.partCounts.drawers +
      this.partCounts.drawerFronts +
      this.partCounts.doors +
      this.partCounts.trays
    );
  }

  // ?? TODO
  get stackedHeight() {
    return 0;
  }

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
}
