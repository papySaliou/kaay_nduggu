import { IsEnum, IsOptional, IsString, IsEmail, IsNotEmpty, ValidateNested } from 'class-validator'; // Assuming you're using class-validator for DTOs
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity'; // Adjust path to your UserRole enum/entity

// Define or import the nested DTOs
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

class ClientInfoDto {
  @ApiProperty({ description: 'Type de client', enum: ['restaurant', 'particulier'] })
  @IsEnum(['restaurant', 'particulier'])
  type: 'restaurant' | 'particulier';

  @ApiProperty({ description: 'Adresse du client' })
  @IsString()
  address: string;

  @ApiProperty({ description: 'Nom de la société', required: false })
  @IsOptional()
  @IsString()
  companyName?: string;
}

export class CreateUserDto {
  @ApiProperty({ description: 'Nom de l\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Email de l\'utilisateur' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Numéro de téléphone' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Mot de passe' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Rôle de l\'utilisateur', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ description: 'Informations du producteur', required: false, type: ProducteurInfoDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProducteurInfoDto)
  producteurInfo?: ProducteurInfoDto;

  @ApiProperty({ description: 'Informations du client', required: false, type: ClientInfoDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ClientInfoDto)
  clientInfo?: ClientInfoDto;
}