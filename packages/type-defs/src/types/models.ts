import {
  type JobPreferences,
  type AccountPreferences,
  type ClientPreferences,
} from "../entities";

export {
  type Account,
  type Address,
  type Cabinet,
  type CabinetEquipment,
  type CabinetOpening,
  type CabinetSpecifications,
  type Client,
  type Filler,
  type Finish,
  type HardwareSet,
  type Job,
  type Markup,
  type Material,
  type MaterialSet,
  type Panel,
  type Profile,
  type Room,
  type Terms,
  type ToePlatform,
  type Upcharge,
  type Vendor,
  type AppliedPart,
} from "../entities";

export type Preferences =
  | JobPreferences
  | AccountPreferences
  | ClientPreferences;

// export type Account = AccountEntity;
