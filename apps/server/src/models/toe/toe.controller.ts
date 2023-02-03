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

import { GetToesDto } from "./dto";
import { ToeService } from "./toe.service";

// TODO: DTO
@UseGuards(JwtAuthGuard)
@Controller("toes")
export class ToeController {
  constructor(private readonly toeService: ToeService) {}

  @Post()
  create(@Body() data: any) {
    return this.toeService.create(data);
  }

  @Get()
  getAccountOpenings(@ReqUser() user: Payload, @Query() query: GetToesDto) {
    return this.toeService.findByAccountId(user.accountId, query);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.toeService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() data: any) {
    return this.toeService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.toeService.remove(+id);
  }
}
