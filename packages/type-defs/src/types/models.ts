import {
  Account as AccountEntity,
  AccountPreferences,
  Address as AddressEntity,
  Cabinet as CabinetEntity,
  CabinetSpecifications as CabinetSpecificationsEntity,
  Client as ClientEntity,
  ClientPreferences,
  Job as JobEntity,
  JobPreferences,
  MultiPaymentTerms,
  NetTerms,
  Room as RoomEntity,
} from "../entities";

export type Terms = MultiPaymentTerms | NetTerms;

export type Preferences =
  | JobPreferences
  | AccountPreferences
  | ClientPreferences;

export type Account = AccountEntity;

export type Client = ClientEntity;

export type Cabinet = CabinetEntity;

export type CabinetSpecifications = CabinetSpecificationsEntity;

export type Job = JobEntity;

export type Room = RoomEntity;

export type Address = AddressEntity;
