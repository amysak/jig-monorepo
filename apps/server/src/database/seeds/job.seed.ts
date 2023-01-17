import {
  randCounty,
  randFutureDate,
  randIceHockeyTeam,
  randNumber,
} from "@ngneat/falso";

import { Client, Job, JobPreferences } from "database/entities";

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

    seeds.push(job);
  }

  return seeds;
}

export function generateJobPreferences(job: Job) {
  const jobPreferences = new JobPreferences();

  jobPreferences.job = job;
  jobPreferences.delivery = {
    text: "This is a sample delivery text for your job.",
    tripQuantity: randNumber({ min: 1, max: 5 }),
    milesToJobSite: randNumber({ min: 4, max: 100 }),
    perTrip: randNumber({ min: 50, max: 100, fraction: 2 }),
    perMile: randNumber({ min: 50, max: 100, fraction: 2 }),
    perBox: randNumber({ max: 3, fraction: 2 }),
  };
  jobPreferences.reportText = "This is a sample report text for your job.";

  return jobPreferences;
}
