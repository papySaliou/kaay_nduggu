import { Commande } from "src/commandes/entities/commande.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CommandeItem {
  @ApiProperty({ description: 'ID unique de l\'article' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Commande associée', type: () => Commande })
  @ManyToOne(() => Commande, (commande) => commande.items, { onDelete: 'CASCADE' })
  commande: Commande;

  @ApiProperty({ description: 'Produit associé', type: () => Product })
  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @ApiProperty({ description: 'Quantité en kg' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantityKg: number;

  @ApiProperty({ description: 'Prix unitaire' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;
}
