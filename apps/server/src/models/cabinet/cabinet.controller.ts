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
import { CabinetService } from "./cabinet.service";
import type { CreateCabinetDto } from "./dto/create-cabinet.dto";
import type { UpdateCabinetDto } from "./dto/update-cabinet.dto";

@UseGuards(JwtAuthGuard)
@Controller("cabinets")
export class CabinetController {
  constructor(private readonly cabinetService: CabinetService) {}

  @Post()
  create(@Body() data: CreateCabinetDto) {
    return this.cabinetService.create(data);
  }

  @Get()
  findAll() {
    return this.cabinetService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.cabinetService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() data: UpdateCabinetDto) {
    return this.cabinetService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.cabinetService.remove(id);
  }
}
