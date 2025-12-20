import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export type ClientType = 'restaurant' | 'hotel' | 'traiteur' | 'particulier';

@Entity()
export class Clientinfo {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ['restaurant', 'hotel', 'traiteur', 'particulier'],
  })
  clientType: ClientType;

  @Column({ nullable: true })
  adresse: string;

  @OneToOne(() => User, (user) => user.clientInfo)
  @JoinColumn()
  user: User;
}
