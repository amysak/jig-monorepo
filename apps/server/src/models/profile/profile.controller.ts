import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "auth/guards";
import { ReqUser } from "common/decorators";
import { Payload } from "type-defs";
import { GetProfilesDto, UpdateProfileDto } from "./dto";
import { ProfileService } from "./profile.service";
// import { CreateProfileDto } from "./dto/create-profile.dto";
// import { UpdateProfileDto } from "./dto/update-profile.dto";

// TODO: DTO
@UseGuards(JwtAuthGuard)
@Controller("profiles")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() createProfileDto: any) {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  getUserProfiles(@ReqUser() user: Payload, @Query() query: GetProfilesDto) {
    return this.profileService.findByUserId(user.userId, query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() data: UpdateProfileDto) {
    return this.profileService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.profileService.remove(+id);
  }
}
