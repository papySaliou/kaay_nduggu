import { Clientinfo } from "src/clientinfos/entities/clientinfo.entity";
import { Commande } from "src/commandes/entities/commande.entity";
import { Producteur } from "src/producteur/entities/producteur.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn,  } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from "class-transformer";

export enum UserRole {
  PRODUCER = 'producer',
  CLIENT = 'client',
}

@Entity()
export class User {
   @ApiProperty({ description: 'ID unique de l\'utilisateur' })
   @PrimaryGeneratedColumn('uuid')
id: string;

  @ApiProperty({ description: 'Nom de l\'utilisateur' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ description: 'Email de l\'utilisateur' })
  @Index()
  @Column({ length: 100, unique: true })
  email: string;

  @ApiProperty({ description: 'Numéro de téléphone', required: false })
  @Column({ length: 20, nullable: true })
  phone?: string;

  @ApiProperty({ description: 'Rôle de l\'utilisateur', enum: UserRole })
  // @Column({ type: 'enum', enum: UserRole })
  // role: UserRole;
  @Column()
role: UserRole;

  @ApiProperty({ description: 'Mot de passe hashé' })
  @Exclude()
  @Column()
  password: string; // hashé

  @ApiProperty({ description: 'Date de création' })
  @CreateDateColumn()
  createdAt: Date;

  // 🔹 Relations selon rôle

  @OneToOne(() => Producteur, (info) => info.user, { cascade: true })
@JoinColumn()
producteurInfo?: Producteur;
// { cascade: ['insert', 'update'] }

@OneToOne(() => Clientinfo, (info) => info.user, { cascade: true })
@JoinColumn()
clientInfo?: Clientinfo;

  // @OneToOne(() => Producteur, (info) => info.user, { cascade: true })
  // producteurInfo?: Producteur;

  // @OneToOne(() => Clientinfo, (info) => info.user, { cascade: true })
  // clientInfo?: Clientinfo;

  // 🔹 Relations générales
  // @OneToMany(() => Product, (product) => product.producer)
  // products?: Product[];
  @OneToMany(() => Product, (product) => product.producer, { eager: false })
products?: Product[];


  @OneToMany(() => Commande, (commande) => commande.client)
  commandes?: Commande[];
}
