import { randEmail, randFullName } from "@ngneat/falso";
import bcrypt from "bcrypt";

import { User } from "database/entities";

export function generateSuperUserSeed(): User {
  const superUser = new User();

  superUser.name = "David Crapo";
  superUser.email = process.env.SUPER_ACC_EMAIL;
  superUser.salt = bcrypt.genSaltSync(2);
  superUser.password = bcrypt.hashSync(
    process.env.SUPER_ACC_PW,
    superUser.salt
  );
  superUser.role = "admin";

  return superUser;
}

export function generateUserSeeds(count: number) {
  const seeds: User[] = [];

  for (let i = 0; i < count; i++) {
    const user = new User();

    user.name = randFullName();
    user.email = randEmail();
    user.role = "sales";

    seeds.push(user);
  }

  return seeds;
}
