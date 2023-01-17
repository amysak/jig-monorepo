import { Global, Module } from "@nestjs/common";

import * as providers from "../services";

const services = Object.values(providers);

@Global()
@Module({
  providers: services,
  exports: services,
})
export class CommonModule /* implements NestModule */ {
  // Global Middleware
  // public configure(consumer: MiddlewareConsumer): void {
  //   consumer.apply(middleware).forRoutes('*');
  // }
}
