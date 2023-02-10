import { Injectable, Logger } from "@nestjs/common";
import uniqBy from "lodash.uniqby";
import { BaseEntity, DataSource, EntityManager } from "typeorm";

import { Account, HardwareSet, MaterialSet } from "database/entities";
import {
  generateAccountPreferences,
  generateClientSeeds,
  generateJobPreferences,
  generateJobSeeds,
  generateRoomSeeds,
  generateSuperAccountSeed,
  getDefaults,
  getRoomDefaults,
} from "database/seeds";

@Injectable()
export class SeedingService {
  private readonly logger = new Logger(SeedingService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly entityManager: EntityManager
  ) {}

  async isSeedingRequired(): Promise<boolean> {
    if (process.env.NODE_ENV === "development") {
      return true;
    }

    // TODO: find a better way
    const accounts = await this.entityManager.find(Account);
    return accounts.length === 0;
  }

  async purge(): Promise<void> {
    await this.entityManager.query("DELETE FROM account");
    const entities = uniqBy(this.dataSource.entityMetadatas, "tableName");

    for (const entity of entities) {
      await this.entityManager.query(`DELETE FROM ${entity.tableName};`);
    }
  }

  async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async resetSequences(): Promise<void> {
    const result = await this.entityManager.query(`
      SELECT *
      FROM information_schema.sequences
    `);

    const sequences = result.map(
      (row: { sequence_name?: string }) => row["sequence_name"]
    );

    for (const sequence of sequences) {
      try {
        await this.entityManager.query(
          `ALTER SEQUENCE ${sequence} RESTART WITH 1`
        );
      } catch (error) {
        console.log("Error while resetting sequences:");
        console.dir(error, { depth: null });
      }
    }
  }

  async seed(): Promise<void> {
    await this.resetSequences();

    await this.purge();

    const superAccount = await generateSuperAccountSeed().save();

    const { markups, letters, terms } = getDefaults({
      account: superAccount,
    });

    // https://github.com/typeorm/typeorm/issues/9033
    // https://stackoverflow.com/questions/74138654/how-to-specify-discriminator-value-for-the-parent-table-using-single-table-inher
    await this.entityManager.save(terms);
    await this.entityManager.save(markups);
    await this.entityManager.save(letters);

    const {
      cabinetsAndSpecs,
      vendors,
      openings,
      profiles,
      equipment,
      finishes,
      materials,
      panels,
      toes,
      fillers,
    } = getRoomDefaults({
      account: superAccount,
    });

    await this.entityManager.save(vendors);

    openings.forEach((opening) => {
      opening.vendor = vendors[Math.floor(Math.random() * vendors.length)];
    });
    await this.entityManager.save(openings);

    profiles.forEach((profile) => {
      profile.vendor = vendors[Math.floor(Math.random() * vendors.length)];
    });
    await this.entityManager.save(profiles);

    await this.entityManager.save(equipment);

    await Promise.all(
      cabinetsAndSpecs.map(async ({ cabinet, cabinetSpecifications }) => {
        await cabinetSpecifications.save();

        cabinet.specifications = cabinetSpecifications;
        await cabinet.save();
      })
    );

    await this.entityManager.save(finishes);
    await this.entityManager.save(materials);
    await this.entityManager.save(panels);
    await this.entityManager.save(toes);
    await this.entityManager.save(fillers);

    const accountPreferences = generateAccountPreferences(superAccount);
    accountPreferences.terms = terms[Math.floor(Math.random() * terms.length)];
    accountPreferences.markup =
      markups[Math.floor(Math.random() * markups.length)];
    await accountPreferences.save();

    const clients = generateClientSeeds({ count: 3, account: superAccount });
    await this.entityManager.save(clients);

    const jobs = generateJobSeeds({
      count: Math.floor(Math.random() * 10) + 5,
      client: clients[Math.floor(Math.random() * clients.length)],
    });
    await this.entityManager.save(jobs);

    await Promise.all(
      jobs.map(async (job) => {
        const savedJob = await job.save();
        const preferences = generateJobPreferences(savedJob);

        preferences.terms = terms[Math.floor(Math.random() * terms.length)];
        preferences.markup =
          markups[Math.floor(Math.random() * markups.length)];

        await preferences.save();

        return job;
      })
    );

    const rooms = await Promise.all(
      generateRoomSeeds({
        count: Math.floor(Math.random() * 25),
      }).map(async (room) => {
        room.job = jobs[Math.floor(Math.random() * jobs.length)];
        room.account = superAccount;
        room.materialSet = await this.entityManager.save(MaterialSet, {
          name: `${room.name} Material Set`,
          account: superAccount,
        });
        room.hardwareSet = await this.entityManager.save(HardwareSet, {
          name: `${room.name} Hardware Set`,
          account: superAccount,
        });

        return room;
      })
    );
    await this.entityManager.save(rooms);

    this.logger.log("Seeding completed");
  }

  static convertDumpToEntities<T extends BaseEntity>(
    EntityClass: new () => T,
    dump: Array<Record<string, unknown>>
  ): T[] {
    return dump.map((data) => {
      const entity = new EntityClass();

      Object.assign(entity, data);

      return entity;
    });
  }

  static bindEntityToAccount<T extends BaseEntity & { account?: Account }>(
    entity: T,
    account: Account
  ): T {
    entity.account = account;

    return entity;
  }
}
