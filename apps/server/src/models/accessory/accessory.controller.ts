import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AccessoryService } from "./accessory.service";
import { CreateAccessoryDto } from "./dto/create-accessory.dto";
import { UpdateAccessoryDto } from "./dto/update-accessory.dto";

@Controller("accessories")
export class AccessoryController {
  constructor(private readonly accessoryService: AccessoryService) {}

  @Post()
  create(@Body() createAccessoryDto: CreateAccessoryDto) {
    return this.accessoryService.create(createAccessoryDto);
  }

  @Get()
  findAll() {
    return this.accessoryService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.accessoryService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() updateAccessoryDto: UpdateAccessoryDto
  ) {
    return this.accessoryService.update(id, updateAccessoryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.accessoryService.remove(id);
  }
}
