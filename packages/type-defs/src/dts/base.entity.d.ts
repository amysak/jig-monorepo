import { BaseEntity } from "typeorm";
export declare abstract class AppBaseEntity extends BaseEntity {
    id: number;
    readonly createdAt: Date;
    updatedAt: Date;
}
export declare abstract class DeactivatableEntity extends AppBaseEntity {
    isActive: boolean;
}
export declare abstract class DefaultableBaseEntity extends DeactivatableEntity {
    isDefault: boolean;
}
//# sourceMappingURL=base.entity.d.ts.map