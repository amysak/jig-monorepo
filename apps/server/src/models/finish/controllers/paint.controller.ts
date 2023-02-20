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
import { GetPaintsDto } from "../dto";
import { PaintService } from "../services";

// TODO: DTO
@UseGuards(JwtAuthGuard)
@Controller("paints")
export class PaintController {
  constructor(private readonly paintService: PaintService) {}

  @Post()
  create(@Body() data: any) {
    return this.paintService.create(data);
  }

  @Get()
  getUserFinishes(@ReqUser() user: Payload, @Query() query: GetPaintsDto) {
    return this.paintService.findByUserId(user.userId, query);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.paintService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() data: any) {
    return this.paintService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.paintService.remove(+id);
  }
}
