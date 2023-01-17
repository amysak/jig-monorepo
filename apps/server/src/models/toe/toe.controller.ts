import {
  Controller,
  // Get,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
} from "@nestjs/common";
// import { ToeService } from "./toe.service";
// import { CreateToeDto } from "./dto/create-toe.dto";
// import { UpdateToeDto } from "./dto/update-toe.dto";

@Controller("toe")
export class ToeController {
  // constructor(private readonly toeService: ToeService) {}
  // @Post()
  // create(@Body() createToeDto: CreateToeDto) {
  //   return this.toeService.create(createToeDto);
  // }
  // @Get()
  // findAll() {
  //   return this.toeService.findAll();
  // }
  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.toeService.findOne(+id);
  // }
  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateToeDto: UpdateToeDto) {
  //   return this.toeService.update(+id, updateToeDto);
  // }
  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.toeService.remove(+id);
  // }
}
