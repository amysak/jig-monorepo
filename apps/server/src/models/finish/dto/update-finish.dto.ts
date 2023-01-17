import { PartialType } from "@nestjs/swagger";
import { CreateFinishDto } from "./create-finish.dto";

export class UpdateFinishDto extends PartialType(CreateFinishDto) {}
