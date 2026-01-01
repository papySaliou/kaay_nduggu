// import { Test, TestingModule } from '@nestjs/testing';
// import { ClientinfosController } from './clientinfos.controller';
// import { ClientinfosService } from './clientinfos.service';

// describe('ClientinfosController', () => {
//   let controller: ClientinfosController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [ClientinfosController],
//       providers: [ClientinfosService],
//     }).compile();

//     controller = module.get<ClientinfosController>(ClientinfosController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });

// import { Test, TestingModule } from '@nestjs/testing';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ClientinfosController } from './clientinfos.controller';
// import { ClientinfosService } from './clientinfos.service';
// import { Clientinfo } from './entities/clientinfo.entity';
// import { User } from 'src/users/entities/user.entity';

// describe('ClientinfosController', () => {
//   let controller: ClientinfosController;
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
//         TypeOrmModule.forFeature([Clientinfo, User]),
//       ],
//       controllers: [ClientinfosController],
//       providers: [ClientinfosService],
//     }).compile();

//     controller = module.get<ClientinfosController>(ClientinfosController);
//   });

//   afterEach(async () => {
//     await module.close();
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });

import { Test } from '@nestjs/testing';
import { ClientinfosController } from './clientinfos.controller';
import { ClientinfosService } from './clientinfos.service';

describe('ClientinfosController', () => {
  let controller: ClientinfosController;

  const mockClientinfosService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ClientinfosController],
      providers: [
        { provide: ClientinfosService, useValue: mockClientinfosService },
      ],
    }).compile();

    controller = module.get(ClientinfosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
