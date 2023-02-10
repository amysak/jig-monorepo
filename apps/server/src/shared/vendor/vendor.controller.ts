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
import { VendorService } from "./vendor.service";

// TODO: DTO
@UseGuards(JwtAuthGuard)
@Controller("finishes")
export class VendorController {
  constructor(private readonly finishService: VendorService) {}

  @Post()
  create(@Body() data: any) {
    return this.finishService.create(data);
  }

  @Get()
  // TODO: query
  getAccountVendors(@ReqUser() user: Payload, @Query() query: any) {
    return this.finishService.findByAccountId(user.accountId, query);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.finishService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() data: any) {
    return this.finishService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.finishService.remove(+id);
  }
}
