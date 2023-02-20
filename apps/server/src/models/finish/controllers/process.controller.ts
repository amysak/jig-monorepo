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
import { PaginationDto, Payload } from "type-defs";
import { ProcessService } from "../services";

// TODO: DTO
@UseGuards(JwtAuthGuard)
@Controller("finishes")
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Post()
  create(@Body() data: any) {
    return this.processService.create(data);
  }

  @Get()
  getUserFinishes(@ReqUser() user: Payload, @Query() query: PaginationDto) {
    return this.processService.findByUserId(user.userId, query);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.processService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() data: any) {
    return this.processService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.processService.remove(+id);
  }
}
