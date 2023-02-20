import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import mergeWith from "lodash.mergewith";
import { DeepPartial, In, Repository } from "typeorm";

import {
  Cabinet,
  HardwareSet,
  Job,
  MaterialSet,
  Room,
  User,
} from "database/entities";
import { CabinetService } from "shared/cabinet";
import { CreateRoomDto, GetRoomsByUserDto } from "./dto";

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private cabinetService: CabinetService,
    @InjectRepository(Cabinet)
    private cabinetRepository: Repository<Cabinet>,
    @InjectRepository(MaterialSet)
    private mSetRepository: Repository<MaterialSet>,
    @InjectRepository(HardwareSet)
    private hSetRepository: Repository<HardwareSet>
  ) {}

  async create({ jobId, ...dto }: CreateRoomDto & DeepPartial<Room>) {
    const room = this.roomRepository.create(dto);
    room.job = { id: jobId } as Job;
    room.user = { id: dto.user.id } as User;
    room.materialSet = await this.mSetRepository.save({
      name: `${room.name} Material Set`,
      user: { id: room.user.id },
    });
    room.hardwareSet = await this.hSetRepository.save({
      name: `${room.name} Hardware Set`,
      user: { id: room.user.id },
    });

    return room.save();
  }

  async findByUserId(userId: number): Promise<GetRoomsByUserDto> {
    const userRooms = await this.roomRepository.find({
      where: {
        user: { id: userId },
      },
    });

    return { count: userRooms.length, rooms: userRooms };
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
      relations: { user: true },
      where: { id: In(data.ids) },
    });

    const newCabinets = cabinets.map((cabinet) => {
      return this.cabinetRepository.create({
        ...cabinet,
        room: { id: room.id },
        id: null,
      });
    });

    return this.cabinetRepository.save(newCabinets);
  }

  fillRoom(
    roomId: number,
    cabinetId: number,
    footageAvailable: number,
    cabinetWidth: number
  ) {
    // footage available / cabinetWidth converted to foot = count of cabinets to fill
  }

  getRoomCabinetPrice(cabinet: Cabinet) {
    const usedMaterialSet =
      cabinet.overridenMaterialSet || cabinet.room.materialSet;
    const usedHardwareSet =
      cabinet.overridenHardwareSet || cabinet.room.hardwareSet;
    const cabinetEquipment = cabinet.equipment;
    const cabinetUpcharges = cabinet.upcharges;

    const interiorSqFt =
      this.cabinetService.calculateCabinetInteriorSqFt(cabinet);
    const exteriorSqFt =
      this.cabinetService.calculateCabinetExteriorSqFt(cabinet);
    // const equipmentPrice = this.cabinetService.calculateCabinetEquipmentPrice(cabinet);
    // const upchargesTotal = this.cabinetService.calculateCabinetUpchargesTotal(cabinet);
    console.log("interiorSqFt => ", interiorSqFt);
    console.log("exteriorSqFt => ", exteriorSqFt);

    return 100;
  }

  async getTotal(id: number) {
    const room = await this.roomRepository.findOneBy({ id });

    // Calc with individual upcharges
    const cabinetsTotal = room.cabinets.reduce((acc, cabinet) => {
      // not joined by default
      cabinet.room = room;
      return acc + this.getRoomCabinetPrice(cabinet);
    }, 0);
    const extensionsTotal = 0;
    const equipmentTotal = 0;
    // Apply room upcharges
  }

  remove(id: number) {
    return this.roomRepository.delete(id);
  }
}
