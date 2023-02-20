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
import { Equipment } from "database/entities";
import { Payload } from "type-defs";
import { GetEquipmentDto } from "./dto";
import { EquipmentService } from "./equipment.service";

@UseGuards(JwtAuthGuard)
@Controller("equipment")
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Post()
  create(@Body() data: Equipment) {
    return this.equipmentService.create(data);
  }

  @Get()
  getUserOpenings(@ReqUser() user: Payload, @Query() query: GetEquipmentDto) {
    return this.equipmentService.findByUserId(user.userId, query);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.equipmentService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() data: any) {
    return this.equipmentService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.equipmentService.remove(+id);
  }
}
