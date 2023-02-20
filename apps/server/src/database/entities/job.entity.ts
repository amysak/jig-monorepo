import { type CompletionStatus } from "type-defs";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";

import { AppBaseEntity } from "./base.entity";
import { Client } from "./client.entity";
import { Markup } from "./markup.entity";
import { Room } from "./room.entity";
import { Terms } from "./terms.entity";
import { User } from "./user.entity";

class JobDelivery {
  @Column("text", { default: null })
  text?: string;

  @Column("integer", { default: 1 })
  tripQuantity?: number;

  @Column("integer", { default: 0 })
  miles?: number;
}

export class JobNotes {
  @Column("text", { default: null })
  internal?: string;

  @Column("text", { default: null })
  external?: string;
}

@Entity()
export class Job extends AppBaseEntity {
  @Column("text")
  name: string;

  @Column("timestamp", { nullable: true })
  estimateDate?: Date;

  @Column("timestamp", { nullable: true })
  proposalDate?: Date;

  @Column("text", { nullable: true })
  description?: string;

  @Column("text", { nullable: true })
  subdivision?: string;

  @Column("int", { nullable: true })
  lotNumber?: number;

  @Column("text", { default: "estimate" })
  status: CompletionStatus;

  @Column(() => JobNotes)
  notes: JobNotes;

  @Column(() => JobDelivery)
  delivery: JobDelivery;

  @OneToOne(() => Terms, {
    nullable: true,
    onDelete: "SET NULL",
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  terms?: Terms;

  @OneToOne(() => Markup, {
    nullable: true,
    onDelete: "SET NULL",
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  markup?: Markup;

  @ManyToOne(() => User, {
    nullable: false,
    onDelete: "CASCADE",
  })
  user: User;

  @OneToMany(() => Room, (room) => room.job, { eager: true, cascade: true })
  rooms: Room[];

  @ManyToOne(() => Client, (client) => client.jobs, {
    onDelete: "CASCADE",
  })
  client: Client;
}
