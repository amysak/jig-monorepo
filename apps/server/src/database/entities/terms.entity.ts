import { Expose } from "class-transformer";
import dayjs from "dayjs";
import { type TermsType } from "type-defs";
import { AfterLoad, Column, Entity, ManyToOne, OneToOne } from "typeorm";

import { AppBaseEntity } from "./base.entity";
import { Job } from "./job.entity";
import { User } from "./user.entity";

class PaymentPart {
  @Column("integer")
  percentage: number;

  @Column("text")
  explanationText: string;
}

class Conditions {
  @Column("text", { nullable: true })
  proposal?: string;

  @Column("text", { nullable: true })
  estimate?: string;
}

// https://github.com/typeorm/typeorm/issues/9033
// https://stackoverflow.com/questions/74138654/how-to-specify-discriminator-value-for-the-parent-table-using-single-table-inher
// =)))))))))))))))) TYPEORM IS DOGSHIT
@Entity()
export class Terms extends AppBaseEntity {
  @Column("text")
  type: TermsType;

  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  description?: string;

  @Column("boolean", { default: true })
  delivered: boolean;

  @Column("boolean", { default: true })
  installed: boolean;

  @Column(() => Conditions)
  conditions: Conditions;

  // multi-payment terms
  @Column("jsonb", { nullable: true })
  payments: PaymentPart[];

  // net terms
  @Column("integer", { nullable: true })
  paymentDue?: number;

  @Column("integer", { nullable: true })
  discountDue?: number;

  @Column("integer", { nullable: true })
  discountPercent?: number;

  @Column("boolean", { default: false })
  adjustTotal?: boolean;

  @Expose()
  paymentDueDate?: Date;

  @Expose()
  discountDueDate?: Date;

  @Column("text", { nullable: true })
  text?: string;

  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  user: User;

  @OneToOne(() => Job, (job) => job.terms, {
    nullable: true,
    onDelete: "CASCADE",
  })
  job?: Job;

  @OneToOne(() => User, (user) => user.preferences.materialSet, {
    nullable: true,
    onDelete: "CASCADE",
  })
  defaultForUser?: User;

  @AfterLoad()
  generateText() {
    if (this.payments?.length) {
      this.text = this.payments
        .map((payment) => `${payment.percentage}% ${payment.explanationText}`)
        .join(", ");

      return;
    }

    let text = "";

    if (this.discountDue) {
      const discountDueDate = dayjs(this.createdAt)
        .add(this.discountDue, "day")
        .toDate();

      text += `${this.discountPercent}% discount if paid by ${dayjs(
        discountDueDate
      ).format("MMM D")} `;
    }

    if (this.paymentDue) {
      const paymentDueDate = dayjs(this.createdAt)
        .add(this.paymentDue, "day")
        .toDate();

      text += `${text ? ", n" : "N"}et due by ${dayjs(paymentDueDate).format(
        "MMM D"
      )}`;
    }

    this.text = text;
  }
}
