// import { Test, TestingModule } from '@nestjs/testing';
// import { ClientinfosService } from './clientinfos.service';

// describe('ClientinfosService', () => {
//   let service: ClientinfosService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [ClientinfosService],
//     }).compile();

//     service = module.get<ClientinfosService>(ClientinfosService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });


// import { Test, TestingModule } from '@nestjs/testing';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ClientinfosService } from './clientinfos.service';
// import { Clientinfo } from './entities/clientinfo.entity';
// import { User } from 'src/users/entities/user.entity';

// describe('ClientinfosService', () => {
//   let service: ClientinfosService;
//   let module: TestingModule;

//   beforeEach(async () => {
//     module = await Test.createTestingModule({
//       imports: [
//         TypeOrmModule.forRoot({
//           type: 'sqlite',
//           database: ':memory:',
//           entities: [Clientinfo, User],
//           synchronize: true,
//           dropSchema: true,
//         }),
//         TypeOrmModule.forFeature([Clientinfo]),
//       ],
//       providers: [ClientinfosService],
//     }).compile();

//     service = module.get<ClientinfosService>(ClientinfosService);
//   });

//  afterEach(async () => {
//     if (module) { // Check if module is defined
//       await module.close();
//     }
//   });


//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClientinfosService } from './clientinfos.service';
import { Clientinfo } from './entities/clientinfo.entity';
import { User } from 'src/users/entities/user.entity';

describe('ClientinfosService', () => {
  let service: ClientinfosService;
  let clientinfoRepo: any;
  let userRepo: any;

  const createMockRepo = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  });

  beforeEach(async () => {
    clientinfoRepo = createMockRepo();
    userRepo = createMockRepo();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientinfosService,
        { provide: getRepositoryToken(Clientinfo), useValue: clientinfoRepo },
        { provide: getRepositoryToken(User), useValue: userRepo },
      ],
    }).compile();

    service = module.get(ClientinfosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
