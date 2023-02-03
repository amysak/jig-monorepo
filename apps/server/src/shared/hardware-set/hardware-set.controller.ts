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

import { GetFinishesDto } from "./dto";
import { HardwareSetService } from "./hardware-set.service";

// TODO: DTO
@UseGuards(JwtAuthGuard)
@Controller("hardware-sets")
export class HardwareSetController {
  constructor(private readonly hardwareSetService: HardwareSetService) {}

  @Post()
  create(@Body() data: any) {
    return this.hardwareSetService.create(data);
  }

  @Get()
  getAccountOpenings(@ReqUser() user: Payload, @Query() query: GetFinishesDto) {
    return this.hardwareSetService.findByAccountId(user.accountId, query);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.hardwareSetService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() data: any) {
    return this.hardwareSetService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.hardwareSetService.remove(+id);
  }
}
