import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerKg: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantityKg: number;

  @Column({ type: 'date' })
  harvestDate: Date;

  @Column({ default: true })
  available: boolean;

  @ManyToOne(() => User, (user) => user.products, { onDelete: 'CASCADE' })
  producer: User;

  @CreateDateColumn()
  createdAt: Date;


  @Column({ length: 50 })
  zone: string; // "Niayes", "Gandiol", etc.

//   @OneToMany(() => Product, (product) => product.producer)
//   products: Product[];

  // @CreateDateColumn()
  // createdAt: Date;

  //     @ManyToOne(() => Categorie, categorie => categorie.produits)
  //   categorie: Categorie;

  // @ManyToOne(() => Categorie, categorie => categorie.produits, { onDelete: "CASCADE" })
  // categorie: Categorie;

}
