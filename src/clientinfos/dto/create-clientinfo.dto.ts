import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type { ClientType } from '../entities/clientinfo.entity';


export class CreateClientinfoDto {

  @ApiProperty({ description: 'Type de client', enum: ['restaurant', 'hotel', 'traiteur', 'particulier'] })
  @IsEnum(['restaurant', 'hotel', 'traiteur', 'particulier'])
  clientType: ClientType;

  @ApiProperty({ description: 'Adresse', required: false })
  @IsString()
  @IsOptional()
  adresse?: string;
}
