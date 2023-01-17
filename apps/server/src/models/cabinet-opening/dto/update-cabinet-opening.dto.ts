import { PartialType } from "@nestjs/swagger";
import { CreateCabinetOpeningDto } from "./create-cabinet-opening.dto";

export class UpdateCabinetOpeningDto extends PartialType(
  CreateCabinetOpeningDto
) {}
