import { Injectable, Logger } from "@nestjs/common";
import { EntityManager } from "typeorm";

import type { AppBaseEntity } from "database/entities";

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(private readonly entityManager: EntityManager) {}

  async save(_entity: AppBaseEntity) {
    this.logger.log("inside save");

    // if
    // this.entityManager.save(entity)
  }
}
