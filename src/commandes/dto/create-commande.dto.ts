import {
  IsNumber,
  IsDateString,
  IsUUID,
  IsEnum,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommandeDto {
  @ApiProperty({ description: 'ID du client (utilisateur avec rôle client)' })
  @IsUUID()
  clientId: string; // ID du User avec role='client'

  @ApiProperty({ description: 'Montant total de la commande' })
  @IsNumber()
  @Min(0)
  totalAmount: number;

  @ApiProperty({ description: 'Statut de la commande', enum: ['pending', 'confirmed', 'delivered'] })
  @IsEnum(['pending', 'confirmed', 'delivered'])
  status: 'pending' | 'confirmed' | 'delivered';

  @ApiProperty({ description: 'Date de livraison' })
  @IsDateString()
  deliveryDate: string;
}
