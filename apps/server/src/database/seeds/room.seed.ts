import { randBaseballTeam } from "@ngneat/falso";

import { Job, Room } from "database/entities";

type RoomSeedsOptions = {
  count: number;
  job?: Job;
};

export function generateRoomSeeds({ count, job }: RoomSeedsOptions): Room[] {
  const seeds: Room[] = [];

  for (let i = 0; i < count; i++) {
    const room = new Room();

    room.name = randBaseballTeam();
    if (job) room.job = job;

    seeds.push(room);
  }

  return seeds;
}
