import { randEmail, randFullName } from "@ngneat/falso";

import { Account, Client } from "database/entities";

type ClientSeedsOptions = {
  count: number;
  account: Account;
};

export function generateClientSeeds({
  count,
  account,
}: ClientSeedsOptions): Client[] {
  const seeds: Client[] = [];

  for (let i = 0; i < count; i++) {
    const client = new Client();

    client.name = randFullName();
    client.email = randEmail();
    client.account = account;

    seeds.push(client);
  }

  return seeds;
}
