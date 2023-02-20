import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "auth/guards";
import { ReqUser } from "common/decorators";
import type { Payload } from "type-defs";

import { CreateRoomDto, GetRoomsByUserDto, UpdateRoomDto } from "./dto";
import { RoomService } from "./room.service";

@UseGuards(JwtAuthGuard)
@Controller("rooms")
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@ReqUser() user: Payload, @Body() data: CreateRoomDto) {
    return this.roomService.create({
      ...data,
      user: { id: user.userId },
    });
  }

  @Get()
  async getUserRooms(@ReqUser() user: Payload): Promise<GetRoomsByUserDto> {
    return this.roomService.findByUserId(user.userId);
  }

  @Get("job/:jobId")
  async getJobRooms(@Param("jobId") jobId: number) {
    return this.roomService.findByJobId(jobId);
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.roomService.findOne(id);
  }

  @Get("total/:id")
  getRoomTotal(@Param("id") id: number) {
    return this.roomService.getTotal(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() data: UpdateRoomDto) {
    return this.roomService.update(id, data);
  }

  @Patch(":id/cabinets")
  // TODO:
  addCabinets(@Param("id") id: number, @Body() data: { ids: number[] }) {
    return this.roomService.addCabinets(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.roomService.remove(id);
  }
}
