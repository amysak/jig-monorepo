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
import type { Payload } from "type-defs";
import { ClientService } from "./client.service";
import {
  CreateClientDto,
  GetClientsByAccountDto,
  GetClientsByAccountInputDto,
  UpdateClientDto,
} from "./dto";

@UseGuards(JwtAuthGuard)
@Controller("clients")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@ReqUser() user: Payload, @Body() data: CreateClientDto) {
    return this.clientService.create({
      ...data,
      accountId: user.accountId,
    });
  }

  @Get()
  async getAccountClients(
    @ReqUser() user: Payload,
    @Query() query: GetClientsByAccountInputDto
  ): Promise<GetClientsByAccountDto> {
    return this.clientService.findByAccountId(user.accountId, query);
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
