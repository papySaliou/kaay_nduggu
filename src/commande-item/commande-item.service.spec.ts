import { Test, TestingModule } from '@nestjs/testing';
import { CommandeItemService } from './commande-item.service';

describe('CommandeItemService', () => {
  let service: CommandeItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommandeItemService],
    }).compile();

    service = module.get<CommandeItemService>(CommandeItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
