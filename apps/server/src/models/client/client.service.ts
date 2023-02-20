import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";

import { User, Client } from "database/entities";
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

  async create(data: CreateClientDto & { userId: number }) {
    const { userId, ...dto } = data;

    const client = this.clientRepository.create(dto);

    client.user = { id: userId } as User;

    return client.save();
  }

  async findByUserId(
    userId: number,
    opts?: PaginationDto
  ): Promise<WithCountDto<Client>> {
    const userClients = await this.clientRepository.find({
      where: { user: { id: userId } },
      skip: (opts.page - 1) * opts.limit || void 0,
      take: opts.limit,
      order: { updatedAt: "DESC" },
      relations: ["jobs"],
    });

    return { count: userClients.length, data: userClients };
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
