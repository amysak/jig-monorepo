import { PartialType } from "@nestjs/swagger";
import { CreateToeDto } from "./create-toe.dto";

export class UpdateToeDto extends PartialType(CreateToeDto) {}
