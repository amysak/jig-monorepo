import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import merge from "lodash.merge";
import mergeWith from "lodash.mergewith";
import sumBy from "lodash.sumby";
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

  // TODO: unoptimized
  calculateCabinetInteriorSqFt(cabinet: Cabinet, finished = false) {
    const { width, depth } = cabinet.dimensions;

    const sqFt = {
      back: cabinet.interior.back
        ? width *
          (cabinet.realHeight -
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
      adjustableShelves: cabinet.interior.shelves.adjustable.reduce(
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
      nailers: cabinet.interior.nailers.reduce(
        (accum, nailer) =>
          accum +
          width * nailer.length * (finished ? nailer.finishedSidesCount : 1),
        0
      ),
      sides: cabinet.interior.sides.reduce(
        (accum, side) =>
          accum +
          depth * cabinet.realHeight * (finished ? side.finishedSidesCount : 1),
        0
      ),
    };

    Object.keys(sqFt).forEach((key) => {
      sqFt[key] /= 144;
    });

    return sqFt;
  }

  // TODO: unoptimized
  calculateCabinetExteriorSqFt(cabinet: Cabinet, finished = false) {
    // Setting last row height to be the remaining height
    cabinet.exterior.equipmentRows.at(-1).height =
      cabinet.realHeight -
      cabinet.exterior.equipmentRows
        .slice(0, -1)
        .reduce((accum, row) => accum + row.height, 0);

    const { faceFrame } = cabinet.exterior;

    const exteriorSqInch = cabinet.exterior.equipmentRows.map((row) => {
      return row.items.reduce((accum, item, itemIndex) => {
        // TODO: currently not supporting groups
        let partHeight = row.height;
        // if (Array.isArray(item)) partHeight /= item.length;

        let partWidth = cabinet.dimensions.width / row.items.length;

        if (cabinet.openings.reveal) {
          partHeight -= cabinet.openings.reveal;
          partWidth -= cabinet.openings.reveal;
        }

        if (faceFrame?.mode === "both") {
          // let toSubtract = faceFrame.rails[itemIndex]?.height;
          // if (Array.isArray(item)) {
          //   toSubtract *= row.items.length;
          // }
          // partHeight -= toSubtract;
        }

        if (faceFrame?.mode === "stiles" || faceFrame?.mode === "both") {
          const toSubtract =
            faceFrame.stiles[itemIndex]?.reduce(
              (accum, value) => accum + value,
              0
            ) / row.items.length;

          partWidth -= toSubtract;
        }

        // if (Array.isArray(item)) {
        //   // This is what is inside one column
        //   item.forEach((subItem) => {
        //     const subItemSqFt = partWidth * (partHeight / row.items.length);
        //     accum = {
        //       ...accum,
        //       [subItem.type]: (accum[subItem.type] || 0) + subItemSqFt,
        //     };
        //   });
        // }

        const { type, dimensions } = Array.isArray(item) ? item[0] : item;

        if (type === "drawer" && Object.keys(dimensions).length > 0) {
          const sqFtDrawerBox =
            dimensions.depth * partWidth +
            dimensions.side * dimensions.depth * 2 +
            dimensions.back * partWidth +
            dimensions.front * partWidth;

          accum = { ...accum, box: (accum["box"] || 0) + sqFtDrawerBox };
        }

        return {
          ...accum,
          [type]: (accum[type] || 0) + partWidth * partHeight,
        };
      }, {});
    });

    // TODO: Painful. But can we do anything about it?
    const stilesSqInch = faceFrame?.stiles.reduce((accum, stileWidths, idx) => {
      return (
        accum +
        stileWidths.reduce((accum, stileWidth) => accum + stileWidth, 0) *
          cabinet.exterior.equipmentRows[idx]?.height *
          (finished ? faceFrame.stileFinishedSides : 1)
      );
    }, 0);

    const railsSqInch = faceFrame?.rails.reduce((accum, rail) => {
      let railSqFt = rail.height * cabinet.dimensions.width;

      if (rail.items) {
        railSqFt += rail.items.reduce((accum, item) => accum + item, 0);
      }
      if (finished) {
        railSqFt *= faceFrame.railFinishedSides;
      }

      return accum + railSqFt;
    }, 0);

    const sqFt = {
      appliedEnds: cabinet.exterior.appliedEnds.reduce(
        (accum, end) => accum + end.length * end.width,
        0
      ),
      fillers: cabinet.exterior.fillers.reduce(
        (accum, filler) => accum + filler.length * filler.width,
        0
      ),
      // TODO:
      // upperDoors:
      baseDoors: sumBy(exteriorSqInch, "baseDoor"),
      drawerFronts: sumBy(exteriorSqInch, "drawer"),
      drawers: sumBy(exteriorSqInch, "box"),
      faceFrame: stilesSqInch + railsSqInch,
    };

    console.log("equipmentRows => ", cabinet.exterior.equipmentRows);

    Object.keys(sqFt).forEach((key) => {
      sqFt[key] /= 144;
    });

    return sqFt;
  }
}
