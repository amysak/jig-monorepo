export interface IClientAddress {
  street: string;
  city: string;
  state: string;
  zip_code: string | number;
  main_phone: string;
  home_phone: string;
  office_phone: string;
  cell_phone: string;
  email: string;
}

export enum ICabinetInterior {
  F = "finished",
  U = "unfinished",
}

export type IClientPhyscalAddress = IClientAddress;

export type IClientPhysicalAddress = IClientAddress;

export enum IJobStatuses {
  "ESTIMATE" = "estimate",
  PROPOSAL = "proposal",
}

export enum IActiveInActiveStatuses {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum IHardwareCategories {
  FUNCTIONAL_ACCESSORIES = "functional accesories",
  COUNTER_ACCESSORIES = "counter accesories",
  COUNTER_TOPS = "counter tops",
  COMPLEXITY_UPCHARGE = "complexity upcharge",
  SURFACE_HARDWARE = "surface hardware",
  FUNCTIONAL_HARDWARE = "functional hardware",
}

export enum IAddSubtract {
  ADD = "add",
  SUBTRACT = "subtract",
}

export enum ITaxType {
  NO = "no",
  YES = "yes",
  YES_WITH_MARKUPS = "yes with markups",
}

export enum ITermTypes {
  NET_NO_DISCOUNT = "Net (No Discount)",
  NET_WITH_DISCOUNT = "Net (With Discount)",
  THREE_PAYMENT = "Three Payment",
  TWO_PAYMENT = "Two Payment",
}

export type IClientMailingAddress = IClientAddress;

export interface IClientContact {
  salutation: string;
  first_name: string;
  last_name: string;
  title: string;
}

export enum IPreferredContact {
  FIRST_CONTACT = "first_contact",
  SECOND_CONTACT = "second_contact",
}

export enum IPanelCategory {
  APPLIANCE_PANEL = "appliance panel",
  END_PANEL = "end panel",
  WAINSCOT_PANEL = "wainscot panel",
}

export enum IPanelType {
  BASE = "Base",
  UPPER = "Upper",
  TALL = "Tall",
  VANITY = "Vanity",
}

interface IAccountAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface IAccountMailingAddress extends IAccountAddress {
  office: string;
  cell: string;
  home: string;
  fax: string;
  state_name: string;
}

export interface IAccountBillingAddress extends IAccountAddress {
  email: string;
  website: string;
  license_no: number;
}
