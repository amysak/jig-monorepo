import { Expose } from "class-transformer";
import dayjs from "dayjs";
import {
  AfterLoad,
  ChildEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  TableInheritance,
} from "typeorm";

import { TERMS_TYPE, type TermsType } from "type-defs";
import { Account } from "./account.entity";
import { DefaultableBaseEntity } from "./base.entity";
import { AccountPreferences, JobPreferences } from "./preferences.entity";

class PaymentPart {
  @Column("integer")
  percentage: number;

  @Column("text")
  explanationText: string;
}

class Conditions {
  @Column("text")
  proposal?: string;

  @Column("text")
  estimate?: string;
}

@Entity()
@TableInheritance({
  column: { type: "text", name: "type", enum: TERMS_TYPE },
})
export class Terms extends DefaultableBaseEntity {
  // https://github.com/typeorm/typeorm/issues/9033
  // https://stackoverflow.com/questions/74138654/how-to-specify-discriminator-value-for-the-parent-table-using-single-table-inher
  // =)))))))))))))))) TYPEORM IS DOGSHIT
  @Column("enum", { enum: TERMS_TYPE })
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

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  account: Account;

  @OneToOne(() => JobPreferences, (jobPreferences) => jobPreferences.terms)
  jobPreferences?: JobPreferences;

  @OneToOne(
    () => AccountPreferences,
    (accountPreferences) => accountPreferences.terms
  )
  accountPreferences?: AccountPreferences;

  @Expose()
  text: string;

  @AfterLoad()
  populate() {
    return;
  }
}

@ChildEntity(TERMS_TYPE.MULTI_PAYMENT)
export class MultiPaymentTerms extends Terms {
  @Column("jsonb")
  payments: PaymentPart[];

  override populate() {
    this.text = this.payments
      .map((payment) => `${payment.percentage}% ${payment.explanationText}`)
      .join(", ");
  }
}

@ChildEntity(TERMS_TYPE.NET)
export class NetTerms extends Terms {
  @Column("integer")
  paymentDue?: number;

  @Column("integer")
  discountDue?: number;

  @Column("integer")
  discountPercent?: number;

  @Column("boolean")
  adjustTotal: boolean;

  @Expose()
  paymentDueDate?: Date;

  @Expose()
  discountDueDate?: Date;

  override populate() {
    let text = "";

    if (this.discountDue) {
      this.discountDueDate = dayjs(this.createdAt)
        .add(this.discountDue, "day")
        .toDate();

      text += `${this.discountPercent}% discount if paid by ${dayjs(
        this.discountDueDate
      ).format("MMM D")} `;
    }

    if (this.paymentDue) {
      this.paymentDueDate = dayjs(this.createdAt)
        .add(this.paymentDue, "day")
        .toDate();

      text += `${text ? ", n" : "N"}et due by ${dayjs(
        this.paymentDueDate
      ).format("MMM D")}`;
    }

    this.text = text;
  }
}
