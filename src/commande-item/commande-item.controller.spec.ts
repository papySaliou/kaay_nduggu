// import { Test, TestingModule } from '@nestjs/testing';
// import { CommandeItemController } from './commande-item.controller';
// import { CommandeItemService } from './commande-item.service';

// describe('CommandeItemController', () => {
//   let controller: CommandeItemController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [CommandeItemController],
//       providers: [CommandeItemService],
//     }).compile();

//     controller = module.get<CommandeItemController>(CommandeItemController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });import { Test, TestingModule } from '@nestjs/testing';

// import { TypeOrmModule } from '@nestjs/typeorm';
// import { CommandeItemController } from './commande-item.controller';
// import { CommandeItemService } from './commande-item.service';
// import { CommandeItem } from './entities/commande-item.entity';
// import { Commande } from '../commandes/entities/commande.entity';
// import { Product } from '../products/entities/product.entity';
// import { User } from '../users/entities/user.entity';
// import { Producteur } from '../producteur/entities/producteur.entity';
// import { Test, TestingModule } from '@nestjs/testing';

// describe('CommandeItemController', () => {
//   let controller: CommandeItemController;
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
//       controllers: [CommandeItemController],
//       providers: [CommandeItemService],
//     }).compile();

//     controller = module.get<CommandeItemController>(CommandeItemController);
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
import { CommandeItemController } from './commande-item.controller';
import { CommandeItemService } from './commande-item.service';

describe('CommandeItemController', () => {
  let controller: CommandeItemController;

  const mockCommandeItemService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CommandeItemController],
      providers: [
        { provide: CommandeItemService, useValue: mockCommandeItemService },
      ],
    }).compile();

    controller = module.get(CommandeItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
