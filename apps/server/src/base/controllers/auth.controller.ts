import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";

import { GetMeResult, Payload, TokenPair } from "type-defs";
import { AuthService } from "auth/auth.service";
import { JwtAuthGuard, JwtVerifyGuard, LocalAuthGuard } from "auth/guards";
import { ReqUser } from "common/decorators";
import type { Request } from "express";
import type { AuthStatusDto } from "../dto/auth-status.dto";

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async getMe(@Req() req: Request): Promise<GetMeResult> {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new BadRequestException("No token supplied.");
    }

    try {
      return this.auth.decodeTokenWithUser(token);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  public jwtLogin(@ReqUser() user: Payload): TokenPair {
    return this.auth.jwtSign(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("check")
  public jwtCheck(@Req() req: Request): AuthStatusDto {
    if (!req.headers.authorization) {
      throw new UnauthorizedException("No Authorization header present.");
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw new UnauthorizedException("Token is of incorrect format.");
    }

    const isValid = this.auth.isAccessTokenValid(token);

    return { ok: isValid };
  }

  // Only verify is performed without checking the expiration of the access_token.
  @UseGuards(JwtVerifyGuard)
  @Post("refresh")
  public jwtRefresh(
    @ReqUser() user: Payload,
    @Body("refreshToken") token?: string
  ): TokenPair {
    if (!token || !this.auth.validateRefreshToken(user, token)) {
      throw new UnauthorizedException(
        "Invalid refresh token. Please login again."
      );
    }

    return this.auth.jwtSign(user);
  }
}
