import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  PRODUCER = 'producer',
  CLIENT = 'client',
}

/* ---------- Producteur ---------- */
class ProducteurInfoDto {
  @ApiProperty({ description: 'Zone de production' })
  @IsString()
  zone: string;

  @ApiProperty({ description: 'Nom de la ferme' })
  @IsString()
  farmName: string;

  @ApiProperty({ description: 'Superficie en hectares', required: false })
  @IsOptional()
  surfaceHa?: number;
}

/* ---------- Client ---------- */
class ClientInfoDto {
  @ApiProperty({ description: 'Type de client', enum: ['restaurant', 'particulier'] })
  @IsEnum(['restaurant', 'particulier'])
  type: 'restaurant' | 'particulier';

  @ApiProperty({ description: 'Adresse' })
  @IsString()
  address: string;

  @ApiProperty({ description: 'Nom de la société', required: false })
  @IsOptional()
  @IsString()
  companyName?: string;
}

/* ---------- Inscription ---------- */
export class InscriptionDto {
  @ApiProperty({ description: 'Nom de l\'utilisateur' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Numéro de téléphone' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Mot de passe (minimum 6 caractères)' })
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Rôle', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ description: 'Informations producteur', required: false, type: ProducteurInfoDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProducteurInfoDto)
  producteurInfo?: ProducteurInfoDto;

  @ApiProperty({ description: 'Informations client', required: false, type: ClientInfoDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ClientInfoDto)
  clientInfo?: ClientInfoDto;
}
