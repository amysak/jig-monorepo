import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import type { Payload } from "type-defs";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    super({ usernameField: "email" });
  }

  public async validate(email: string, password: string): Promise<Payload> {
    const account = await this.auth.validateAccount(email, password);

    if (!account) {
      throw new UnauthorizedException();
    }

    return {
      accountId: account.id,
      email: account.email,
      role: account.role,
    };
  }
}
