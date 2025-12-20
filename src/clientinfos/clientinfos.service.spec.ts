import { Test, TestingModule } from '@nestjs/testing';
import { ClientinfosService } from './clientinfos.service';

describe('ClientinfosService', () => {
  let service: ClientinfosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientinfosService],
    }).compile();

    service = module.get<ClientinfosService>(ClientinfosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
