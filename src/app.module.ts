import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CommandesModule } from './commandes/commandes.module';
import { ProducteurModule } from './producteur/producteur.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientinfosModule } from './clientinfos/clientinfos.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommandeItemModule } from './commande-item/commande-item.module';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true, // Permet d'accéder aux variables partout dans l'application
    }),
    TypeOrmModule.forRoot({

      // pour utiliser mysql database avec xammp

      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      
      // pour utiliser sqlite database

      // type: 'sqlite',
      // database: process.env.DB_NAME,
     

      

      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      }),
    ProductsModule, CommandesModule, ProducteurModule, ClientinfosModule, AuthModule, UsersModule, CommandeItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
