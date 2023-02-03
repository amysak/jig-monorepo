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

import { CreateMarkupDto, UpdateMarkupDto } from "./dto";
import { MarkupService } from "./markup.service";

@UseGuards(JwtAuthGuard)
@Controller("markups")
export class MarkupController {
  constructor(private readonly markupService: MarkupService) {}
  @Post()
  create(@Body() createMarkupDto: CreateMarkupDto) {
    return this.markupService.create(createMarkupDto);
  }

  @Get()
  getAccountMarkups(@ReqUser() user: Payload, @Query() query: any) {
    return this.markupService.findByAccountId(user.accountId, query);
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
