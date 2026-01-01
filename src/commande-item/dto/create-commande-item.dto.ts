import { IsNumber, IsUUID, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommandeItemDto {
    @ApiProperty({ description: 'ID de la commande' })
    @IsUUID()
  commandeId: string;

  @ApiProperty({ description: 'ID du produit' })
    @IsUUID()
  productId: string;

  @ApiProperty({ description: 'Quantité en kg' })
    @IsNumber()
  @Min(0.1)
  quantityKg: number;
}
