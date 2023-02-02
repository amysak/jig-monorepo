import { DefaultableBaseEntity } from "database/entities";
import { EventSubscriber, InsertEvent } from "typeorm";

@EventSubscriber()
export class UpchargesSubscriber {
  async beforeInsert(event: InsertEvent<DefaultableBaseEntity>) {
    console.log("event => ", event);
    // const ds = await dataSource();

    // this.upcharges = await ds.getRepository(Upcharge).find({
    //   where: [{ name: ILike(this.type) }, { name: ILike("cabinet") }],
    // });
  }
}
