import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";

import { Job, Room } from "database/entities";
import type { CreateRoomDto } from "./dto/create-room.dto";
import type { UpdateRoomDto } from "./dto/update-room.dto";

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>
  ) {}

  create(data: CreateRoomDto) {
    const { jobId, ...dto } = data;

    const room = this.roomRepository.create(dto);

    room.job = { id: jobId } as Job;

    return room.save();
  }

  async findByAccountId(accountId: number) {
    const accountRooms = await this.roomRepository.findBy({
      account: { id: accountId },
    });

    return { count: accountRooms.length, rooms: accountRooms };
  }

  async findByJobId(jobId: number) {
    return this.roomRepository.findBy({
      job: { id: jobId },
    });
  }

  findAll() {
    return this.roomRepository.find();
  }

  findOne(id: number) {
    return this.roomRepository.findOne({ where: { id } });
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return this.roomRepository.update(id, updateRoomDto);
  }

  remove(id: number) {
    return this.roomRepository.delete(id);
  }
}
