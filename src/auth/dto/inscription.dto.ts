import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum UserRole {
  PRODUCER = 'producer',
  CLIENT = 'client',
}

/* ---------- Producteur ---------- */
class ProducteurInfoDto {
  @IsString()
  zone: string;

  @IsString()
  farmName: string;

  @IsOptional()
  surfaceHa?: number;
}

/* ---------- Client ---------- */
class ClientInfoDto {
  @IsEnum(['restaurant', 'particulier'])
  type: 'restaurant' | 'particulier';

  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  companyName?: string;
}

/* ---------- Inscription ---------- */
export class InscriptionDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProducteurInfoDto)
  producteurInfo?: ProducteurInfoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ClientInfoDto)
  clientInfo?: ClientInfoDto;
}
