import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import merge from "lodash.merge";
import mergeWith from "lodash.mergewith";
import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";

import { getRawSearch } from "common/lib";
import { Cabinet } from "database/entities";

import { CreateCabinetDto, GetCabinetsDto } from "./dto";

@Injectable()
export class CabinetService {
  constructor(
    @InjectRepository(Cabinet)
    private cabinetRepository: Repository<Cabinet>
  ) {}

  create(data: CreateCabinetDto) {
    const cabinet = this.cabinetRepository.create(data as Cabinet);

    return cabinet.save();
  }

  findAll() {
    return this.cabinetRepository.find();
  }

  async findByUserId(userId: number, opts: GetCabinetsDto) {
    const defaultWhere: FindOptionsWhere<Cabinet> = {
      user: { id: userId },
      corner: false,
    };
    if (opts.type) defaultWhere.type = opts.type;

    // This should be a common way to define orWhere
    const where = opts.search
      ? [
          merge(defaultWhere, {
            name: getRawSearch(opts.search),
          }),
        ]
      : defaultWhere;

    const queryOpts: FindManyOptions<Cabinet> = {
      // left-side returns NaN
      skip: (opts.page - 1) * opts.limit || void 0,
      take: opts.limit,
      order: {
        isFavourite: "DESC",
        ...(opts.orderBy ? { [opts.orderBy]: "DESC" } : {}),
        updatedAt: "DESC",
      },
      where,
    };

    const userCabinets = await this.cabinetRepository.find({
      relations: ["equipment"],
      ...queryOpts,
    });

    const count = await this.cabinetRepository.count({
      where: queryOpts.where,
    });

    return { count, data: userCabinets };
  }

  findOne(id: number) {
    return this.cabinetRepository.findOne({ where: { id } });
  }

  async update(id: number, data: any) {
    const cabinet = await this.cabinetRepository.findOneBy({ id });

    if (!cabinet) {
      throw new HttpException("Cabinet not found", 404);
    }

    // TODO: merging should probably not be a default behavior
    const mergedCabinet = mergeWith(cabinet, data, (_, srcValue, key) => {
      if (srcValue?.id) {
        return { id: srcValue.id };
      }
      if (key === "equipmentRows") {
        return srcValue;
      }
    });

    const res = await this.cabinetRepository.save(mergedCabinet);
    console.log("res => ", res);
    return res;
  }

  remove(id: number) {
    return this.cabinetRepository.delete(id);
  }

  calculateCabinetInteriorSqFt(cabinet: Cabinet, finished = false) {
    const height =
      cabinet.dimensions.floorToTop - cabinet.dimensions.floorToBottom;
    const { width, depth } = cabinet.dimensions;

    // Dependents of baseType
    let cabinetToe: number;
    let sideHeight = height;
    switch (cabinet.baseType) {
      case "standard":
        cabinetToe = cabinet.overridenToeHeight;
        sideHeight -= cabinet.overridenToeHeight;
      case "adjustable":
        cabinetToe = cabinet.overridenToeHeight;
      case "separate":
        cabinetToe = cabinet.toePlatform?.height || 0;
        sideHeight -= cabinet.toePlatform?.height || 0;
      // TODO: if no toe platform, do something
      default:
        break;
    }

    const noToeHeight = height - cabinetToe;
    const sqFt = {
      back: cabinet.interior.back
        ? width *
          (noToeHeight -
            cabinet.interior.nailers
              .filter((nailer) => nailer.subtract)
              .reduce((accum, nailer) => accum + nailer.length, 0)) *
          (finished ? cabinet.interior.back.finishedSidesCount : 1)
        : 0,
      top: cabinet.interior.top
        ? width *
          (depth - cabinet.interior.top.difference) *
          (finished ? cabinet.interior.top.finishedSidesCount : 1)
        : 0,
      deck: cabinet.interior.deck
        ? width *
          (depth - cabinet.interior.deck.difference) *
          (finished ? cabinet.interior.deck.finishedSidesCount : 1)
        : 0,
      stretchers:
        width *
        cabinet.interior.stretchers.reduce(
          (accum, stretcher) =>
            accum +
            stretcher.length * (finished ? stretcher.finishedSidesCount : 1),
          0
        ),
      adejustableShelves: cabinet.interior.shelves.adjustable.reduce(
        (accum, shelf) =>
          accum +
          width *
            (depth - shelf.difference) *
            (finished ? shelf.finishedSidesCount : 1),
        0
      ),
      fixedShelves: cabinet.interior.shelves.fixed.reduce(
        (accum, shelf) =>
          accum +
          width *
            (depth - shelf.difference) *
            (finished ? shelf.finishedSidesCount : 1),
        0
      ),
      sides: cabinet.interior.sides.reduce(
        (accum, side) =>
          accum + depth * sideHeight * (finished ? side.finishedSidesCount : 1),
        0
      ),
    };

    Object.keys(sqFt).forEach((key) => {
      sqFt[key] /= 144;
    });

    return sqFt;
  }

  calculateCabinetExteriorSqFt(cabinet: Cabinet, finished = false) {
    const sqFt = {
      appliedEnds: cabinet.exterior.appliedEnds.map(
        (end) =>
          end.length * end.width * (finished ? end.finishedSidesCount : 1)
      ),
      // TODO:
      fillers: cabinet.exterior.fillers.map(
        (filler) =>
          filler.length *
          filler.width *
          (finished ? filler.finishedSidesCount : 1)
      ),
      // baseDoors:
      // upperDoors:
      // drawerFronts:
      // faceFrame: cabinet.exterior.faceFrame
    };

    Object.keys(sqFt).forEach((key) => {
      sqFt[key] /= 144;
    });

    return sqFt;
  }
}
