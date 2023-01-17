import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import type { Payload } from "type-defs";

@Injectable()
export class JwtVerifyStrategy extends PassportStrategy(
  Strategy,
  "jwt-verify"
) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true, // Expiration of the access_token is not checked when processing the refresh_token.
      secretOrKey: config.get("jwtSecret"),
    });
  }

  public validate(payload: any): Payload {
    console.log("payload => ", payload);
    return { accountId: payload.sub, email: payload.email, role: payload.role };
  }
}
