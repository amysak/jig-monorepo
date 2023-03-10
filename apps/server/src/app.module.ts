import {
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  Module,
  OnApplicationBootstrap,
  ValidationPipe,
} from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { AuthModule } from "auth";
import { HttpExceptionFilter } from "common/filters";
import {
  ClientModule,
  EquipmentModule,
  FinishModule,
  JobModule,
  PanelModule,
  PricesModule,
  ProfileModule,
  RoomModule,
  ToeModule,
} from "models";
import { SeedingService } from "services";
import {
  CabinetModule,
  HardwareSetModule,
  MaterialModule,
  MaterialSetModule,
  UserModule,
} from "shared";

import { BaseModule } from "./base";
import { CommonModule } from "./common";
import { configuration } from "./config";

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    // Database
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          ...config.get<TypeOrmModuleOptions>("db"),
        };
      },
      inject: [ConfigService],
    }),

    // Service Modules
    AuthModule,
    CommonModule, // Global with Providers
    BaseModule, // Base

    // Main models
    UserModule,
    ClientModule,
    JobModule,
    RoomModule,

    // Cabinet model
    CabinetModule,

    // Trims, Moldings, Accessories, Hardware
    // Should be merged into cabinet module
    EquipmentModule,

    // Prices logic
    PricesModule,

    // Profiles (applied to cabinet, panels at least)
    ProfileModule,

    // Room Extensions
    PanelModule,
    ToeModule,

    // Core models
    MaterialModule,
    FinishModule,

    // Set models
    MaterialSetModule,
    HardwareSetModule,

    // Reports
    // ReportModule,
  ],
  providers: [
    // Global Guard, Authentication check on all routers
    // { provide: APP_GUARD, useClass: AuthenticatedGuard },
    // Global Pipe, Validation check
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true, // transform object to DTO class
        whitelist: true,
        forbidNonWhitelisted: false,
        forbidUnknownValues: false,
        disableErrorMessages: true,
        exceptionFactory: (errors) => {
          const message = errors.map((error) => {
            const { property, constraints, value } = error;

            if (constraints) {
              const constraint = Object.values(constraints)[0];

              return `<${property}> = ${value}: ${constraint}`;
            }

            return property;
          });

          console.error("errors => ", errors);

          return new HttpException(message, HttpStatus.BAD_REQUEST);
        },
      }),
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule implements OnApplicationBootstrap {
  // injected from CommonModule
  constructor(private readonly seedingService: SeedingService) {}

  async onApplicationBootstrap(): Promise<void> {
    const isSeedingRequired = await this.seedingService.isSeedingRequired();

    if (isSeedingRequired) {
      await this.seedingService.seed();
    }
  }
}
