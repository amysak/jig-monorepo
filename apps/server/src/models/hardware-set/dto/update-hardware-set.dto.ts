import { PartialType } from "@nestjs/swagger";
import { CreateHardwareSetDto } from "./create-hardware-set.dto";

export class UpdateHardwareSetDto extends PartialType(CreateHardwareSetDto) {}
