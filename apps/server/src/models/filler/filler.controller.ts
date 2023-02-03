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

import { GetFillersDto } from "./dto";
import { FillerService } from "./filler.service";

// TODO: DTO
@UseGuards(JwtAuthGuard)
@Controller("fillers")
export class FillerController {
  constructor(private readonly fillerService: FillerService) {}

  @Post()
  create(@Body() data: any) {
    return this.fillerService.create(data);
  }

  @Get()
  getAccountOpenings(@ReqUser() user: Payload, @Query() query: GetFillersDto) {
    return this.fillerService.findByAccountId(user.accountId, query);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.fillerService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() data: any) {
    return this.fillerService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.fillerService.remove(+id);
  }
}
