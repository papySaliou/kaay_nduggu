// import { Test, TestingModule } from '@nestjs/testing';
// import { ProductsService } from './products.service';

import { getRepositoryToken } from "@nestjs/typeorm";
import { ProductsService } from "./products.service";
import { Test, TestingModule } from "@nestjs/testing";
import { Product } from "./entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Producteur } from "src/producteur/entities/producteur.entity";
import { Clientinfo } from "src/clientinfos/entities/clientinfo.entity";

// describe('ProductsService', () => {
//   let service: ProductsService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [ProductsService],
//     }).compile();

//     service = module.get<ProductsService>(ProductsService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });

// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { ProductsService } from './products.service';
// import { Product } from './entities/product.entity';
// import { User } from '../users/entities/user.entity';
// import { Producteur } from '../producteur/entities/producteur.entity';
// import { Clientinfo } from 'src/clientinfos/entities/clientinfo.entity';





// describe('ProductsService', () => {
//   let service: ProductsService;
//   let module: TestingModule;

//   beforeEach(async () => {
//     module = await Test.createTestingModule({
//       imports: [
//         TypeOrmModule.forRoot({
//           type: 'sqlite',
//           database: ':memory:',
//           entities: [Product, User, Producteur], // Add related entities
//           synchronize: true,
//           dropSchema: true,
//         }),
//         TypeOrmModule.forFeature([Product, User, Producteur]),
//       ],
//       providers: [ProductsService],
//     }).compile();

//     service = module.get<ProductsService>(ProductsService);
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
// describe('ProductsService', () => {
//   let service: ProductsService;

//   // const mockRepo = {
//   //   find: jest.fn(),
//   //   findOne: jest.fn(),
//   //   create: jest.fn(),
//   //   save: jest.fn(),
//   //   remove: jest.fn(),
//   // };
// const createMockRepo = () => ({
//   find: jest.fn(),
//   findOne: jest.fn(),
//   create: jest.fn(),
//   save: jest.fn(),
//   remove: jest.fn(),
// });

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         ProductsService,
//         { provide: getRepositoryToken(Product), useValue: mockRepo },
//         { provide: getRepositoryToken(User), useValue: mockRepo },
//         { provide: getRepositoryToken(Producteur), useValue: mockRepo },
//         { provide: getRepositoryToken(Clientinfo), useValue: mockRepo },
//       ],
//     }).compile();

//     service = module.get<ProductsService>(ProductsService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });


describe('ProductsService', () => {
  let service: ProductsService;

  let productRepo: any;
  let userRepo: any;
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
    productRepo = createMockRepo();
    userRepo = createMockRepo();
    producteurRepo = createMockRepo();
    clientinfoRepo = createMockRepo();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: getRepositoryToken(Product), useValue: productRepo },
        { provide: getRepositoryToken(User), useValue: userRepo },
        { provide: getRepositoryToken(Producteur), useValue: producteurRepo },
        { provide: getRepositoryToken(Clientinfo), useValue: clientinfoRepo },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
