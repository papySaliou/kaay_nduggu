import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Producteur } from 'src/producteur/entities/producteur.entity';
import { Clientinfo } from 'src/clientinfos/entities/clientinfo.entity';

@Module({
  imports: [
        TypeOrmModule.forFeature([User,
      Producteur,
      Clientinfo,]),
      ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
