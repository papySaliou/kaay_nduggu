import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Producteur {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  zone: string; // Niayes, Gandiol, etc.

  @Column({ nullable: true })
  superficie: number; // en hectares

  @Column({ nullable: true })
  typeExploitation: string; // maraîchage, serre, etc.

    @OneToOne(() => User, (user) => user.producteurInfo)
    @JoinColumn()
    user: User;
}
