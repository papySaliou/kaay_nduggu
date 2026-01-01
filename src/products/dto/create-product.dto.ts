import {
  IsString,
  IsNumber,
  IsDateString,
  IsUUID,
  IsBoolean,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Nom du produit' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Prix par kg' })
  @IsNumber()
  @Min(0.01)
  pricePerKg: number;

  @ApiProperty({ description: 'Quantité en kg' })
  @IsNumber()
  @Min(0.01)
  quantityKg: number;

  @ApiProperty({ description: 'Date de récolte' })
  @IsDateString()
  harvestDate: string;

  @ApiProperty({ description: 'Disponibilité', required: false, default: true })
  @IsOptional()
  @IsBoolean()
  available?: boolean;

  @ApiProperty({ description: 'ID du producteur' })
  @IsUUID()
  producerId: string; // ID du User avec role='producer'

  @ApiProperty({ description: 'Zone de production' })
  @IsString()
  zone: string; // "Niayes", "Gandiol", etc.
}
