import { AccessorySetup, Account, IActiveInActiveStatuses, Room } from ".";

export interface Accessory {
  account: Account;
  base_style: string;
  created_at: Date;
  description: string;
  doors: AccessorySetup[];
  drawer_guides: AccessorySetup;
  drawers: AccessorySetup;
  functional_quantity_per_box: number;
  hardware_name: HardwareName;
  hinge: AccessorySetup;
  id: string;
  is_default: boolean;
  leg_levers: AccessorySetup;
  rollout_guides: AccessorySetup;
  room: Room;
  status: IActiveInActiveStatuses;
  suspension_block: AccessorySetup;
  suspension_quantity_per_box_finished: number;
  suspension_quantity_per_box_unfinished: number;
  suspension_rail: AccessorySetup;
  updated_at: Date;
}

export interface HardwareName {
  account: Account;
  id: string;
  name: string;
}
