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

import { GetMaterialsDto } from "./dto";
import { MaterialService } from "./material.service";

// TODO: DTO
@UseGuards(JwtAuthGuard)
@Controller("materials")
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  create(@Body() data: any) {
    return this.materialService.create(data);
  }

  @Get()
  getAccountOpenings(
    @ReqUser() user: Payload,
    @Query() query: GetMaterialsDto
  ) {
    return this.materialService.findByAccountId(user.accountId, query);
  }

  @Get("types")
  getMaterialTypes(@ReqUser() user: Payload) {
    return this.materialService.getTypes(user.accountId);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.materialService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() data: any) {
    return this.materialService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.materialService.remove(+id);
  }
}
