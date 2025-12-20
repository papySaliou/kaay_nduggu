import { Module } from '@nestjs/common';
import { ClientinfosService } from './clientinfos.service';
import { ClientinfosController } from './clientinfos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clientinfo } from './entities/clientinfo.entity';

@Module({
   imports: [
      TypeOrmModule.forFeature([Clientinfo]),
    ],
    controllers: [ClientinfosController],
    providers: [ClientinfosService],
    exports: [ClientinfosService],
})
export class ClientinfosModule {}
