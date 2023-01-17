import { DefaultableBaseEntity } from "database/entities";
import { EventSubscriber, UpdateEvent } from "typeorm";

@EventSubscriber()
export class IsDefaultSubscriber {
  async beforeUpdate(event: UpdateEvent<DefaultableBaseEntity>) {
    const { entity } = event;

    if (!entity) {
      return true;
    }

    if (entity.isDefault) {
      entity.id = null;
      entity.account = null;
      entity.isDefault = false;
      await entity.save();

      return false;
    }

    return true;
  }
}
