import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";

import { User } from "database/entities";
import { UserService } from "shared";
import type { GetMeResult, Payload, TokenPair } from "type-defs";

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private user: UserService,
    private config: ConfigService
  ) {}

  public async validateUser(
    email: string,
    password: string
  ): Promise<User | null> {
    const user = await this.user.findByEmail(email);

    if (!user || !user.password) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  public validateRefreshToken(data: Payload, refreshToken: string): boolean {
    if (
      !this.jwt.verify(refreshToken, {
        secret: this.config.get("jwtRefreshSecret"),
      })
    ) {
      return false;
    }

    const payload = <{ sub: string }>this.jwt.decode(refreshToken);

    return +payload.sub === data.userId;
  }

  public jwtSign(payload: Payload): TokenPair {
    return {
      // TODO: Set expiresIn to 30m
      accessToken: this.jwt.sign(payload, { expiresIn: "15m" }),
      refreshToken: this.getRefreshToken(payload.userId),
    };
  }

  public async decodeTokenWithUser(token: string): Promise<GetMeResult> {
    try {
      this.jwt.verify(token);
    } catch (error) {
      throw new Error("Invalid token");
    }

    const jwtUser = this.jwt.decode(token) as Payload;

    const user = await this.user.findByEmail(jwtUser.email);

    if (!user) {
      // Should never happen
      throw new Error("User not found");
    }

    return {
      ...jwtUser,
      user,
    };
  }

  public isAccessTokenValid(token: string): boolean {
    try {
      this.jwt.verify(token);
    } catch (error) {
      return false;
    }

    return true;
  }

  private getRefreshToken(userId: number): string {
    return this.jwt.sign(
      { sub: userId },
      {
        secret: this.config.get("jwtRefreshSecret"),
        expiresIn: "7d", // Set greater than the expiresIn of the access_token
      }
    );
  }
}
