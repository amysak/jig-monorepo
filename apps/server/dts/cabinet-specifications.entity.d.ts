import { BaseEntity } from "typeorm";
import { Cabinet } from "./cabinet.entity";
import { AccountPreferences } from "./preferences.entity";
declare class AdjustableShelves {
    quantity: number;
    finishedSidesCount: 0 | 1 | 2;
    depthDifference: number;
}
declare class CabinetBack {
    included: boolean;
    finishedSidesCount: 0 | 1 | 2;
}
declare class CabinetDeck {
    included: boolean;
    finishedSidesCount: 0 | 1 | 2;
    depthDifference: number;
}
declare class CabinetDrawers {
    allowance: number;
    depthDifference: number;
}
declare class CabinetFiller {
    width: number;
}
declare class FaceFrame {
    included: boolean;
    railHeight: number;
    railFinishedSides: 0 | 1 | 2;
    stileWidth: number;
    stileFinishedSides: 0 | 1 | 2;
}
declare class FixedShelves {
    quantity: number;
    finishedSidesCount: 0 | 1 | 2;
    depthDifference: number;
}
declare class Nailer {
    height: number;
    quantity: number;
    finishedSidesCount: 0 | 1 | 2;
    subtractNailerFromBack: boolean;
}
declare class CabinetSides {
    quantity: 1 | 2;
    finishedSidesCount: 0 | 1 | 2;
    depthDifference: number;
}
declare class StretcherBelowDrawer {
    depth: number;
    finishedSidesCount: 0 | 1 | 2;
}
declare class TopBackStretcher {
    depth: number;
    finishedSidesCount: 0 | 1 | 2;
}
declare class TopFrontStretcher {
    depth: number;
    finishedSidesCount: 0 | 1 | 2;
}
declare class CabinetTop {
    included: boolean;
    finishedSidesCount: 0 | 1 | 2;
    depthDifference: number;
}
export declare class CabinetSpecifications extends BaseEntity {
    id: number;
    cabinet?: Cabinet;
    accountPreferences?: AccountPreferences;
    isInteriorFinished: boolean;
    height: number;
    elevation: number;
    depth: number;
    drawerCount: number;
    trayCount: number;
    doorCount: number;
    toeKickHeight: number;
    top: CabinetTop;
    back: CabinetBack;
    deck: CabinetDeck;
    adjustableShelves: AdjustableShelves;
    fixedShelves: FixedShelves;
    nailer: Nailer;
    sides: CabinetSides;
    stretcherBelowDrawer: StretcherBelowDrawer;
    topBackStretcher: TopBackStretcher;
    topFrontStretcher: TopFrontStretcher;
    faceFrame: FaceFrame;
    filler: CabinetFiller;
    drawers: CabinetDrawers;
}
export {};
//# sourceMappingURL=cabinet-specifications.entity.d.ts.map