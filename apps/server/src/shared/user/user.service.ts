import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import omit from "lodash.omit";
import { EntityManager, Repository } from "typeorm";

import { User } from "database/entities";
import { GetStatsDto } from "type-defs";

import type { CreateUserDto, UpdateUserDto } from "./dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly entityManager: EntityManager
  ) {}
  async findAll() {
    return this.userRepository.find();
  }

  async create(data: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    return this.userRepository
      .create({ ...data, password: hashedPassword, salt })
      .save();
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async findById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, data: UpdateUserDto) {
    return this.userRepository.update(id, data);
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }

  async getUserWithRelations(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["clients", "clients.jobs"],
    });

    if (!user) {
      throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
    }

    return {
      user: omit(user, "password", "salt"),
      jobs: user.clients?.map((client) => client.jobs).flat(),
    };
  }

  // This is a temporary solution, it will be only used in v1 and further refactored in v2
  async getStats(userId: number, data: GetStatsDto) {
    const { type, date, range } = data;

    // TODO: Add validation for date and range
    const dateStart = dayjs.unix(Number(date));
    const dateLast = dateStart.clone().endOf(range || "week");

    const dateField = "created_at"; // Could alter based on entity. For example, for jobs we could use updated_at.

    const dateTruncated = `DATE_TRUNC('${
      range === "year" ? "month" : "day"
    }', ${dateField})`;

    // Could arguably add a status filter for jobs (only select finished for revenue calculation)

    let result: [
      {
        total: number;
        selected: number;
        data: { date: string; count: number }[];
      }
    ];

    if (type === "clients") {
      result = await this.entityManager.query(
        `WITH total AS (
            SELECT COUNT(*) FROM client WHERE user_id = $1
          ), selected AS (
            SELECT COUNT(*) FROM client WHERE user_id = $1 AND created_at BETWEEN $2 AND $3
          ), data AS (
            SELECT ${dateTruncated} AS date, COUNT(*) as value FROM client WHERE user_id = $1 AND created_at BETWEEN $2 AND $3 GROUP BY ${dateTruncated}
          )
          SELECT (SELECT * FROM total) AS total, (SELECT * FROM selected) AS selected, (SELECT array_to_json(array_agg(row_to_json(data))) FROM data) AS data`,
        [userId, dateStart.format("YYYYMMDD"), dateLast.format("YYYYMMDD")]
      );
    } else if (type === "jobs") {
      result = await this.entityManager.query(
        `WITH total AS (
            SELECT COUNT(*) FROM job WHERE user_id = $1
          ), selected AS (
            SELECT COUNT(*) FROM job WHERE user_id = $1 AND created_at BETWEEN $2 AND $3
          ), data AS (
            SELECT ${dateTruncated} AS date, COUNT(*) as value FROM job WHERE user_id = $1 AND created_at BETWEEN $2 AND $3 GROUP BY ${dateTruncated}
          )
          SELECT (SELECT * FROM total) AS total, (SELECT * FROM selected) AS selected, (SELECT array_to_json(array_agg(row_to_json(data))) FROM data) AS data`,
        [userId, dateStart.format("YYYYMMDD"), dateLast.format("YYYYMMDD")]
      );
    } else {
      // TODO:
      return [{ total: 0 }];
      // result = await this.entityManager.query(
      //   `WITH total AS (
      //       SELECT SUM(total_price) FROM room WHERE user_id = $1
      //     ), selected AS (
      //       SELECT SUM(total_price) FROM room WHERE user_id = $1 AND created_at BETWEEN $2 AND $3
      //     ), data AS (
      //       SELECT ${dateTruncated} AS date, SUM(total_price) as value FROM room WHERE user_id = $1 AND created_at BETWEEN $2 AND $3 GROUP BY ${dateTruncated}
      //     )
      //     SELECT (SELECT * FROM total) AS total, (SELECT * FROM selected) AS selected, (SELECT array_to_json(array_agg(row_to_json(data))) FROM data) AS data`,
      //   [userId, dateStart.format("YYYYMMDD"), dateLast.format("YYYYMMDD")]
      // );
    }

    return result[0].total ? result[0] : null;
  }
}
