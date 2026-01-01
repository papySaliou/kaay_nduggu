import { CommandeItem } from "src/commande-item/entities/commande-item.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Commande {
  @ApiProperty({ description: 'ID unique de la commande' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Relation vers le client
  @ApiProperty({ description: 'Informations du client', type: () => User })
  @ManyToOne(() => User, (user) => user.commandes, {
    onDelete: 'CASCADE',
  })
  client: User;

  @ApiProperty({ description: 'Montant total de la commande' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @ApiProperty({ description: 'Statut de la commande', enum: ['pending', 'confirmed', 'delivered'] })
  @Column({ length: 20 })
  status: 'pending' | 'confirmed' | 'delivered';

  @ApiProperty({ description: 'Date de livraison' })
  @Column({ type: 'date' })
  deliveryDate: Date;

  @ApiProperty({ description: 'Articles de la commande', type: () => [CommandeItem] })
  @OneToMany(() => CommandeItem, (item) => item.commande, {
    cascade: true,
    eager: true,
  })
  items: CommandeItem[];

  @ApiProperty({ description: 'Date de création' })
  @CreateDateColumn()
  createdAt: Date;
}
