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

import { GetPanelsDto } from "./dto";
import { PanelService } from "./panel.service";

// TODO: DTO
@UseGuards(JwtAuthGuard)
@Controller("panels")
export class PanelController {
  constructor(private readonly panelService: PanelService) {}

  @Post()
  create(@Body() data: any) {
    return this.panelService.create(data);
  }

  @Get()
  getUserOpenings(@ReqUser() user: Payload, @Query() query: GetPanelsDto) {
    return this.panelService.findByUserId(user.userId, query);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.panelService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() data: any) {
    return this.panelService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.panelService.remove(+id);
  }
}
