import {
  Account as AccountEntity,
  AccountPreferences,
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

export type Job = JobEntity;

export type Room = RoomEntity;
