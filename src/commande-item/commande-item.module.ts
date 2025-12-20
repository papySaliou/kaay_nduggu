import { Module } from '@nestjs/common';
import { CommandeItemService } from './commande-item.service';
import { CommandeItemController } from './commande-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandeItem } from './entities/commande-item.entity';
import { Commande } from 'src/commandes/entities/commande.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
   imports: [
    TypeOrmModule.forFeature([CommandeItem, Commande, Product]),
  ],
  controllers: [CommandeItemController],
  providers: [CommandeItemService],
})
export class CommandeItemModule {}
