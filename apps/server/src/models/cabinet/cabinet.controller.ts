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
import { Payload } from "type-defs";

import { CabinetService } from "./cabinet.service";
import { CreateCabinetDto, GetCabinetsDto } from "./dto";

@UseGuards(JwtAuthGuard)
@Controller("cabinets")
export class CabinetController {
  constructor(private readonly cabinetService: CabinetService) {}

  @Post()
  create(@Body() data: CreateCabinetDto) {
    return this.cabinetService.create(data);
  }

  @Get()
  getAccountCabinets(@ReqUser() user: Payload, @Query() query: GetCabinetsDto) {
    return this.cabinetService.findByAccountId(user.accountId, query);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.cabinetService.findOne(id);
  }

  // TODO: DTO
  @Patch(":id")
  update(@Param("id") id: number, @Body() data: any) {
    return this.cabinetService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.cabinetService.remove(id);
  }
}
