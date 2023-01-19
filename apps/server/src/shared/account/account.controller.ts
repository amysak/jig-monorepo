import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";

import { JwtAuthGuard } from "auth/guards";
import { ReqUser } from "common/decorators";
import type { GetStatsDto, Payload } from "type-defs";

import { AccountService } from "./account.service";
import type { CreateAccountDto } from "./dto/create-account.dto";
import type { UpdateAccountDto } from "./dto/update-account.dto";

@UseInterceptors(ClassSerializerInterceptor)
@Controller("accounts")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/stats")
  getStats(@ReqUser() user: Payload, @Query() query: GetStatsDto) {
    return this.accountService.getStats(user.accountId, query);
  }

  @Get()
  async findAll() {
    return this.accountService.findAll();
  }

  @Post()
  async create(@Body() data: CreateAccountDto) {
    return this.accountService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: number) {
    return this.accountService.getAccountWithRelations(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async update(@Param("id") id: number, @Body() data: UpdateAccountDto) {
    return this.accountService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id") id: number) {
    return this.accountService.remove(id);
  }
}
