import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";

import { Account, Client } from "database/entities";
import type { CreateClientDto } from "./dto/create-client.dto";
import type { UpdateClientDto } from "./dto/update-client.dto";

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
    opts?: { limit?: number; skip?: number }
  ) {
    const accountClients = await this.clientRepository.find({
      where: { account: { id: accountId } },
      skip: opts?.skip,
      take: opts?.limit,
    });

    return { count: accountClients.length, clients: accountClients };
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
