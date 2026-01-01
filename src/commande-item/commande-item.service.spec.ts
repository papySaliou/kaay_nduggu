// import { Test, TestingModule } from '@nestjs/testing';
// import { CommandeItemService } from './commande-item.service';

// describe('CommandeItemService', () => {
//   let service: CommandeItemService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [CommandeItemService],
//     }).compile();

//     service = module.get<CommandeItemService>(CommandeItemService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// // });
// import { Test, TestingModule } from '@nestjs/testing';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { CommandeItemService } from './commande-item.service';
// import { CommandeItem } from './entities/commande-item.entity';
// import { Commande } from '../commandes/entities/commande.entity';
// import { Product } from '../products/entities/product.entity';
// import { User } from '../users/entities/user.entity';
// import { Producteur } from '../producteur/entities/producteur.entity';

// describe('CommandeItemService', () => {
//   let service: CommandeItemService;
//   let module: TestingModule;

//   beforeEach(async () => {
//     module = await Test.createTestingModule({
//       imports: [
//         TypeOrmModule.forRoot({
//           type: 'sqlite',
//           database: ':memory:',
//           entities: [CommandeItem, Commande, Product, User, Producteur], // Add all related entities
//           synchronize: true,
//           dropSchema: true,
//         }),
//         TypeOrmModule.forFeature([CommandeItem, Commande, Product, User, Producteur]),
//       ],
//       providers: [CommandeItemService],
//     }).compile();

//     service = module.get<CommandeItemService>(CommandeItemService);
//   });

//   afterEach(async () => {
//     if (module) {
//       await module.close();
//     }
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CommandeItemService } from './commande-item.service';
import { CommandeItem } from './entities/commande-item.entity';
import { Commande } from '../commandes/entities/commande.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { Producteur } from '../producteur/entities/producteur.entity';

describe('CommandeItemService', () => {
  let service: CommandeItemService;

  let commandeItemRepo: any;
  let commandeRepo: any;
  let productRepo: any;
  let userRepo: any;
  let producteurRepo: any;

  const createMockRepo = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  });

  beforeEach(async () => {
    commandeItemRepo = createMockRepo();
    commandeRepo = createMockRepo();
    productRepo = createMockRepo();
    userRepo = createMockRepo();
    producteurRepo = createMockRepo();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandeItemService,
        { provide: getRepositoryToken(CommandeItem), useValue: commandeItemRepo },
        { provide: getRepositoryToken(Commande), useValue: commandeRepo },
        { provide: getRepositoryToken(Product), useValue: productRepo },
        { provide: getRepositoryToken(User), useValue: userRepo },
        { provide: getRepositoryToken(Producteur), useValue: producteurRepo },
      ],
    }).compile();

    service = module.get(CommandeItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
