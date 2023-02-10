import {
  JobPreferences,
  AccountPreferences,
  ClientPreferences,
} from "../entities";

export {
  Account,
  Address,
  Cabinet,
  CabinetEquipment,
  CabinetOpening,
  CabinetSpecifications,
  Client,
  Filler,
  Finish,
  HardwareSet,
  Job,
  Markup,
  Material,
  MaterialSet,
  Panel,
  Profile,
  Room,
  Terms,
  ToePlatform,
  Upcharge,
  Vendor,
  AppliedPart,
} from "../entities";

export type Preferences =
  | JobPreferences
  | AccountPreferences
  | ClientPreferences;

// export type Account = AccountEntity;
