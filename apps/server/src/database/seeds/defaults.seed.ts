import omit from "lodash.omit";
import {
  randAirportName,
  randBoolean,
  randFutureDate,
  randNumber,
} from "@ngneat/falso";

import { CABINET_BASE_TYPE, CABINET_CORNER_PLACEMENT } from "type-defs";
import {
  Accessory,
  Account,
  Cabinet,
  CabinetIntrinsicDimensions,
  CabinetSpecifications,
  Filler,
  Finish,
  FinishProcess,
  Hardware,
  LaborRate,
  Letter,
  Markup,
  Material,
  Molding,
  Panel,
  Preferences,
  Profile,
  Terms,
  Toe,
} from "database/entities";
import { SeedingService } from "services";

import defaultLetters from "database/seeds/data/defaults/letters.json";
import defaultMarkups from "database/seeds/data/defaults/markups.json";
import defaultTerms from "database/seeds/data/defaults/terms.json";
import defaultAccessories from "database/seeds/data/setup/accessories.json";
import defaultCabinets from "database/seeds/data/setup/cabinets.json";
import defaultFillers from "database/seeds/data/setup/fillers.json";
import defaultFinishes from "database/seeds/data/setup/finishes.json";
import defaultHardware from "database/seeds/data/setup/hardware.json";
import defaultLaborRates from "database/seeds/data/setup/labor-rates.json";
import defaultMaterials from "database/seeds/data/setup/materials.json";
import defaultMoldings from "database/seeds/data/setup/moldings.json";
import defaultPanels from "database/seeds/data/setup/panels.json";
import defaultProfiles from "database/seeds/data/setup/profiles.json";
import defaultToes from "database/seeds/data/setup/toes.json";
import defaultTrims from "database/seeds/data/setup/trims.json";

type DefaultSeedsOptions = {
  bindTo?: Preferences;
  account: Account;
};

function generateValue(type: any) {
  switch (type) {
    case String:
      return randAirportName();
    case Number:
      return randNumber();
    case Boolean:
      return randBoolean();
    case Date:
      return randFutureDate();
    default:
      return null;
  }
}

function generateData(obj: any) {
  const data = {};
  const props = Object.getOwnPropertyNames(obj.constructor.prototype);
  for (const prop of props) {
    if (prop !== "constructor") {
      const type = obj[prop];
      if (typeof type === "object") {
        data[prop] = generateData(type);
      } else {
        data[prop] = generateValue(type);
      }
    }
  }
  return data;
}

function generateIntrinsicDimensions() {
  return Object.assign(
    new CabinetIntrinsicDimensions(),
    generateData(new CabinetIntrinsicDimensions())
  );
}

const setIsDefault = (entity: any) =>
  Object.assign(entity, { isDefault: true });

export function getDefaults({ account }: DefaultSeedsOptions) {
  const terms = SeedingService.convertDumpToEntities(Terms, defaultTerms)
    .map((terms) => SeedingService.bindEntityToAccount(terms, account))
    .map(setIsDefault);

  const markups = SeedingService.convertDumpToEntities(Markup, defaultMarkups)
    .map((markup) => SeedingService.bindEntityToAccount(markup, account))
    .map(setIsDefault);

  const letters = SeedingService.convertDumpToEntities(
    Letter,
    defaultLetters.map((letter) => ({
      ...letter,
      body: "Modify me",
    }))
  )
    .map((letter) => SeedingService.bindEntityToAccount(letter, account))
    .map(setIsDefault);

  return { terms, markups, letters };
}

export function getRoomDefaults({ account }: DefaultSeedsOptions) {
  const panels = SeedingService.convertDumpToEntities(Panel, defaultPanels)
    .map((panel) => SeedingService.bindEntityToAccount(panel, account))
    .map(setIsDefault);

  const profiles = SeedingService.convertDumpToEntities(
    Profile,
    defaultProfiles.map((profile) => ({
      ...profile,
      type: profile.type.toLowerCase(),
    }))
  )
    .map((profile) => SeedingService.bindEntityToAccount(profile, account))
    .map(setIsDefault);

  const moldings = SeedingService.convertDumpToEntities(
    Molding,
    defaultMoldings.map((molding) => omit(molding, "type"))
  )
    .map((molding) => SeedingService.bindEntityToAccount(molding, account))
    .map(setIsDefault);

  const trims = SeedingService.convertDumpToEntities(
    Molding,
    defaultTrims.map((trim) => omit(trim, "type"))
  )
    .map((trim) => SeedingService.bindEntityToAccount(trim, account))
    .map(setIsDefault);

  const toes = SeedingService.convertDumpToEntities(
    Toe,
    defaultToes.map((toe) => ({
      ...toe,
      type: toe.type.split(" ")[1].toLowerCase(),
    }))
  )
    .map((toe) => SeedingService.bindEntityToAccount(toe, account))
    .map(setIsDefault);

  const materials = SeedingService.convertDumpToEntities(
    Material,
    defaultMaterials.map((material) =>
      omit(
        {
          ...material,
          source: material.source || "in",
          price: material.price || Math.random() * 100,
          laborCost: material.laborCost || 0,
          purpose: material.purpose.toLowerCase().replaceAll(" ", "_"),
        },
        "type"
      )
    )
  )
    .map((material) => SeedingService.bindEntityToAccount(material, account))

    .map(setIsDefault);

  const finishes = SeedingService.convertDumpToEntities(
    Finish,
    defaultFinishes.map((finish) => {
      const resFinish: Partial<Finish> = { ...finish } as any;

      if (finish.category === "Finish Process") {
        resFinish.category = "process";
        (resFinish as FinishProcess).price = {
          perPart: {
            twoSidesCost: Math.random() * 10,
            simplePercent: 67,
          },
          perSquareFeet: {
            twoSidesCost: Math.random() * 10,
            simplePercent: 100,
            inHouseCost: Math.random() * 5,
          },
        };
      } else {
        resFinish.category = finish.category
          .toLowerCase()
          .split(" ")[0] as Finish["category"];
      }

      return omit(resFinish, "type");
    })
  )
    .map((finish) => SeedingService.bindEntityToAccount(finish, account))
    .map(setIsDefault);

  const laborRates = SeedingService.convertDumpToEntities(
    LaborRate,
    defaultLaborRates.map((laborRate) => ({
      ...laborRate,
      category: laborRate.category.toLowerCase(),
    }))
  )
    .map((laborRate) => SeedingService.bindEntityToAccount(laborRate, account))
    .map(setIsDefault);

  const accessories = SeedingService.convertDumpToEntities(
    Accessory,
    defaultAccessories.map((accessory) => ({
      ...accessory,
      report: true,
      discount: accessory.discount ? accessory.discount * 100 : 5,
    }))
  )
    .map((accessory) => SeedingService.bindEntityToAccount(accessory, account))
    .map(setIsDefault);

  const hardware = SeedingService.convertDumpToEntities(
    Hardware,
    defaultHardware.map((hardware) => ({
      ...hardware,
      report: true,
      discount: hardware.discount ? hardware.discount * 100 : 5,
    }))
  )
    .map((hardware) => SeedingService.bindEntityToAccount(hardware, account))
    .map(setIsDefault);

  const fillers = SeedingService.convertDumpToEntities(
    Filler,
    defaultFillers.map((filler) => omit(filler, "type"))
  )
    .map((filler) => SeedingService.bindEntityToAccount(filler, account))
    .map(setIsDefault);

  // {
  //   "cabinetBackHeight": "43.75",
  //   "cabinetDepth": "15",
  //   "name": "Closet-Open 1 Shelf (long hanging)",
  //   "cabinetSideHeight": "90.75", => height - toeKickHeight
  //   "category": "Tall",
  //   "style": "Full Access",
  //   "quantityParts": "8",
  //   "stackedHeight": "77.5",
  //   "cabinetHeight": "48",
  //   "floorTopTopOfCabinet": "95",
  //   "floorToBottomOfUpper": "47",
  //   "interior": "Finished",
  //   "baseDoors": "0",
  //   "upperDoors": "0",
  //   "df": "0",
  //   "drawers": "0",
  //   "trays": "0",
  //   "sides": "2",
  //   "toeKickHeight": "4.25",
  //   "type": "tall"
  // },

  // some fields might be needed but we can define those in the child entity of cabinet
  // most of those parameters are usually defined in the cabinet specifications
  const baseTypes = Object.values(CABINET_BASE_TYPE);
  const placements = Object.values(CABINET_CORNER_PLACEMENT);

  const cabinetSeeds = defaultCabinets.map((cabinet) => {
    const resCabinet: Record<string, unknown> &
      Partial<typeof cabinet> &
      Partial<Cabinet> = {
      name: cabinet.name.replace(/.*-.{2}-/, ""),
      type: cabinet.type as any,
      isInteriorFinished: cabinet.interior === "Finished",
      isFramed: cabinet.style === "Face Frame" ? true : false,
      baseType: baseTypes[randNumber({ max: baseTypes.length })],
      cornerPlacement: placements[randNumber({ max: placements.length })],
    };

    const cabinetSpecifications = new CabinetSpecifications();

    cabinetSpecifications.intrinsic = generateIntrinsicDimensions();
    cabinetSpecifications.dimensions = {
      height:
        Number(cabinet.cabinetHeight) ||
        Number(cabinet.floorToTopOfCabinet) -
          Number(cabinet.floorToBottomOfUpper) ||
        34.5,
      depth: +cabinet.cabinetDepth,
      elevation: cabinet.floorToBottomOfUpper
        ? +cabinet.floorToBottomOfUpper
        : 0,
      toeKickHeight: cabinet.type !== "upper" ? +cabinet.toeKickHeight : 0,
    };
    cabinetSpecifications.partCounts = {
      doors: +cabinet.baseDoors + +cabinet.upperDoors,
      drawers: +cabinet.drawers,
      drawerFronts: +cabinet.df,
      trays: +cabinet.trays,
      sides: +cabinet.sides,
    };

    return { cabinet: resCabinet, cabinetSpecifications };

    // ?? TODO
    // "quantityParts": "10",
    // "stackedHeight": "168",
    // cabinetSpecifications.backHeight =  +cabinet.cabinetBackHeight;
    // cabinetSpecifications.sideHeight =  +cabinet.cabinetSideHeight;
    // cabinetSpecifications.partsQuantity = +cabinet.quantityParts
    // cabinetSpecifications.stackedHeight = +cabinet.stackedHeight
  });

  const cabinetsAndSpecs = cabinetSeeds.map(
    ({ cabinet, cabinetSpecifications }) => {
      const [convertedCabinet] = SeedingService.convertDumpToEntities(Cabinet, [
        cabinet,
      ])
        .map((cabinet) => SeedingService.bindEntityToAccount(cabinet, account))
        .map(setIsDefault);

      return { cabinet: convertedCabinet, cabinetSpecifications };
    }
  );

  return {
    panels,
    profiles,
    moldings,
    trims,
    toes,
    materials,
    finishes,
    laborRates,
    accessories,
    hardware,
    fillers,
    cabinetsAndSpecs,
  };
}
