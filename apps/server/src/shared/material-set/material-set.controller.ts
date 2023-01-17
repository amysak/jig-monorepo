import {
  Controller,
  // Get,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
} from "@nestjs/common";
// import { MaterialSetService } from "./material-set.service";
// import { CreateMaterialSetDto } from "./dto/create-material-set.dto";
// import { UpdateMaterialSetDto } from "./dto/update-material-set.dto";

@Controller("material-set")
export class MaterialSetController {
  // constructor(private readonly materialSetService: MaterialSetService) {}
  // @Post()
  // create(@Body() createMaterialSetDto: CreateMaterialSetDto) {
  //   return this.materialSetService.create(createMaterialSetDto);
  // }
  // @Get()
  // findAll() {
  //   return this.materialSetService.findAll();
  // }
  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.materialSetService.findOne(+id);
  // }
  // @Patch(":id")
  // update(
  //   @Param("id") id: string,
  //   @Body() updateMaterialSetDto: UpdateMaterialSetDto
  // ) {
  //   return this.materialSetService.update(+id, updateMaterialSetDto);
  // }
  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.materialSetService.remove(+id);
  // }
}
