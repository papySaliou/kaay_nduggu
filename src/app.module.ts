import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CommandesModule } from './commandes/commandes.module';
import { ProducteurModule } from './producteur/producteur.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientinfosModule } from './clientinfos/clientinfos.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommandeItemModule } from './commande-item/commande-item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Permet d'accéder aux variables partout dans l'application
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USER', 'root'),
        password: configService.get<string>('DB_PASSWORD', ''),
        database: configService.get<string>('DB_NAME', 'kaay_nduggu'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<string>('NODE_ENV') !== 'production', // Désactivé en production
        logging: configService.get<string>('NODE_ENV') === 'development',
      }),
    }),
    ProductsModule,
    CommandesModule,
    ProducteurModule,
    ClientinfosModule,
    AuthModule,
    UsersModule,
    CommandeItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
