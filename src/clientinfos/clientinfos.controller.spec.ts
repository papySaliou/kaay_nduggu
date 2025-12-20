import { Test, TestingModule } from '@nestjs/testing';
import { ClientinfosController } from './clientinfos.controller';
import { ClientinfosService } from './clientinfos.service';

describe('ClientinfosController', () => {
  let controller: ClientinfosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientinfosController],
      providers: [ClientinfosService],
    }).compile();

    controller = module.get<ClientinfosController>(ClientinfosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
