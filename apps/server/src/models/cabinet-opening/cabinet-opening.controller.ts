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

import { CabinetOpeningService } from "./cabinet-opening.service";
import { GetOpeningsDto } from "./dto";
import type { CreateCabinetOpeningDto } from "./dto/create-cabinet-opening.dto";
import type { UpdateCabinetOpeningDto } from "./dto/update-cabinet-opening.dto";

@UseGuards(JwtAuthGuard)
@Controller("openings")
export class CabinetOpeningController {
  constructor(private readonly cabinetOpeningService: CabinetOpeningService) {}

  @Post()
  create(@Body() data: CreateCabinetOpeningDto) {
    return this.cabinetOpeningService.create(data);
  }

  @Get()
  getAccountOpenings(@ReqUser() user: Payload, @Query() query: GetOpeningsDto) {
    return this.cabinetOpeningService.findByAccountId(user.accountId, query);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.cabinetOpeningService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() data: UpdateCabinetOpeningDto) {
    return this.cabinetOpeningService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.cabinetOpeningService.remove(+id);
  }
}
