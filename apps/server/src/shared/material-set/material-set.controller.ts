import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
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
  create(@ReqUser() user: Payload, @Body() data: any) {
    return this.materialSetService.create(user.userId, data);
  }

  @Get()
  getUserSets(@ReqUser() user: Payload, @Query() query: GetFinishesDto) {
    return this.materialSetService.findByUserId(user.userId, query);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.materialSetService.findOne(id);
  }

  @Put(":id")
  assign(@Param("id") id: number, @Body() data: { setId: number }) {
    return this.materialSetService.assign(id, data);
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
