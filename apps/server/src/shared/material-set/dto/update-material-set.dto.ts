import { PartialType } from "@nestjs/swagger";
import { CreateMaterialSetDto } from "./create-material-set.dto";

export class UpdateMaterialSetDto extends PartialType(CreateMaterialSetDto) {}
