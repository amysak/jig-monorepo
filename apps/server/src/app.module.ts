import {
  HttpException,
  HttpStatus,
  Module,
  OnApplicationBootstrap,
  ValidationPipe,
} from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AuthModule } from "auth";
import { HttpExceptionFilter } from "common/filters";

import {
  CabinetModule,
  ClientModule,
  JobModule,
  RoomModule,
  TermsModule,
} from "models";
import { SeedingService } from "services";
import { AccountModule } from "shared";

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
        console.log(config.get("db"));
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
    // Models Modules
    AccountModule,
    ClientModule,
    JobModule,
    RoomModule,
    CabinetModule,
    // CabinetPartModule,
    // ProfileModule,
    // PanelModule,
    // TrimMoldingModule,
    // MaterialModule,
    // FinishModule,
    // AccessoryModule,
    // VendorModule,

    // MaterialSetModule,
    // HardwareSetModule,
    TermsModule,
    // MarkupModule,
    // LaborRateModule,
    // LetterModule,
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
