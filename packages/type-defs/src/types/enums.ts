import type { ObjectValues } from "./util";

export const RECORD_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export type RecordStatus = ObjectValues<typeof RECORD_STATUS>;

export const getActiveStatus = (isActive: boolean) =>
  isActive ? RECORD_STATUS.ACTIVE : RECORD_STATUS.INACTIVE;

export const COMPLETION_STATUS = [
  "estimate",
  "proposal",
  "completed",
  "cancelled",
  "production",
] as const;

export type CompletionStatus = (typeof COMPLETION_STATUS)[number];

export const ACCOUNT_ROLE = {
  ADMIN: "admin",
  SALES: "sales",
} as const;

export type AccountRole = ObjectValues<typeof ACCOUNT_ROLE>;

export const ADDRESS_TYPE = {
  PHYSICAL: "physical",
  MAILING: "mailing",
  BUSINESS: "business",
} as const;

export type AddressType = ObjectValues<typeof ACCOUNT_ROLE>;

export const CABINET_OPENING_TYPE = [
  "door",
  "drawer_front",
  "drawer_box",
  "tray",
] as const;

export type CabinetOpeningType = (typeof CABINET_OPENING_TYPE)[number];

export const CABINET_EQUIPMENT_CATEGORY = {
  TRIM: "trim",
  MOLDING: "molding",
  ACCESSORY: "accessory",
  HARDWARE: "hardware",
} as const;

export type CabinetEquipmentCategory = ObjectValues<
  typeof CABINET_EQUIPMENT_CATEGORY
>;

export const CABINET_EXTENSION_CATEGORY = [
  "panels",
  "fillers",
  "toes",
] as const;

export type CabinetExtensionCategory =
  (typeof CABINET_EXTENSION_CATEGORY)[number];

export const CABINET_TYPES = ["base", "upper", "tall", "vanity"] as const;

export type CabinetType = (typeof CABINET_TYPES)[number];

export const CABINET_BASE_TYPES = [
  "standard",
  "adjustable",
  "separate",
] as const;

export type CabinetBaseType = (typeof CABINET_BASE_TYPES)[number];

export const CABINET_CORNER_PLACEMENT = {
  BLIND: "blind",
  DEGREE_90: "90deg",
  DIAGONAL: "diagonal",
} as const;

export type CabinetCornerPlacement = ObjectValues<
  typeof CABINET_CORNER_PLACEMENT
>;

export const MATERIAL_PURPOSE = [
  "back",
  "box",
  "door",
  "frame",
  "interior",
  "edgebanding",
] as const;

export type MaterialPurpose = (typeof MATERIAL_PURPOSE)[number];

export const PANEL_TYPE = {
  END: "end",
  APPLIANCE: "appliance",
  WAINSCOT: "wainscot",
} as const;

export type PanelType = ObjectValues<typeof PANEL_TYPE>;

export const PROFILE_TYPES = ["edge", "frame", "panel"] as const;

export type ProfileType = (typeof PROFILE_TYPES)[number];

export const ROOM_ELEVATION = {
  NORTH: "north",
  SOUTH: "south",
  EAST: "east",
  WEST: "west",
  ISLAND: "island",
} as const;

export type RoomElevation = ObjectValues<typeof ROOM_ELEVATION>;

export const TERMS_TYPE = {
  NET: "net",
  MULTI_PAYMENT: "multi",
} as const;

export type TermsType = ObjectValues<typeof TERMS_TYPE>;

export const TOE_TYPE = {
  BOARD: "board",
  SKIN: "skin",
  PLATFORM: "platform",
} as const;

export type ToeType = ObjectValues<typeof TOE_TYPE>;

export const FINISH_TYPE = {
  PROCESS: "process",
  GLAZE: "glaze",
  PAINT: "paint",
} as const;

export type FinishType = ObjectValues<typeof FINISH_TYPE>;

export const STATS_OPTION = {
  CLIENTS: "clients",
  JOBS: "jobs",
  REVENUE: "revenue",
} as const;

export type StatsOption = ObjectValues<typeof STATS_OPTION>;

export const SALUTATION = {
  MR: "Mr.",
  MRS: "Mrs.",
  MISS: "Miss",
  DR: "Dr.",
} as const;

export type Salutation = ObjectValues<typeof SALUTATION>;

export const RANGE = {
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
} as const;

export type Range = ObjectValues<typeof RANGE>;

export const FINISH_COMPLEXITY = {
  COMPLEX: "complex",
  SIMPLE: "simple",
  NONE: "none",
} as const;

export type FinishComplexity = ObjectValues<typeof FINISH_COMPLEXITY>;
