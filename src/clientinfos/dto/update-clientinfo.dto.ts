import { PartialType } from '@nestjs/mapped-types';
import { CreateClientinfoDto } from './create-clientinfo.dto';

export class UpdateClientinfoDto extends PartialType(CreateClientinfoDto) {}
