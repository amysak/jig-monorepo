import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "auth/guards";
import { ReqUser } from "common/decorators";
import { CabinetEquipment } from "database/entities";
import { Payload } from "type-defs";

import { CabinetEquipmentService } from "./cabinet-equipment.service";
import { GetEquipmentDto } from "./dto";

@UseGuards(JwtAuthGuard)
@Controller("equipment")
export class CabinetEquipmentController {
  constructor(
    private readonly cabinetEquipmentService: CabinetEquipmentService
  ) {}

  @Post()
  create(@Body() data: CabinetEquipment) {
    return this.cabinetEquipmentService.create(data);
  }

  @Get()
  getAccountOpenings(
    @ReqUser() user: Payload,
    @Query() query: GetEquipmentDto
  ) {
    return this.cabinetEquipmentService.findByAccountId(user.accountId, query);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.cabinetEquipmentService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() data: any) {
    return this.cabinetEquipmentService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.cabinetEquipmentService.remove(+id);
  }
}
