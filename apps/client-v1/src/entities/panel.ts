import { IPanelCategory, IPanelType } from ".";
import { Account } from "./account";
import { Job } from "./job";
import { Room } from "./room";

export interface Panel {
  id: string;
  category: IPanelCategory;
  type: IPanelType;
  image_url: string;
  number_of_panels: number;
  floor_to_top_of_panels: number;
  height_to_bottom_of_panel: number;
  end_panel_height: number;
  end_panel_square_ft: number;
  wainscot_height: number;
  appliance_panel_height: number;
  number_of_finished_sides: number;
  room: Room;
  job: Job;
  account: Account;
}
