import { Commande } from "src/commandes/entities/commande.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CommandeItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Commande, (commande) => commande.items, { onDelete: 'CASCADE' })
  commande: Commande;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantityKg: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;
}
