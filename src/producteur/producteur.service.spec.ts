// import { Test, TestingModule } from '@nestjs/testing';
// import { ProducteurService } from './producteur.service';

// describe('ProducteurService', () => {
//   let service: ProducteurService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [ProducteurService],
//     }).compile();

//     service = module.get<ProducteurService>(ProducteurService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
// import { Test, TestingModule } from '@nestjs/testing';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ProducteurService } from './producteur.service';
// import { Producteur } from './entities/producteur.entity';
// import { User } from '../users/entities/user.entity';

// describe('ProducteurService', () => {
//   let service: ProducteurService;
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
//       providers: [ProducteurService],
//     }).compile();

//     service = module.get<ProducteurService>(ProducteurService);
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
import { ProducteurService } from './producteur.service';
import { Producteur } from './entities/producteur.entity';
import { User } from '../users/entities/user.entity';

describe('ProducteurService', () => {
  let service: ProducteurService;
  let producteurRepo: any;
  let userRepo: any;

  const createMockRepo = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  });

  beforeEach(async () => {
    producteurRepo = createMockRepo();
    userRepo = createMockRepo();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducteurService,
        { provide: getRepositoryToken(Producteur), useValue: producteurRepo },
        { provide: getRepositoryToken(User), useValue: userRepo },
      ],
    }).compile();

    service = module.get(ProducteurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
