import { randEmail, randFullName } from "@ngneat/falso";

import { User, Client } from "database/entities";

type ClientSeedsOptions = {
  count: number;
  user: User;
};

export function generateClientSeeds({
  count,
  user,
}: ClientSeedsOptions): Client[] {
  const seeds: Client[] = [];

  for (let i = 0; i < count; i++) {
    const client = new Client();

    client.name = randFullName();
    client.email = randEmail();
    client.user = user;

    seeds.push(client);
  }

  return seeds;
}
