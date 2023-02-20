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
import { CreateTermsDto, UpdateTermsDto } from "../dto";
import { TermsService } from "../services";

@UseGuards(JwtAuthGuard)
@Controller("terms")
export class TermsController {
  constructor(private readonly termsService: TermsService) {}

  @Post()
  create(@Body() createTermDto: CreateTermsDto) {
    return this.termsService.create(createTermDto);
  }

  @Get()
  getUserTerms(@ReqUser() user: Payload, @Query() query: any) {
    return this.termsService.findByUserId(user.userId, query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.termsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() data: UpdateTermsDto) {
    return this.termsService.update(+id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.termsService.remove(+id);
  }
}
