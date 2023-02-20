import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "auth/guards";
import { ReqUser } from "common/decorators";
import { Payload } from "type-defs";

import { ModelService } from "../services";

// TODO: DTO
@UseGuards(JwtAuthGuard)
@Controller("models")
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post()
  create(@Body() data: any) {
    return this.modelService.create(data);
  }

  @Get()
  getUserModels(@ReqUser() user: Payload) {
    return this.modelService.findByUserId(user.userId);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.modelService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() data: any) {
    return this.modelService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.modelService.remove(+id);
  }
}
