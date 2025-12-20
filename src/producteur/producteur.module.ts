import { Module } from '@nestjs/common';
import { ProducteurService } from './producteur.service';
import { ProducteurController } from './producteur.controller';
import { Producteur } from './entities/producteur.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
   imports: [
      TypeOrmModule.forFeature([Producteur]),
    ],
    controllers: [ProducteurController],
    providers: [ ProducteurService],
    exports: [ProducteurService],
})
export class ProducteurModule {}
