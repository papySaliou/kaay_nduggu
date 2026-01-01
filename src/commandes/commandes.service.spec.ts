// import { Test, TestingModule } from '@nestjs/testing';
// import { CommandesService } from './commandes.service';

// describe('CommandesService', () => {
//   let service: CommandesService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [CommandesService],
//     }).compile();

//     service = module.get<CommandesService>(CommandesService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });

// import { Test, TestingModule } from '@nestjs/testing';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { CommandesService } from './commandes.service';
// import { Commande } from './entities/commande.entity';
// import { User } from '../users/entities/user.entity';
// import { CommandeItem } from '../commande-item/entities/commande-item.entity';
// import { Product } from '../products/entities/product.entity';
// import { Producteur } from '../producteur/entities/producteur.entity';
// import { Clientinfo } from '../clientinfos/entities/clientinfo.entity';

// describe('CommandesService', () => {
//   let service: CommandesService;
//   let module: TestingModule;

//   beforeEach(async () => {
//     module = await Test.createTestingModule({
//       imports: [
//         TypeOrmModule.forRoot({
//           type: 'sqlite',
//           database: ':memory:',
//           entities: [Commande, User, CommandeItem, Product, Producteur, Clientinfo], // Add all related entities
//           synchronize: true,
//           dropSchema: true,
//         }),
//         TypeOrmModule.forFeature([Commande, User, CommandeItem, Product, Producteur, Clientinfo]),
//       ],
//       providers: [CommandesService],
//     }).compile();

//     service = module.get<CommandesService>(CommandesService);
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
import { CommandesService } from './commandes.service';
import { Commande } from './entities/commande.entity';
import { User } from '../users/entities/user.entity';
import { CommandeItem } from '../commande-item/entities/commande-item.entity';
import { Product } from '../products/entities/product.entity';
import { Producteur } from '../producteur/entities/producteur.entity';
import { Clientinfo } from '../clientinfos/entities/clientinfo.entity';

describe('CommandesService', () => {
  let service: CommandesService;

  let commandeRepo: any;
  let userRepo: any;
  let commandeItemRepo: any;
  let productRepo: any;
  let producteurRepo: any;
  let clientinfoRepo: any;

  const createMockRepo = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  });

  beforeEach(async () => {
    commandeRepo = createMockRepo();
    userRepo = createMockRepo();
    commandeItemRepo = createMockRepo();
    productRepo = createMockRepo();
    producteurRepo = createMockRepo();
    clientinfoRepo = createMockRepo();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandesService,
        { provide: getRepositoryToken(Commande), useValue: commandeRepo },
        { provide: getRepositoryToken(User), useValue: userRepo },
        { provide: getRepositoryToken(CommandeItem), useValue: commandeItemRepo },
        { provide: getRepositoryToken(Product), useValue: productRepo },
        { provide: getRepositoryToken(Producteur), useValue: producteurRepo },
        { provide: getRepositoryToken(Clientinfo), useValue: clientinfoRepo },
      ],
    }).compile();

    service = module.get(CommandesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
