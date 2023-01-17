import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { FinishService } from "./finish.service";
import { CreateFinishDto } from "./dto/create-finish.dto";
import { UpdateFinishDto } from "./dto/update-finish.dto";

@Controller("finishes")
export class FinishController {
  constructor(private readonly finishService: FinishService) {}
  @Post()
  create(@Body() data: CreateFinishDto) {
    return this.finishService.create(data);
  }
  @Get()
  findAll() {
    return this.finishService.findAll();
  }
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.finishService.findOne(id);
  }
  @Patch(":id")
  update(@Param("id") id: number, @Body() data: UpdateFinishDto) {
    return this.finishService.update(id, data);
  }
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.finishService.remove(id);
  }
}
