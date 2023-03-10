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
import { Payload } from "type-defs";

import { JwtAuthGuard } from "auth/guards";
import { ReqUser } from "common/decorators";
import { UpchargeService } from "../services";

@UseGuards(JwtAuthGuard)
@Controller("upcharges")
export class UpchargeController {
  constructor(private readonly upchargeService: UpchargeService) {}
  @Post()
  create(@Body() data: any) {
    return this.upchargeService.create(data);
  }

  @Get()
  getUserUpcharges(@ReqUser() user: Payload, @Query() query: any) {
    return this.upchargeService.findByUserId(user.userId, query);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.upchargeService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() data: any) {
    return this.upchargeService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.upchargeService.remove(id);
  }
}
