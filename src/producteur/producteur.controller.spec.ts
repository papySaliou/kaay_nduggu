// import { Test, TestingModule } from '@nestjs/testing';
// import { ProducteurController } from './producteur.controller';
// import { ProducteurService } from './producteur.service';

// describe('ProducteurController', () => {
//   let controller: ProducteurController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [ProducteurController],
//       providers: [ProducteurService],
//     }).compile();

//     controller = module.get<ProducteurController>(ProducteurController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });
// import { Test, TestingModule } from '@nestjs/testing';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ProducteurController } from './producteur.controller';
// import { ProducteurService } from './producteur.service';
// import { Producteur } from './entities/producteur.entity';
// import { User } from '../users/entities/user.entity';

// describe('ProducteurController', () => {
//   let controller: ProducteurController;
//   let module: TestingModule;

//   beforeEach(async () => {
//     module = await Test.createTestingModule({
//       imports: [
//         TypeOrmModule.forRoot({
//           type: 'sqlite',
//           database: ':memory:',
//           entities: [Producteur, User], // Add related entities
//           synchronize: true,
//           dropSchema: true,
//         }),
//         TypeOrmModule.forFeature([Producteur, User]),
//       ],
//       controllers: [ProducteurController],
//       providers: [ProducteurService],
//     }).compile();

//     controller = module.get<ProducteurController>(ProducteurController);
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
import { ProducteurController } from './producteur.controller';
import { ProducteurService } from './producteur.service';

describe('ProducteurController', () => {
  let controller: ProducteurController;

  const mockProducteurService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ProducteurController],
      providers: [
        { provide: ProducteurService, useValue: mockProducteurService },
      ],
    }).compile();

    controller = module.get(ProducteurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
