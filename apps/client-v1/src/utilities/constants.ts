import { createOptions, keyMirror } from "./utils";

const CABINET_STYLES = ["full access", "face frame"];

const TERM_CHOICES = {
  NET_WITH_DISCOUNT: "Net (With Discount)",
  THREE_PAYMENT: "Three Payment",
  TWO_PAYMENT: "Two Payment",
  NET_NO_DISCOUNT: "Net (No Discount)",
};

const TERMS_OPTIONS = [
  {
    label: "2%-10 days-net 30 delivered and installed",
    value: "2%-10 days-net 30 delivered and installed",
    termChoice: "Net (With Discount)",
  },
  {
    label: "2%-5 days-net 30 delivered and installed",
    value: "2%-5 days-net 30 delivered and installed",
    termChoice: "Net (With Discount)",
  },
  {
    label: "34-33-33(upon) delivered and installed",
    value: "34-33-33(upon) delivered and installed",
    termChoice: "Three Payment",
  },
  {
    label: "5%-10 days-net 30 delivered and installed",
    value: "5%-10 days-net 30 delivered and installed",
    termChoice: "Net (With Discount)",
  },
  {
    label: "5%-5 days-net 30 delivered and installed",
    value: "5%-5 days-net 30 delivered and installed",
    termChoice: "Net (With Discount)",
  },
  {
    label: "50-25-25 (at time of storage)",
    value: "50-25-25 (at time of storage)",
    termChoice: "Three Payment",
  },
  {
    label: "50-40-10 (Prior) delivered and installed",
    value: "50-40-10 (Prior) delivered and installed",
    termChoice: "Three Payment",
  },
  {
    label: "50-40-10 (upon) delivered and installed",
    value: "50-40-10 (upon) delivered and installed",
    termChoice: "Three Payment",
  },
  {
    label: "50-50 (at del) delivered, not installed-DS",
    value: "50-50 (at del) delivered, not installed-DS",
    termChoice: "Two Payment",
  },
  {
    label: "50-50 (prior del) delivered, not installed",
    value: "50-50 (prior del) delivered, not installed",
    termChoice: "Two Payment",
  },
  {
    label: "50-50 (upon comp) delivered and installed",
    value: "50-50 (upon comp) delivered and installed",
    termChoice: "Two Payment",
  },
  {
    label: "50-50 (upon del) delivered and installed",
    value: "50-50 (upon del) delivered and installed",
    termChoice: "Two Payment",
  },
  {
    label: "50-50 Pick up",
    value: "50-50 Pick up",
    termChoice: "Two Payment",
  },
  {
    label: "Due Upon Completion delivered and installed",
    value: "Due Upon Completion delivered and installed",
    termChoice: "Net (No Discount)",
  },
  {
    label: "Net 30 Delivered and Installed",
    value: "Net 30 Delivered and Installed",
    termChoice: "Net (No Discount)",
  },
];

const MARKUPS_OPTIONS = [
  {
    value: "Typical Builder Markups (multi-payment terms)",
    label: "Typical Builder Markups (multi-payment terms)",
  },
  {
    value: "Typical Builder Markups (net)",
    label: "Typical Builder Markups (net)",
  },
  {
    value: "Typical Design Showroom Markups (multi-payment terms)",
    label: "Typical Design Showroom Markups (multi-payment terms)",
  },
  {
    value: "Typical Individual Markups (multi-payment terms)",
    label: "Typical Individual Markups (multi-payment terms)",
  },
];

const JOB_STATUSES = [
  "estimate",
  "proposal",
  "completed",
  "cancelled",
  "production",
];
const JOB_STATUSES_OPTIONS = JOB_STATUSES.map(createOptions);

const ACTIVE_INACTIVE_STATUSES = ["active", "inactive"];
const ACTIVE_INACTIVE_STATUSES_OPTIONS =
  ACTIVE_INACTIVE_STATUSES.map(createOptions);

const SALUTATIONS = ["mr.", "miss", "mrs.", "dr."];
const SALUTATIONS_OPTIONS = SALUTATIONS.map(createOptions);

const CABINET_PARTS = [
  "base",
  "upper",
  "tall",
  "vanity",
  "appliance panel",
  "end panel",
  "wainscot panel",
  "filler",
  "toe board",
  "toe skin",
  "toe platform",
];

const CABINET_TYPES = ["base", "upper", "tall", "vanity"];

const CABINET_PARTS_GROUPED = [
  CABINET_PARTS.slice(0, 4),
  CABINET_PARTS.slice(4, 7),
  CABINET_PARTS.slice(7),
];

const PANEL_TYPES = ["multi-panel", "slab"];

const DRAWER_CATEGORIES = ["door", "drawer front", "drawer box", "tray"];
const DRAWER_CATEGORIES_OPTIONS = DRAWER_CATEGORIES.map(createOptions);
const DOOR_PROFILES = ["panel", "edge", "frame"];
const DOOR_PROFILES_OPTIONS = DOOR_PROFILES.map(createOptions);
const HARDWARE_CATEGORIES = [
  "functional accessories",
  "counter accessories",
  "counter tops",
  "complexity upcharge",
  "surface hardware",
  "functional hardware",
];
const HARDWARE_CATEGORIES_OPTIONS = HARDWARE_CATEGORIES.map(createOptions);
const TRIM_MOLDING_CLASSIFICATIONS = [
  "decorative trim",
  "functional trim",
  "moldings",
];
const TRIM_MOLDING_CLASSIFICATIONS_OPTIONS =
  TRIM_MOLDING_CLASSIFICATIONS.map(createOptions);
const MATERIAL_PURPOSES = [
  "door",
  "drawer box",
  "drawer front",
  "tray",
  "back",
  "interior/exterior",
  "finished end",
  "face frame",
  "edgebanding",
];
const MATERIAL_PURPOSES_OPTIONS = MATERIAL_PURPOSES.map(createOptions);
const MATERIAL_TYPES = [
  "acyclic high gloss",
  "DLV-3/4",
  "DLV-Carrara Match-3/4",
];
const MATERIAL_TYPES_OPTIONS = MATERIAL_TYPES.map(createOptions);
const FINISH_CLASSIFICATIONS = ["stain colors", "glaze colors", "paint colors"];
const FINISH_CLASSIFICATIONS_OPTIONS =
  FINISH_CLASSIFICATIONS.map(createOptions);
const FINISH_CATEGORIES = ["finish process", "color options"];
const FINISH_CATEGORIES_OPTIONS = FINISH_CATEGORIES.map(createOptions);
const LABOR_RATE_CATEGORIES = [
  "delivery",
  "installation",
  "shop labor",
  "drawer box",
];
const LABOR_RATE_CATEGORIES_OPTIONS = LABOR_RATE_CATEGORIES.map(createOptions);
const LABOR_TYPES = [
  "appliance panel",
  "applied end panel",
  "base",
  "box",
  "edgebanding per foot",
  "edgebanding per part",
  "face frame",
  "filler",
  "job",
  "mile",
  "moldings",
  "tall",
  "toe board",
  "toe platform",
  "upper",
  "vanity",
  "wainscot panel",
];
const LABOR_TYPES_OPTIONS = LABOR_TYPES.map(createOptions);
const CABINET_POSITION_METHODS = ["behind nailer", "in front of nailer"];
const CABINET_POSITION_METHODS_OPTIONS =
  CABINET_POSITION_METHODS.map(createOptions);

const TERM_TYPES = ["net", "multi"];
const TERM_TYPES_OPTIONS = TERM_TYPES.map(createOptions);
const IN_OUT_SOURCE = ["in", "out"];
const IN_OUT_SOURCE_OPTIONS = IN_OUT_SOURCE.map(createOptions);

const ENTITIES = keyMirror({
  jobs: null,
  clients: null,
  taxes: null,
});

export type TENTITIES_KEYS = keyof typeof ENTITIES;

const hardwareClassifications = [
  {
    key: "doors_and_drawers",
    value: "Knob,Pull",
  },
  {
    key: "drawer_rollout_guides",
    value: "Drawer Guides,Drawer Accessory",
  },
  {
    key: "hinges",
    value: "Hinge-Plate",
  },
  {
    key: "legs",
    value: "Legs",
  },
  {
    key: "suspension_blocks",
    value: "Suspension Blocks",
  },
  {
    key: "suspension_rails",
    value: "Suspension Rail",
  },
];

const baseStylesMap = {
  standard: "standard",
  adjustableLegs: "adjustable legs",
  separateBasePlatform: "separate base platform",
};

const CABINET_BASE_STYLES = [
  baseStylesMap.standard,
  baseStylesMap.adjustableLegs,
  baseStylesMap.separateBasePlatform,
];

export {
  ENTITIES,
  JOB_STATUSES,
  JOB_STATUSES_OPTIONS,
  TERM_CHOICES,
  TERMS_OPTIONS,
  MARKUPS_OPTIONS,
  ACTIVE_INACTIVE_STATUSES_OPTIONS,
  ACTIVE_INACTIVE_STATUSES,
  SALUTATIONS_OPTIONS,
  CABINET_TYPES,
  CABINET_PARTS,
  CABINET_PARTS_GROUPED,
  PANEL_TYPES,
  DRAWER_CATEGORIES_OPTIONS,
  DRAWER_CATEGORIES,
  MATERIAL_TYPES,
  MATERIAL_TYPES_OPTIONS,
  DOOR_PROFILES,
  DOOR_PROFILES_OPTIONS,
  HARDWARE_CATEGORIES,
  HARDWARE_CATEGORIES_OPTIONS,
  TRIM_MOLDING_CLASSIFICATIONS,
  TRIM_MOLDING_CLASSIFICATIONS_OPTIONS,
  MATERIAL_PURPOSES,
  MATERIAL_PURPOSES_OPTIONS,
  FINISH_CATEGORIES,
  FINISH_CATEGORIES_OPTIONS,
  LABOR_RATE_CATEGORIES,
  LABOR_RATE_CATEGORIES_OPTIONS,
  LABOR_TYPES_OPTIONS,
  CABINET_POSITION_METHODS_OPTIONS,
  TERM_TYPES,
  TERM_TYPES_OPTIONS,
  IN_OUT_SOURCE,
  IN_OUT_SOURCE_OPTIONS,
  hardwareClassifications,
  CABINET_BASE_STYLES,
  baseStylesMap,
  CABINET_STYLES,
  FINISH_CLASSIFICATIONS_OPTIONS,
};

// Avoiding cyclical dependencies
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace utils {
  export const isStandardBaseStyle = (baseStyle: string) =>
    baseStyle === baseStylesMap.standard;

  export const isAdjustableLegBaseStyle = (baseStyle: string) =>
    baseStyle === baseStylesMap.adjustableLegs;

  export const isSeparateLegBaseStyle = (baseStyle: string) =>
    baseStyle === baseStylesMap.separateBasePlatform;
}
