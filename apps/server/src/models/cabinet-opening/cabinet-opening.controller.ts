import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { CabinetOpeningService } from "./cabinet-opening.service";
import type { CreateCabinetOpeningDto } from "./dto/create-cabinet-opening.dto";
import type { UpdateCabinetOpeningDto } from "./dto/update-cabinet-opening.dto";

@Controller("cabinet-openings")
export class CabinetOpeningController {
  constructor(private readonly cabinetOpeningService: CabinetOpeningService) {}
  @Post()
  create(@Body() data: CreateCabinetOpeningDto) {
    return this.cabinetOpeningService.create(data);
  }
  @Get()
  findAll() {
    return this.cabinetOpeningService.findAll();
  }
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.cabinetOpeningService.findOne(id);
  }
  @Patch(":id")
  update(@Param("id") id: number, @Body() data: UpdateCabinetOpeningDto) {
    return this.cabinetOpeningService.update(id, data);
  }
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.cabinetOpeningService.remove(+id);
  }
}
