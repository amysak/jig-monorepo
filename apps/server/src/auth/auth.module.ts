import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { AccountModule } from "shared";
import { AuthSerializer } from "./auth.serializer";
import { AuthService } from "./auth.service";
import { LocalStrategy, JwtStrategy, JwtVerifyStrategy } from "./strategies";

@Module({
  imports: [
    AccountModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get("jwtSecret"),
        signOptions: { expiresIn: "1d" },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    AuthSerializer,
    LocalStrategy,
    JwtStrategy,
    JwtVerifyStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}