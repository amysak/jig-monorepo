import { PartialType } from "@nestjs/swagger";
import { CreateFillerDto } from "./create-filler.dto";

export class UpdateFillerDto extends PartialType(CreateFillerDto) {}
