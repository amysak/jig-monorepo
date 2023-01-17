import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateTermsDto, UpdateTermsDto } from "./dto";
import { TermsService } from "./terms.service";

@Controller("terms")
export class TermsController {
  constructor(private readonly termsService: TermsService) {}

  @Post()
  create(@Body() createTermDto: CreateTermsDto) {
    return this.termsService.create(createTermDto);
  }

  @Get()
  findAll() {
    return this.termsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.termsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() data: UpdateTermsDto) {
    return this.termsService.update(+id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.termsService.remove(+id);
  }
}
