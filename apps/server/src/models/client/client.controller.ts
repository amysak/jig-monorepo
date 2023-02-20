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
import {
  CreateClientDto,
  PaginationDto,
  UpdateClientDto,
  type Payload,
} from "type-defs";

import { ClientService } from "./client.service";

@UseGuards(JwtAuthGuard)
@Controller("clients")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@ReqUser() user: Payload, @Body() data: CreateClientDto) {
    return this.clientService.create({
      ...data,
      userId: user.userId,
    });
  }

  @Get()
  async getUserClients(
    @ReqUser() user: Payload,
    @Query() query: PaginationDto
  ) {
    return this.clientService.findByUserId(user.userId, query);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.clientService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() data: UpdateClientDto) {
    return this.clientService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.clientService.remove(id);
  }
}
