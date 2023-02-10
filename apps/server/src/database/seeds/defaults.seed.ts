import {
  randAirportName,
  randBoolean,
  randFutureDate,
  randNumber,
  randVehicleManufacturer,
  randVehicleModel,
} from "@ngneat/falso";
import omit from "lodash.omit";
import {
  CABINET_BASE_TYPES,
  CABINET_CORNER_PLACEMENT,
  CABINET_OPENING_TYPE,
} from "type-defs";

import {
  Account,
  Cabinet,
  CabinetEquipment,
  CabinetIntrinsicDimensions,
  CabinetOpening,
  CabinetSpecifications,
  Filler,
  Finish,
  Letter,
  Markup,
  Material,
  MaterialType,
  Model,
  Panel,
  Preferences,
  Profile,
  Terms,
  ToePlatform,
  Upcharge,
  Vendor,
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

export function getDefaults({ account }: DefaultSeedsOptions) {
  const terms = SeedingService.convertDumpToEntities(Terms, defaultTerms).map(
    (terms) => SeedingService.bindEntityToAccount(terms, account)
  );

  const markups = SeedingService.convertDumpToEntities(
    Markup,
    defaultMarkups
  ).map((markup) => SeedingService.bindEntityToAccount(markup, account));

  const letters = SeedingService.convertDumpToEntities(
    Letter,
    defaultLetters.map((letter) => ({
      ...letter,
      body: "Modify me",
    }))
  ).map((letter) => SeedingService.bindEntityToAccount(letter, account));

  return { terms, markups, letters };
}

export function getRoomDefaults({ account }: DefaultSeedsOptions) {
  const panels = SeedingService.convertDumpToEntities(Panel, defaultPanels).map(
    (panel) => SeedingService.bindEntityToAccount(panel, account)
  );

  const profiles = SeedingService.convertDumpToEntities(
    Profile,
    defaultProfiles.map((profile) => ({
      ...profile,
      type: profile.type.toLowerCase(),
    }))
  ).map((profile) => SeedingService.bindEntityToAccount(profile, account));

  const allEquipment = [
    ...defaultMoldings,
    ...defaultTrims,
    ...defaultAccessories,
    ...defaultHardware,
  ] as Partial<
    (typeof defaultAccessories)[number] & (typeof defaultTrims)[number]
  >[];

  const equipment = SeedingService.convertDumpToEntities(
    CabinetEquipment,
    allEquipment.map((equipmentItem) => {
      const upcharges: Partial<Upcharge>[] = [];
      if (equipmentItem.shopLaborCost) {
        upcharges.push({
          name: "Shop Labor",
          description:
            "This is a shop labor upcharge for cabinet equipment item",
          amount: equipmentItem.shopLaborCost,
          account,
        });
      }

      if (equipmentItem.installationLaborCost) {
        upcharges.push({
          name: "Installation",
          description:
            "This is an installation upcharge for cabinet equipment item",
          amount: equipmentItem.installationLaborCost,
          account,
        });
      }

      const categoryField = (
        equipmentItem.type ? equipmentItem.type : equipmentItem.category
      ).toLowerCase();

      // TODO: enum
      let category: string;

      if (categoryField.includes("trim")) {
        category = "trim";
      } else if (categoryField.includes("molding")) {
        category = "molding";
      } else if (categoryField.includes("hardware")) {
        category = "hardware";
      } else if (
        categoryField.includes("counter") ||
        categoryField.includes("access")
      ) {
        category = "accessory";
      } else {
        category = "misc";
      }

      return {
        name: equipmentItem.name,
        category,
        classification:
          equipmentItem.classification || equipmentItem.subclassification,
        description: equipmentItem.description,
        measurement: equipmentItem.unitOfMeasurement?.includes("linear")
          ? "linear"
          : "unit",
        price: equipmentItem.materialCost,
        discount: equipmentItem.discount,
        report: equipmentItem.report === "Yes",
        upcharges: SeedingService.convertDumpToEntities(Upcharge, upcharges),
      };
    })
  ).map((equipItem) => SeedingService.bindEntityToAccount(equipItem, account));

  const toes = SeedingService.convertDumpToEntities(
    ToePlatform,
    defaultToes
      .filter((toe) => toe.type === "Toe Platform")
      .map((toe) => ({
        ...toe,
        type: undefined,
        sleepersCount: toe.sleepers,
      }))
  ).map((toe) => SeedingService.bindEntityToAccount(toe, account));

  const materials = SeedingService.convertDumpToEntities(
    Material,
    defaultMaterials.map((material) => ({
      ...material,
      source: material.source || "in",
      price: material.price || Math.random() * 100,
      laborCost: material.laborCost || 0,
      purpose: material.purpose.toLowerCase().replaceAll(" ", "_"),
      vendor: SeedingService.convertDumpToEntities(Vendor, [
        { name: material.vendor },
      ])[0],
      type: SeedingService.convertDumpToEntities(MaterialType, [
        { name: material.type },
      ])[0],
    }))
  ).map((material) => SeedingService.bindEntityToAccount(material, account));

  const finishes = SeedingService.convertDumpToEntities(
    Finish,
    defaultFinishes.map((finish) => {
      const resFinish: Partial<Finish> = { ...finish } as any;

      if (finish.category.toLowerCase().includes("process")) {
        resFinish.type = "process";
        resFinish.price = {
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
        resFinish.type = finish.category
          .toLowerCase()
          .split(" ")[0] as Finish["type"];
      }

      return resFinish;
    })
  ).map((finish) => SeedingService.bindEntityToAccount(finish, account));

  const fillers = SeedingService.convertDumpToEntities(
    Filler,
    defaultFillers.map((filler) => omit(filler, "type"))
  ).map((filler) => SeedingService.bindEntityToAccount(filler, account));

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
  const baseTypes = Object.values(CABINET_BASE_TYPES);
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
      ]).map((cabinet) => SeedingService.bindEntityToAccount(cabinet, account));

      return { cabinet: convertedCabinet, cabinetSpecifications };
    }
  );

  const vendors = Array.from({ length: 10 }).map(() => {
    const data: Partial<Vendor> = {
      name: randVehicleManufacturer(),
    };

    return Object.assign(new Vendor(), data);
  });

  const modelNameSet = Array.from({ length: 3 }).map(() => randVehicleModel());

  const openingTypes = Object.values(CABINET_OPENING_TYPE);
  const openings = Array.from({ length: 30 })
    .map(() => {
      const override = Math.random() > 0.5;

      const overrideText =
        "This opening has a custom name, so it is being shown instead of it's model name.";

      const data: Partial<CabinetOpening> = {
        name: override ? "Overriden name" : null,
        description: override
          ? overrideText
          : "This is a sample description of a seeded cabinet opening. Feel free to edit it as you wish.",
        type: openingTypes[Math.floor(Math.random() * openingTypes.length)],
        model: SeedingService.convertDumpToEntities(Model, [
          {
            name: modelNameSet[Math.floor(Math.random() * modelNameSet.length)],
            materialType: "wood",
          },
        ])[0],
        price: randNumber({ min: 7, max: 30 }),
      };

      return Object.assign(new CabinetOpening(), data);
    })
    .map((opening) => SeedingService.bindEntityToAccount(opening, account));

  return {
    equipment,
    panels,
    profiles,
    toes,
    materials,
    finishes,
    fillers,
    cabinetsAndSpecs,
    openings,
    vendors,
  };
}
