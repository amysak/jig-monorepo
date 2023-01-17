import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { CreateFillerDto } from "./dto/create-filler.dto";
import { UpdateFillerDto } from "./dto/update-filler.dto";
import { FillerService } from "./filler.service";

@Controller("fillers")
export class FillerController {
  constructor(private readonly fillerService: FillerService) {}
  @Post()
  create(@Body() data: CreateFillerDto) {
    return this.fillerService.create(data);
  }
  @Get()
  findAll() {
    return this.fillerService.findAll();
  }
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.fillerService.findOne(id);
  }
  @Patch(":id")
  update(@Param("id") id: number, @Body() data: UpdateFillerDto) {
    return this.fillerService.update(id, data);
  }
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.fillerService.remove(id);
  }
}
