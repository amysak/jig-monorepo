import {
  randAirportName,
  randBoolean,
  randFutureDate,
  randNumber,
  randProductDescription,
  randVehicleManufacturer,
  randVehicleModel,
} from "@ngneat/falso";

import {
  Cabinet,
  CabinetInterior,
  Equipment,
  FinishProcess,
  Markup,
  Material,
  Model,
  Paint,
  Profile,
  ProfileSet,
  Terms,
  Upcharge,
  User,
  Vendor,
} from "database/entities";
import { SeedingService } from "services";
import { CABINET_BASE_TYPES } from "type-defs";

import defaultMarkups from "database/seeds/data/defaults/markups.json";
import defaultTerms from "database/seeds/data/defaults/terms.json";
import defaultAccessories from "database/seeds/data/setup/accessories.json";
import defaultCabinets from "database/seeds/data/setup/cabinets.json";
import defaultFinishes from "database/seeds/data/setup/finishes.json";
import defaultHardware from "database/seeds/data/setup/hardware.json";
import defaultMaterials from "database/seeds/data/setup/materials.json";
import defaultMoldings from "database/seeds/data/setup/moldings.json";
import defaultProfiles from "database/seeds/data/setup/profiles.json";
import defaultTrims from "database/seeds/data/setup/trims.json";
import { DeepPartial } from "typeorm";

type DefaultSeedsOptions = {
  user: User;
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

function generateInteriorDimensions() {
  return Object.assign(
    new CabinetInterior(),
    generateData(new CabinetInterior())
  );
}

export function getDefaults({ user }: DefaultSeedsOptions) {
  const terms = SeedingService.convertDumpToEntities(Terms, defaultTerms).map(
    (terms) => SeedingService.bindEntityToUser(terms, user)
  );

  const markups = SeedingService.convertDumpToEntities(
    Markup,
    defaultMarkups
  ).map((markup) => SeedingService.bindEntityToUser(markup, user));

  return { terms, markups };
}

function generateModelInfo(profiles: ProfileSet) {
  return {
    description: randProductDescription(),
    price: randNumber({ min: 3, max: 20, precision: 3 }),
    discount: randNumber({ min: 0, max: 20 }),
    profiles,
  };
}

export function getRoomDefaults({ user }: DefaultSeedsOptions) {
  const allEquipment = [
    ...defaultMoldings,
    ...defaultTrims,
    ...defaultAccessories,
    ...defaultHardware,
  ] as Partial<
    (typeof defaultAccessories)[number] & (typeof defaultTrims)[number]
  >[];

  const equipment = SeedingService.convertDumpToEntities(
    Equipment,
    allEquipment.map((equipmentItem) => {
      const upcharges: Partial<Upcharge>[] = [];
      if (equipmentItem.shopLaborCost) {
        upcharges.push({
          name: "Shop Labor",
          description:
            "This is a shop labor upcharge for cabinet equipment item",
          amount: equipmentItem.shopLaborCost,
          user,
        });
      }

      if (equipmentItem.installationLaborCost) {
        upcharges.push({
          name: "Installation",
          description:
            "This is an installation upcharge for cabinet equipment item",
          amount: equipmentItem.installationLaborCost,
          user,
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
  ).map((equipItem) => SeedingService.bindEntityToUser(equipItem, user));

  const finishes = defaultFinishes
    .map((finish) => {
      const resFinish: FinishProcess | Paint = { ...finish } as any;

      if (finish.category.toLowerCase().includes("process")) {
        (resFinish as FinishProcess).price = {
          perPart: {
            twoSidesCost: Math.random() * 10,
            simplePercent: 67,
            discount: randNumber({ min: 0, max: 30 }),
          },
          perSquareFeet: {
            twoSidesCost: Math.random() * 10,
            discount: randNumber({ min: 0, max: 15 }),
          },
        };
        return Object.assign(new FinishProcess(), resFinish);
      } else {
        (resFinish as Paint).type = finish.category
          .toLowerCase()
          .split(" ")[0] as Paint["type"];
        return Object.assign(new Paint(), resFinish);
      }
    })
    .map((finish) => SeedingService.bindEntityToUser(finish, user));

  const materials = SeedingService.convertDumpToEntities(
    Material,
    defaultMaterials.map((material) => ({
      ...material,
      source: material.source || "in",
      price: material.price || Math.random() * 100,
      laborCost: material.laborCost || 0,
      purpose: material.purpose.toLowerCase().replaceAll(" ", "_"),
      vendor: SeedingService.convertDumpToEntities(Vendor, [
        { name: material.vendor, user },
      ])[0],
      type: material.type,
    }))
  ).map((material) => SeedingService.bindEntityToUser(material, user));

  const vendors = Array.from({ length: 10 }).map(() => {
    const data: Partial<Vendor> = {
      name: randVehicleManufacturer(),
      user,
    };

    return Object.assign(new Vendor(), data);
  });

  const profiles = SeedingService.convertDumpToEntities(
    Profile,
    defaultProfiles.map((profile) => ({
      ...profile,
      type: profile.type.toLowerCase(),
      vendor: vendors[Math.floor(Math.random() * vendors.length)],
    }))
  ).map((profile) => SeedingService.bindEntityToUser(profile, user));

  const models = SeedingService.convertDumpToEntities(
    Model,
    Array.from({ length: 10 }).map(() => {
      const edgeProfiles = profiles.filter(
        (profile) => profile.type === "edge"
      );
      const frameProfiles = profiles.filter(
        (profile) => profile.type === "frame"
      );
      const panelProfiles = profiles.filter(
        (profile) => profile.type === "panel"
      );

      const modelProfiles = Object.assign(new ProfileSet(), {
        edge: edgeProfiles[randNumber({ max: edgeProfiles.length - 1 })],
        frame: frameProfiles[randNumber({ max: frameProfiles.length - 1 })],
        panel: panelProfiles[randNumber({ max: panelProfiles.length - 1 })],
      });

      const upcharges = [
        Object.assign(new Upcharge(), {
          name: "Model complexity upcharge",
          description:
            "This model is really hard to implement so the price is higher.",
          amount: randNumber({ precision: 2 }),
        }),
      ];

      return {
        name: randVehicleModel(),
        description: `
          This is a simple description for your model. 
          This entity contains models, prices and upcharges for each part that can be assigned a model 
          in a room. You can edit the prices and images by your desire.
        `,
        // Random img
        image:
          "https://cdn.shopify.com/s/files/1/2444/1465/products/2116352507969_600x.jpg?v=1606944179",
        vendor: vendors[randNumber({ max: vendors.length - 1 })],
        materialType: materials[randNumber({ max: materials.length - 1 })].type,
        baseDoor: generateModelInfo(modelProfiles),
        upperDoor: generateModelInfo(modelProfiles),
        drawerFront: generateModelInfo(modelProfiles),
        appliancePanel: generateModelInfo(modelProfiles),
        wainscotPanel: generateModelInfo(modelProfiles),
        endPanel: generateModelInfo(modelProfiles),
        slabEnd: generateModelInfo(modelProfiles),
        upcharges,
      };
    })
  ).map((model) => SeedingService.bindEntityToUser(model, user));

  const baseTypes = Object.values(CABINET_BASE_TYPES);
  // const placements = Object.values(CABINET_CORNER_PLACEMENT);

  const cabinets = SeedingService.convertDumpToEntities(
    Cabinet,
    defaultCabinets.map((cabinet) => {
      const resCabinet: DeepPartial<Cabinet> = {};

      resCabinet.name = cabinet.name.replace(/.*-.{2}-/, "");
      resCabinet.type = cabinet.type as any;
      // isInteriorFinished: cabinet.interior === "Finished",
      resCabinet.dimensions = {
        floorToTop: Number(cabinet.floorToTopOfCabinet),
        floorToBottom: cabinet.floorToBottomOfUpper
          ? +cabinet.floorToBottomOfUpper
          : 0,
        depth: +cabinet.cabinetDepth,
      };

      resCabinet.interior = generateInteriorDimensions();

      resCabinet.baseType =
        baseTypes[randNumber({ max: baseTypes.length - 1 })];
      resCabinet.exterior = {
        faceFrame: {
          stileWidth: 1.5,
          fullHeight: true,
          // This basically represents a face frame with 1 column (meaning 2 stiles)
          // and 3 rails, each 1.5in in height. This means, when calculating dimensions
          // of cabinet parts in a room and such face frame is attached:
          // Don't include allowance & subtract total face frame sq ft before applying materials
          // P.S. new idea is to let user choose between full height and rows height and calc
          // ff height automatically
          // columns: [[1.5, 1.5, 1.5]],
        },
      };
      if (
        resCabinet.baseType === "standard" ||
        resCabinet.baseType === "adjustable"
      )
        resCabinet.overridenToeHeight = 4.25;
      // switch (baseType) {
      //   case "adjustable":
      //     // resCabinet.equipment.push()
      //     // TODO: front end should warn
      //     break;
      //   case "separate":
      //     // resCabinet.exterior.toePlatform =
      //     // TODO: front end should warn
      //     break;
      //   case "standard":

      //   default:
      //     break;
      // }
      // cornerPlacement: placements[randNumber({ max: placements.length })],

      return resCabinet;
    })
    // These are now usually set in rooms
  ).map((cabinet) => SeedingService.bindEntityToUser(cabinet, user));

  return {
    equipment,
    profiles,
    materials,
    models,
    finishes,
    cabinets,
    vendors,
  };
}
