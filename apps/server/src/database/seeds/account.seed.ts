import { randCompanyName, randEmail, randFullName } from "@ngneat/falso";
import bcrypt from "bcrypt";

import { Account, AccountPreferences } from "database/entities";

export function generateSuperAccountSeed(): Account {
  const superAccount = new Account();

  superAccount.name = "David Crapo";
  superAccount.email = process.env.SUPER_ACC_EMAIL;
  superAccount.salt = bcrypt.genSaltSync(2);
  superAccount.password = bcrypt.hashSync(
    process.env.SUPER_ACC_PW,
    superAccount.salt
  );
  superAccount.role = "admin";
  superAccount.company = { name: "Jigbid" };

  return superAccount;
}

export function generateAccountSeeds(count: number) {
  const seeds: Account[] = [];

  for (let i = 0; i < count; i++) {
    const account = new Account();

    account.name = randFullName();
    account.email = randEmail();
    account.role = "sales";

    account.company = { name: randCompanyName() };

    seeds.push(account);
  }

  return seeds;
}

export function generateAccountPreferences(account: Account) {
  const accountPreferences = new AccountPreferences();

  accountPreferences.account = account;

  return accountPreferences;
}
