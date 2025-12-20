// src/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './users/entities/user.entity';
import { Clientinfo } from './clientinfos/entities/clientinfo.entity';
import { Producteur } from './producteur/entities/producteur.entity';
import { Product } from './products/entities/product.entity';
import { Commande } from './commandes/entities/commande.entity';
import { CommandeItem } from './commande-item/entities/commande-item.entity';

dotenv.config(); // charge les variables depuis .env

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // ⚠️ seulement en dev
  logging: true,
  entities: [ User,
    Producteur,
    Clientinfo,
    Product,
    Commande,
    CommandeItem,],
  migrations: [],
  subscribers: [],
});
