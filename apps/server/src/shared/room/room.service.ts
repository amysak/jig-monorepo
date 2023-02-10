import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, In, Repository } from "typeorm";
import mergeWith from "lodash.mergewith";

import {
  Account,
  Cabinet,
  CabinetSpecifications,
  HardwareSet,
  Job,
  MaterialSet,
  Room,
} from "database/entities";
import { CreateRoomDto } from "./dto";

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(Cabinet)
    private cabinetRepository: Repository<Cabinet>,
    @InjectRepository(MaterialSet)
    private mSetRepository: Repository<MaterialSet>,
    @InjectRepository(HardwareSet)
    private hSetRepository: Repository<HardwareSet>,
    @InjectRepository(CabinetSpecifications)
    private specificationsRepository: Repository<CabinetSpecifications>
  ) {}

  async create({ jobId, ...dto }: CreateRoomDto & DeepPartial<Room>) {
    const room = this.roomRepository.create(dto);
    room.job = { id: jobId } as Job;
    room.account = { id: dto.account.id } as Account;
    room.materialSet = await this.mSetRepository.save({
      name: `${room.name} Material Set`,
      account: { id: room.account.id },
    });
    room.hardwareSet = await this.hSetRepository.save({
      name: `${room.name} Hardware Set`,
      account: { id: room.account.id },
    });

    return room.save();
  }

  async findByAccountId(accountId: number) {
    const accountRooms = await this.roomRepository.find({
      relations: ["cabinets.specifications"],
      where: {
        account: { id: accountId },
      },
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
    return this.roomRepository.findOne({
      relations: ["cabinets.specifications"],
      where: { id },
    });
  }

  async update(id: number, data: any) {
    const room = await this.roomRepository.findOneBy({ id });

    if (!room) {
      throw new HttpException("Room not found", 404);
    }

    const mergedRoom = mergeWith(room, data, (_, srcValue) => {
      if (srcValue?.id) {
        return { id: srcValue.id };
      }
    });

    return this.roomRepository.save(mergedRoom);
  }

  async addCabinets(id: number, data: { ids: number[] }) {
    const room = await this.roomRepository.findOneBy({ id });

    const cabinets = await this.cabinetRepository.find({
      relations: { account: true, specifications: true },
      where: { id: In(data.ids) },
    });

    return Promise.all(
      cabinets.map(async (cabinet) => {
        const specs = await this.specificationsRepository.save({
          ...cabinet.specifications,
          id: null,
        });

        return this.cabinetRepository.save({
          ...cabinet,
          room: { id: room.id },
          specifications: { id: specs.id },
          id: null,
        });
      })
    );
  }

  remove(id: number) {
    return this.roomRepository.delete(id);
  }
}
