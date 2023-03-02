import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import mergeWith from "lodash.mergewith";
import { DeepPartial, In, Repository } from "typeorm";

import {
  Cabinet,
  FinishProcess,
  HardwareSet,
  Job,
  Material,
  MaterialSet,
  Model,
  Paint,
  Room,
  User,
} from "database/entities";
import { CabinetService } from "shared";
import { CreateRoomDto, GetRoomsByUserDto } from "./dto";

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private cabinetService: CabinetService,
    @InjectRepository(Model)
    private modelRepository: Repository<Model>,
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
    @InjectRepository(FinishProcess)
    private fpRepository: Repository<FinishProcess>,
    @InjectRepository(Paint)
    private paintRepository: Repository<Paint>,
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
      relations: ["cabinets.toePlatform"],
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
    const countToFill = Math.floor(footageAvailable / (cabinetWidth / 144));

    return this.addCabinets(roomId, {
      ids: new Array(countToFill).fill(cabinetId),
    });
  }

  async getRoomCabinetPrice(
    cabinet: Cabinet,
    {
      materials,
      finishProcesses,
    }: { materials: Material[]; finishProcesses: FinishProcess[] }
  ) {
    const usedMaterialSet =
      cabinet.overridenMaterialSet || cabinet.room.materialSet;
    const usedHardwareSet =
      cabinet.overridenHardwareSet || cabinet.room.hardwareSet;
    const interiorSqFt =
      this.cabinetService.calculateCabinetInteriorSqFt(cabinet);
    const exteriorSqFt =
      this.cabinetService.calculateCabinetExteriorSqFt(cabinet);

    // Next developer will optimize =D
    const finishedInteriorSqFt =
      this.cabinetService.calculateCabinetInteriorSqFt(cabinet, true);
    const finishedExteriorSqFt =
      this.cabinetService.calculateCabinetExteriorSqFt(cabinet, true);

    // TODO: Edgebanding and get rid of finished/unfinished
    // const cabinetBackTotal =
    //   interiorSqFt.back *
    //     materials.find((m) => m.id === usedMaterialSet.interior.finished.backId)
    //       .discountedPrice +
    //   finishedInteriorSqFt.back *
    //     (finishProcesses.find(
    //       (fp) => fp.id === usedMaterialSet.interior.finished.finishes.processId
    //     ).price.perSquareFeet.price /
    //       2);
    const cabinetEquipmentTotal = cabinet.equipment.reduce(
      (accum, equipmentItem) =>
        accum + equipmentItem.price * (1 - equipmentItem.discount / 100),
      0
    );
    const cabinetUpchargesTotal = cabinet.upcharges.reduce(
      (accum, upcharge) => accum + upcharge.amount,
      0
    );
    return 100;
    // return finishedBuiltParts + cabinetEquipmentTotal + cabinetUpchargesTotal;
  }

  async getTotal(id: number) {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: [
        "user",
        "panels",
        "toes",
        "equipment",
        "upcharges",
        "materialSet",
      ],
    });

    const models = await this.modelRepository.find({
      where: { user: { id: room.user.id } },
    });
    const modelsMap = new Map(models.map((model) => [model.id, model]));
    const materials = await this.materialRepository.find({
      where: { user: { id: room.user.id } },
    });
    const materialsMap = new Map(
      materials.map((material) => [material.id, material])
    );
    const finishProcesses = await this.fpRepository.find({
      where: { user: { id: room.user.id } },
    });
    const finishesMap = new Map(
      finishProcesses.map((finish) => [finish.id, finish])
    );
    // const upchargesMap = new Map(
    //   room.upcharges.map((upcharge) => [upcharge., upcharge])
    // );

    let cabinetsTotal = 0;
    for (const cabinet of room.cabinets) {
      cabinet.room = room;
      const cabinetTotal = await this.getRoomCabinetPrice(cabinet, {
        materials,
        finishProcesses,
      });
      cabinetsTotal += cabinetTotal;
    }
    // Calc with individual upcharges
    const panelsSqFt = room.panels.reduce(
      (accum, panel) => ({
        ...accum,
        [panel.type]: accum[panel.type] + panel.width * panel.height,
      }),
      { appliance: 0, wainscot: 0 }
    );

    const {
      materialSet: { exterior: materialSetExterior },
    } = room;

    // const applianceTotal =
    //   panelsSqFt.appliance *
    //     materialsMap.get(materialSetExterior.appliancePanel.materialId)
    //       .discountedPrice +
    //   panelsSqFt.appliance *
    //     finishesMap.get(materialSetExterior.appliancePanel.finishes.processId)
    //       .discountedPricePerSqFt +
    //   modelsMap.get(materialSetExterior.appliancePanel.modelId).appliancePanel
    //     .discountedPrice;

    // const wainscotTotal =
    //   panelsSqFt.appliance *
    //     materialsMap.get(materialSetExterior.wainscotPanel.materialId)
    //       .discountedPrice +
    //   panelsSqFt.appliance *
    //     finishesMap.get(materialSetExterior.wainscotPanel.finishes.processId)
    //       .discountedPricePerSqFt +
    //   modelsMap.get(materialSetExterior.wainscotPanel.modelId).wainscotPanel
    //     .discountedPrice;

    // const toeSqFt = room.toes.reduce(
    //   (accum, toe) =>
    //     accum +
    //     (toe.height * toe.width * 2 +
    //       toe.height * toe.depth * (2 + toe.sleepersCount)),
    //   0
    // );
    // const toesTotal =
    //   toeSqFt*
    //     materialsMap.get(materialSetExterior.toe.materialId)
    //       .discountedPrice +
    //   toeSqFt *
    //     finishesMap.get(materialSetExterior.toe.finishes.processId)
    //       .discountedPricePerSqFt

    // const extensionsTotal = applianceTotal + wainscotTotal + toesTotal;
    // const equipmentTotal = room.equipment.reduce(
    //   (accum, equipment) =>
    //     accum + equipment.price * (1 - equipment.discount / 100),
    //   0
    // );
    // TODO: Apply room upcharges, allow them to be applied per entity
    // const upchargesTotal = room.upcharges.reduce((accum, upcharge) => {
    //   return accum + upcharge.amount;
    // }, 0);

    // return cabinetsTotal + extensionsTotal + equipmentTotal + upchargesTotal;
    return 100;
  }

  remove(id: number) {
    return this.roomRepository.delete(id);
  }
}
