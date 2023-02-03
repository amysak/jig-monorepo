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
import { MaterialSetService } from "./material-set.service";

// TODO: DTO
@UseGuards(JwtAuthGuard)
@Controller("material-sets")
export class MaterialSetController {
  constructor(private readonly materialSetService: MaterialSetService) {}

  @Post()
  create(@Body() data: any) {
    return this.materialSetService.create(data);
  }

  @Get()
  getAccountOpenings(@ReqUser() user: Payload, @Query() query: GetFinishesDto) {
    return this.materialSetService.findByAccountId(user.accountId, query);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.materialSetService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() data: any) {
    return this.materialSetService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.materialSetService.remove(+id);
  }
}
