import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import omit from "lodash.omit";
import { EntityManager, Repository } from "typeorm";

import { Account } from "database/entities";
import { GetStatsDto } from "type-defs";

import type { CreateAccountDto, UpdateAccountDto } from "./dto";

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private readonly entityManager: EntityManager
  ) {}
  async findAll() {
    return this.accountRepository.find();
  }

  async create(data: CreateAccountDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    return this.accountRepository
      .create({ ...data, password: hashedPassword, salt })
      .save();
  }

  async findByEmail(email: string) {
    return this.accountRepository.findOneBy({ email });
  }

  async findById(id: number) {
    return this.accountRepository.findOneBy({ id });
  }

  async update(id: number, data: UpdateAccountDto) {
    return this.accountRepository.update(id, data);
  }

  async remove(id: number) {
    return this.accountRepository.delete(id);
  }

  async getAccountWithRelations(id: number) {
    const account = await this.accountRepository.findOne({
      where: { id },
      relations: ["clients", "clients.jobs"],
    });

    if (!account) {
      throw new HttpException("Account not found", HttpStatus.BAD_REQUEST);
    }

    return {
      account: omit(account, "password", "salt"),
      jobs: account.clients?.map((client) => client.jobs).flat(),
    };
  }

  // This is a temporary solution, it will be only used in v1 and further refactored in v2
  async getStats(accountId: number, data: GetStatsDto) {
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
            SELECT COUNT(*) FROM client WHERE account_id = $1
          ), selected AS (
            SELECT COUNT(*) FROM client WHERE account_id = $1 AND created_at BETWEEN $2 AND $3
          ), data AS (
            SELECT ${dateTruncated} AS date, COUNT(*) as value FROM client WHERE account_id = $1 AND created_at BETWEEN $2 AND $3 GROUP BY ${dateTruncated}
          )
          SELECT (SELECT * FROM total) AS total, (SELECT * FROM selected) AS selected, (SELECT array_to_json(array_agg(row_to_json(data))) FROM data) AS data`,
        [accountId, dateStart.format("YYYYMMDD"), dateLast.format("YYYYMMDD")]
      );
    } else if (type === "jobs") {
      result = await this.entityManager.query(
        `WITH total AS (
            SELECT COUNT(*) FROM job WHERE account_id = $1
          ), selected AS (
            SELECT COUNT(*) FROM job WHERE account_id = $1 AND created_at BETWEEN $2 AND $3
          ), data AS (
            SELECT ${dateTruncated} AS date, COUNT(*) as value FROM job WHERE account_id = $1 AND created_at BETWEEN $2 AND $3 GROUP BY ${dateTruncated}
          )
          SELECT (SELECT * FROM total) AS total, (SELECT * FROM selected) AS selected, (SELECT array_to_json(array_agg(row_to_json(data))) FROM data) AS data`,
        [accountId, dateStart.format("YYYYMMDD"), dateLast.format("YYYYMMDD")]
      );
    } else {
      result = await this.entityManager.query(
        `WITH total AS (
            SELECT SUM(total_price) FROM room WHERE account_id = $1
          ), selected AS (
            SELECT SUM(total_price) FROM room WHERE account_id = $1 AND created_at BETWEEN $2 AND $3
          ), data AS (
            SELECT ${dateTruncated} AS date, SUM(total_price) as value FROM room WHERE account_id = $1 AND created_at BETWEEN $2 AND $3 GROUP BY ${dateTruncated}
          )
          SELECT (SELECT * FROM total) AS total, (SELECT * FROM selected) AS selected, (SELECT array_to_json(array_agg(row_to_json(data))) FROM data) AS data`,
        [accountId, dateStart.format("YYYYMMDD"), dateLast.format("YYYYMMDD")]
      );
    }

    return result[0].total ? result[0] : null;
  }
}
