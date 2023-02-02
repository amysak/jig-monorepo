import {
  Account as AccountEntity,
  AccountPreferences,
  Address as AddressEntity,
  Cabinet as CabinetEntity,
  CabinetOpening as CabinetOpeningEntity,
  CabinetSpecifications as CabinetSpecificationsEntity,
  Client as ClientEntity,
  ClientPreferences,
  Job as JobEntity,
  JobPreferences,
  MultiPaymentTerms,
  NetTerms,
  Profile as ProfileEntity,
  Room as RoomEntity,
  Vendor as VendorEntity,
} from "../entities";

export type Terms = MultiPaymentTerms | NetTerms;

export type Preferences =
  | JobPreferences
  | AccountPreferences
  | ClientPreferences;

export type Account = AccountEntity;

export type Client = ClientEntity;

export type Cabinet = CabinetEntity;

export type CabinetOpening = CabinetOpeningEntity;

export type CabinetSpecifications = CabinetSpecificationsEntity;

export type Job = JobEntity;

export type Profile = ProfileEntity;

export type Room = RoomEntity;

export type Address = AddressEntity;

export type Vendor = VendorEntity;
