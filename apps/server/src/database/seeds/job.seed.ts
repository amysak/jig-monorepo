import {
  randCounty,
  randFutureDate,
  randIceHockeyTeam,
  randNumber,
} from "@ngneat/falso";

import { Client, Job } from "database/entities";

type JobSeedsOptions = {
  count: number;
  client?: Client;
};

export function generateJobSeeds({ count, client }: JobSeedsOptions): Job[] {
  const seeds: Job[] = [];

  for (let i = 0; i < count; i++) {
    const job = new Job();

    job.name = randIceHockeyTeam();
    job.estimateDate = randFutureDate();
    job.proposalDate = randFutureDate();
    job.lotNumber = randNumber({ min: 50, max: 1000 });
    job.subdivision = randCounty();
    if (client) job.client = client;
    job.delivery = {
      text: "This is a sample delivery text for your job.",
      tripQuantity: randNumber({ min: 1, max: 5 }),
      miles: randNumber({ min: 4, max: 100 }),
    };

    seeds.push(job);
  }

  return seeds;
}
