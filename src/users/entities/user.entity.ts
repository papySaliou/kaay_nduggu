import { Clientinfo } from "src/clientinfos/entities/clientinfo.entity";
import { Commande } from "src/commandes/entities/commande.entity";
import { Producteur } from "src/producteur/entities/producteur.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn,  } from "typeorm";


export type UserRole = 'producer' | 'client';

@Entity()
export class User {
   @PrimaryGeneratedColumn('uuid')
id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ type: 'enum', enum: ['producer', 'client'] })
  role: UserRole;

  @Column()
  password: string; // hashé

  @CreateDateColumn()
  createdAt: Date;

  // 🔹 Relations selon rôle
  @OneToOne(() => Producteur, (info) => info.user, { cascade: true })
  producteurInfo?: Producteur;

  @OneToOne(() => Clientinfo, (info) => info.user, { cascade: true })
  clientInfo?: Clientinfo;

  // 🔹 Relations générales
  @OneToMany(() => Product, (product) => product.producer)
  products?: Product[];

  @OneToMany(() => Commande, (commande) => commande.client)
  commandes?: Commande[];
}
