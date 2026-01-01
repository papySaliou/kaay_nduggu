import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export type ClientType = 'restaurant' | 'hotel' | 'traiteur' | 'particulier';

@Entity()
export class Clientinfo {
  @ApiProperty({ description: 'ID unique des informations client' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Type de client', enum: ['restaurant', 'hotel', 'traiteur', 'particulier'] })
  @Column({
    type: 'enum',
    enum: ['restaurant', 'hotel', 'traiteur', 'particulier'],
  })
  clientType: ClientType;

  @ApiProperty({ description: 'Adresse', required: false })
  @Column({ nullable: true })
  adresse: string;

  @ApiProperty({ description: 'Informations utilisateur', type: () => User })
  @OneToOne(() => User, (user) => user.clientInfo)
  @JoinColumn()
  user: User;
}
