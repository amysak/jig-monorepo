import type { ObjectValues } from "./util";

export const RECORD_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export type RecordStatus = ObjectValues<typeof RECORD_STATUS>;

export const getActiveStatus = (isActive: boolean) =>
  isActive ? RECORD_STATUS.ACTIVE : RECORD_STATUS.INACTIVE;

export const COMPLETION_STATUS = {
  ESTIMATE: "estimate",
  PROPOSAL: "proposal",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  PRODUCTION: "production",
} as const;

export type CompletionStatus = ObjectValues<typeof COMPLETION_STATUS>;

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

export const CABINET_OPENING_TYPE = {
  DOOR: "door",
  DRAWER_FRONT: "drawer_front",
  DRAWER_BOX: "drawer_box",
  TRAY: "tray",
} as const;

export type CabinetOpeningType = ObjectValues<typeof CABINET_OPENING_TYPE>;

export const CABINET_TYPE = {
  BASE: "base",
  UPPER: "upper",
  TALL: "tall",
  VANITY: "vanity",
} as const;

export type CabinetType = ObjectValues<typeof CABINET_TYPE>;

export const CABINET_BASE_TYPE = {
  STANDARD: "standard",
  ADJUSTABLE: "adjustable",
  SEPARATE: "separate",
} as const;

export type CabinetBaseType = ObjectValues<typeof CABINET_BASE_TYPE>;

export const CABINET_CORNER_PLACEMENT = {
  BLIND: "blind",
  DEGREE_90: "90deg",
  DIAGONAL: "diagonal",
} as const;

export type CabinetCornerPlacement = ObjectValues<
  typeof CABINET_CORNER_PLACEMENT
>;

export const MATERIAL_PURPOSE = {
  EDGEBANDING: "edgebanding",
  BACK: "back",
  DOOR: "door",
  FACE_FRAME: "face_frame",
  INTERIOR: "interior",
  DRAWER_BOX: "drawer_box",
} as const;

export type MaterialPurpose = ObjectValues<typeof MATERIAL_PURPOSE>;

export const PANEL_TYPE = {
  END: "end",
  APPLIANCE: "appliance",
  WAINSCOT: "wainscot",
} as const;

export type PanelType = ObjectValues<typeof PANEL_TYPE>;

export const PROFILE_TYPE = {
  EDGE: "edge",
  FRAME: "frame",
  PANEL: "panel",
} as const;

export type ProfileType = ObjectValues<typeof PROFILE_TYPE>;

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
