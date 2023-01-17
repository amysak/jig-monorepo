import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import type { CreateMarkupDto, UpdateMarkupDto } from "./dto";
import { MarkupService } from "./markup.service";

@Controller("markup")
export class MarkupController {
  constructor(private readonly markupService: MarkupService) {}
  @Post()
  create(@Body() createMarkupDto: CreateMarkupDto) {
    return this.markupService.create(createMarkupDto);
  }
  @Get()
  findAll() {
    return this.markupService.findAll();
  }
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.markupService.findOne(+id);
  }
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMarkupDto: UpdateMarkupDto) {
    return this.markupService.update(+id, updateMarkupDto);
  }
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.markupService.remove(+id);
  }
}
