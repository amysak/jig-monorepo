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

export const USER_ROLE = ["company", "sales", "admin"] as const;

export type UserRole = (typeof USER_ROLE)[number];

export const CABINET_OPENING_TYPE = [
  "door",
  "drawer_front",
  "drawer_box",
  "tray",
] as const;

export type CabinetOpeningType = (typeof CABINET_OPENING_TYPE)[number];

export const EQUIPMENT_CATEGORY = [
  "trim",
  "molding",
  "accessory",
  "hardware",
] as const;

export type EquipmentCategory = (typeof EQUIPMENT_CATEGORY)[number];

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

export const CABINET_CORNER_TYPE = ["blind", "90deg", "diagonal"] as const;

export type CabinetCornerType = (typeof CABINET_CORNER_TYPE)[number];

export const MATERIAL_PURPOSE = [
  "back",
  "box",
  "door",
  "frame",
  "interior",
  "edgebanding",
] as const;

export type MaterialPurpose = (typeof MATERIAL_PURPOSE)[number];

export const PANEL_TYPE = ["appliance", "wainscot"] as const;

export type PanelType = (typeof PANEL_TYPE)[number];

export const PROFILE_TYPE = ["edge", "frame", "panel"] as const;

export type ProfileType = (typeof PROFILE_TYPE)[number];

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

export const PAINT_TYPE = ["glaze", "paint"] as const;

export type PaintType = (typeof PAINT_TYPE)[number];

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

export type MeasuredCabinetExterior = "drawer" | "baseDoor" | "upperDoor";
