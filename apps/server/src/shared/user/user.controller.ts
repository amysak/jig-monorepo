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
import { GetStatsDto, Payload } from "type-defs";

import { JwtAuthGuard } from "auth/guards";
import { ReqUser } from "common/decorators";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/stats")
  getStats(@ReqUser() user: Payload, @Query() query: GetStatsDto) {
    return this.userService.getStats(user.userId, query);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: number) {
    return this.userService.getUserWithRelations(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async update(@Param("id") id: number, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id") id: number) {
    return this.userService.remove(id);
  }
}
