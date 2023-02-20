import { Injectable, Logger } from "@nestjs/common";
import uniqBy from "lodash.uniqby";
import { BaseEntity, DataSource, EntityManager } from "typeorm";

import {
  User,
  HardwareSet,
  MaterialSet,
  Cabinet,
  Upcharge,
  Panel,
} from "database/entities";
import {
  generateClientSeeds,
  generateJobSeeds,
  generateRoomSeeds,
  generateSuperUserSeed,
  getDefaults,
  getRoomDefaults,
} from "database/seeds";
import { rand, randNumber } from "@ngneat/falso";

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
    const users = await this.entityManager.find(User);
    return users.length === 0;
  }

  async purge(): Promise<void> {
    await this.entityManager.query("DELETE FROM users");
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

    const superUser = await generateSuperUserSeed().save();

    const { markups, terms } = getDefaults({
      user: superUser,
    });

    // https://github.com/typeorm/typeorm/issues/9033
    // https://stackoverflow.com/questions/74138654/how-to-specify-discriminator-value-for-the-parent-table-using-single-table-inher
    await this.entityManager.save(terms);
    await this.entityManager.save(markups);

    superUser.preferences.terms =
      terms[Math.floor(Math.random() * terms.length)];
    superUser.preferences.markup =
      markups[Math.floor(Math.random() * markups.length)];
    await superUser.save();

    const {
      cabinets,
      vendors,
      profiles,
      equipment,
      finishes,
      materials,
      models,
    } = getRoomDefaults({
      user: superUser,
    });

    // Order is important
    await this.entityManager.save(vendors);
    await this.entityManager.save(finishes);
    await this.entityManager.save(materials);
    await this.entityManager.save(profiles);
    await this.entityManager.save(models);
    await this.entityManager.save(equipment);
    await this.entityManager.save(cabinets);

    const clients = generateClientSeeds({ count: 3, user: superUser });
    await this.entityManager.save(clients);

    const jobs = generateJobSeeds({
      count: Math.floor(Math.random() * 10) + 5,
      client: clients[Math.floor(Math.random() * clients.length)],
    }).map((job) => {
      // TODO: This is very trivial for our app, need to make a utility for this
      const jobTerms = terms[Math.floor(Math.random() * terms.length)];
      const jobMarkup = markups[Math.floor(Math.random() * markups.length)];
      jobTerms.id = null;
      jobMarkup.id = null;

      job.terms = jobTerms;
      job.markup = jobMarkup;
      job.user = superUser;
      return job;
    });
    // Done for each job to create own markup & terms with new ids on the fly
    await this.entityManager.save(jobs, { chunk: 1 });

    const rooms = await Promise.all(
      generateRoomSeeds({
        count: randNumber({ min: 5, max: 10 }),
      }).map(async (room) => {
        room.job = jobs[Math.floor(Math.random() * jobs.length)];
        room.user = superUser;
        room.materialSet = {
          name: `${room.name} Material Set`,
          user: superUser,
        } as MaterialSet;
        room.hardwareSet = {
          name: `${room.name} Hardware Set`,
          user: superUser,
        } as HardwareSet;

        const layoutOptions: Cabinet["exterior"]["equipmentRows"][] = [
          [
            { items: ["drawer"], height: randNumber({ min: 7, max: 10 }) },
            { items: ["baseDoor", "baseDoor"], height: 0 },
          ],
          [
            {
              items: ["drawer", "drawer"],
              height: randNumber({ min: 7, max: 10 }),
            },
            { items: ["baseDoor"], height: 0 },
          ],
          [
            { items: ["drawer"], height: randNumber({ min: 7, max: 10 }) },
            { items: ["drawer"], height: randNumber({ min: 7, max: 10 }) },
            { items: [], height: 0 },
          ],
        ];

        const roomCabinets = rand(cabinets, {
          length: randNumber({ min: 2, max: 5 }),
        }).map((cabinet) => {
          cabinet.id = null;
          cabinet.exterior.equipmentRows = rand(layoutOptions);
          cabinet.upcharges = [
            {
              amount: 3,
              name: "Random upcharge for god knows what",
              user: superUser,
            },
          ] as Upcharge[];
          cabinet.exterior.appliedEnds =
            Math.random() > 0.5
              ? [
                  {
                    width: cabinet.dimensions.depth,
                    length: cabinet.dimensions.floorToTop,
                    finishedSidesCount: 1,
                  },
                ]
              : [];

          // TODO: Don't know why cascade isn't working here
          const cabinetEquipment = rand(equipment, {
            length: randNumber({ min: 1, max: 3 }),
          }).map((item) => {
            item.id = null;
            return item;
          });
          this.entityManager.save(cabinetEquipment);
          cabinet.equipment = cabinetEquipment;

          cabinet.exterior.fillers = [
            {
              width: 3,
              length: cabinet.dimensions.floorToTop,
              finishedSidesCount: 2,
            },
          ];
          return cabinet;
        });

        // TODO: Don't know why cascade isn't working here
        await this.entityManager.save(roomCabinets);
        room.cabinets = roomCabinets;
        room.panels = [
          {
            name: "Panel 1",
            type: "appliance",
            width: randNumber({ min: 18, max: 70 }),
            height: randNumber({ min: 18, max: 70 }),
            user: superUser,
          },
          {
            name: "Panel 2",
            type: "wainscot",
            singlePanelWidth: 40,
            width: 200,
            height: randNumber({ min: 18, max: 70 }),
            user: superUser,
          },
        ] as Panel[];
        room.equipment = rand(equipment, {
          length: randNumber({ min: 2, max: 5 }),
        });
        room.upcharges = [
          { amount: 5, name: "Random room upcharge" },
        ] as Upcharge[];

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

  static bindEntityToUser<T extends BaseEntity & { user?: User }>(
    entity: T,
    user: User
  ): T {
    entity.user = user;

    return entity;
  }
}
