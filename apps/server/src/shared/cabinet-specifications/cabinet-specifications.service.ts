import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";

import { CabinetSpecifications } from "database/entities";

@Injectable()
export class CabinetSpecificationsService {
  constructor(
    @InjectRepository(CabinetSpecifications)
    private specificationsRepository: Repository<CabinetSpecifications>
  ) {}
}
