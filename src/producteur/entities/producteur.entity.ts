import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Producteur {
  @ApiProperty({ description: 'ID unique du producteur' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Zone de production' })
  @Column()
  zone: string; // Niayes, Gandiol, etc.

  @ApiProperty({ description: 'Superficie en hectares', required: false })
  @Column({ nullable: true })
  superficie: number; // en hectares

  @ApiProperty({ description: 'Type d\'exploitation', required: false })
  @Column({ nullable: true })
  typeExploitation: string; // maraîchage, serre, etc.

    @ApiProperty({ description: 'Informations utilisateur', type: () => User })
    @OneToOne(() => User, (user) => user.producteurInfo)
    @JoinColumn()
    user: User;
}
