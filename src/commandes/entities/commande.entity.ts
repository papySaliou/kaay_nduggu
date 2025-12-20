import { CommandeItem } from "src/commande-item/entities/commande-item.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Commande {
    @PrimaryGeneratedColumn('uuid')
  id: string;

 // Relation vers le client
  @ManyToOne(() => User, (user) => user.commandes, {
    onDelete: 'CASCADE',
  })
  client: User;
  

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ length: 20 })
  status: 'pending' | 'confirmed' | 'delivered';

  @Column({ type: 'date' })
  deliveryDate: Date;

//   @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
//   items: OrderItem[];

@OneToMany(() => CommandeItem, (item) => item.commande, {
  cascade: true,
  eager: true,
})
items: CommandeItem[];


  @CreateDateColumn()
  createdAt: Date;
}
