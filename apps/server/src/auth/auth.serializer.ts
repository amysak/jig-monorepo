import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";

import type { Payload } from "type-defs";

@Injectable()
export class AuthSerializer extends PassportSerializer {
  public serializeUser(
    data: Payload,
    done: (err: Error | null, data?: Payload) => void
  ): void {
    done(null, data);
  }

  public deserializeUser(
    data: Payload,
    done: (err: Error | null, user?: Payload) => void
  ): void {
    try {
      // const user = await fetchMore();
      done(null, data);
    } catch (err) {
      done(<Error>err);
    }
  }
}
