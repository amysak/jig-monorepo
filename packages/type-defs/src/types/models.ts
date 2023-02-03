import {
  Account as AccountEntity,
  AccountPreferences,
  Address as AddressEntity,
  Cabinet as CabinetEntity,
  CabinetEquipment as CabinetEquipmentEntity,
  CabinetOpening as CabinetOpeningEntity,
  CabinetSpecifications as CabinetSpecificationsEntity,
  Client as ClientEntity,
  ClientPreferences,
  Filler as FillerEntity,
  Finish as FinishEntity,
  HardwareSet as HardwareSetEntity,
  Job as JobEntity,
  JobPreferences,
  Markup as MarkupEntity,
  Material as MaterialEntity,
  MaterialSet as MaterialSetEntity,
  Panel as PanelEntity,
  Profile as ProfileEntity,
  Room as RoomEntity,
  Terms as TermsEntity,
  ToePlatform as ToePlatformEntity,
  Upcharge as UpchargeEntity,
  Vendor as VendorEntity,
} from "../entities";

export type Terms = TermsEntity;

export type Markup = MarkupEntity;

export type Upcharge = UpchargeEntity;

export type Preferences =
  | JobPreferences
  | AccountPreferences
  | ClientPreferences;

export type Account = AccountEntity;

export type Client = ClientEntity;

export type Cabinet = CabinetEntity;

export type CabinetEquipment = CabinetEquipmentEntity;

export type CabinetOpening = CabinetOpeningEntity;

export type Panel = PanelEntity;

export type ToePlatform = ToePlatformEntity;

export type Filler = FillerEntity;

export type CabinetSpecifications = CabinetSpecificationsEntity;

export type Job = JobEntity;

export type Profile = ProfileEntity;

export type Room = RoomEntity;

export type Address = AddressEntity;

export type Vendor = VendorEntity;

export type Material = MaterialEntity;

export type Finish = FinishEntity;

export type MaterialSet = MaterialSetEntity;

export type HardwareSet = HardwareSetEntity;
