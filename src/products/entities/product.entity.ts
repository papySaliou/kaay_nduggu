import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @ApiProperty({ description: 'ID unique du produit' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nom du produit' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ description: 'Prix par kg' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerKg: number;

  @ApiProperty({ description: 'Quantité en kg' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantityKg: number;

  @ApiProperty({ description: 'Date de récolte' })
  @Column({ type: 'date' })
  harvestDate: Date;

  @ApiProperty({ description: 'Disponibilité' })
  @Column({ default: true })
  available: boolean;

  @ApiProperty({ description: 'Producteur', type: () => User })
  @ManyToOne(() => User, (user) => user.products, { onDelete: 'CASCADE' })
  producer: User;

  @ApiProperty({ description: 'Date de création' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Zone de production' })
  @Column({ length: 50 })
  zone: string; // "Niayes", "Gandiol", etc.
}
