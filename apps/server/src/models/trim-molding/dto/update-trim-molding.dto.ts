import { PartialType } from "@nestjs/swagger";
import { CreateTrimMoldingDto } from "./create-trim-molding.dto";

export class UpdateTrimMoldingDto extends PartialType(CreateTrimMoldingDto) {}
