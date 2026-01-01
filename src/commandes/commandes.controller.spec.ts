// import { Test, TestingModule } from '@nestjs/testing';
// import { CommandesController } from './commandes.controller';
// import { CommandesService } from './commandes.service';

// describe('CommandesController', () => {
//   let controller: CommandesController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [CommandesController],
//       providers: [CommandesService],
//     }).compile();

//     controller = module.get<CommandesController>(CommandesController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// // });
// import { Test, TestingModule } from '@nestjs/testing';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { CommandesController } from './commandes.controller';
// import { CommandesService } from './commandes.service';
// import { Commande } from './entities/commande.entity';
// import { User } from '../users/entities/user.entity';
// import { CommandeItem } from '../commande-item/entities/commande-item.entity';
// import { Product } from '../products/entities/product.entity';
// import { Producteur } from '../producteur/entities/producteur.entity';
// import { Clientinfo } from '../clientinfos/entities/clientinfo.entity';

// describe('CommandesController', () => {
//   let controller: CommandesController;
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
//       controllers: [CommandesController],
//       providers: [CommandesService],
//     }).compile();

//     controller = module.get<CommandesController>(CommandesController);
//   });

//   afterEach(async () => {
//     if (module) {
//       await module.close();
//     }
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });

import { Test } from '@nestjs/testing';
import { CommandesController } from './commandes.controller';
import { CommandesService } from './commandes.service';

describe('CommandesController', () => {
  let controller: CommandesController;

  const mockCommandesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    updateStatus: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CommandesController],
      providers: [
        { provide: CommandesService, useValue: mockCommandesService },
      ],
    }).compile();

    controller = module.get(CommandesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
