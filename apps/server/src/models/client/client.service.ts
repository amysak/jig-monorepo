import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";

import { Account, Client } from "database/entities";
import {
  CreateClientDto,
  PaginationDto,
  UpdateClientDto,
  WithCountDto,
} from "type-defs";

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>
  ) {}

  async create(data: CreateClientDto & { accountId: number }) {
    const { accountId, ...dto } = data;

    const client = this.clientRepository.create(dto);

    client.account = { id: accountId } as Account;

    return client.save();
  }

  async findByAccountId(
    accountId: number,
    opts?: PaginationDto
  ): Promise<WithCountDto<Client>> {
    const accountClients = await this.clientRepository.find({
      where: { account: { id: accountId } },
      skip: (opts.page - 1) * opts.limit || void 0,
      take: opts.limit,
      order: { updatedAt: "DESC" },
      relations: ["jobs"],
    });

    return { count: accountClients.length, data: accountClients };
  }

  async findAll() {
    return this.clientRepository.find();
  }

  async findOne(id: number) {
    return this.clientRepository.findOne({ where: { id } });
  }

  async update(id: number, data: UpdateClientDto) {
    return this.clientRepository.update(id, data);
  }

  async remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
