import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";

import type { Account } from "database/entities";
import { AccountService } from "shared";
import type { GetMeResult, Payload, TokenPair } from "type-defs";

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private account: AccountService,
    private config: ConfigService
  ) {}

  public async validateAccount(
    email: string,
    password: string
  ): Promise<Account | null> {
    const account = await this.account.findByEmail(email);

    if (!account || !account.password) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, account.password);

    if (!isPasswordValid) {
      return null;
    }

    return account;
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

    console.log("payload1111111111111 => ", payload);
    console.log("data => ", data);

    return +payload.sub === data.accountId;
  }

  public jwtSign(payload: Payload): TokenPair {
    console.log("payload => ", payload);
    return {
      accessToken: this.jwt.sign(payload, { expiresIn: "30m" }),
      refreshToken: this.getRefreshToken(payload.accountId),
    };
  }

  public async decodeTokenWithAccount(token: string): Promise<GetMeResult> {
    try {
      this.jwt.verify(token);
    } catch (error) {
      throw new Error("Invalid token");
    }

    const jwtUser = this.jwt.decode(token) as Payload;

    const account = await this.account.findByEmail(jwtUser.email);

    if (!account) {
      // Should never happen
      throw new Error("Account not found");
    }

    return {
      ...jwtUser,
      account,
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

  private getRefreshToken(accountId: number): string {
    return this.jwt.sign(
      { sub: accountId },
      {
        secret: this.config.get("jwtRefreshSecret"),
        expiresIn: "7d", // Set greater than the expiresIn of the access_token
      }
    );
  }
}
