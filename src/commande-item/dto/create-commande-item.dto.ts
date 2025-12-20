import { IsNumber, IsUUID, Min } from "class-validator";

export class CreateCommandeItemDto {
    @IsUUID()
  commandeId: string;

  @IsUUID()
  productId: string;

  @IsNumber()
  @Min(0.1)
  quantityKg: number;
}
