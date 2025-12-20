import { Test, TestingModule } from '@nestjs/testing';
import { CommandeItemController } from './commande-item.controller';
import { CommandeItemService } from './commande-item.service';

describe('CommandeItemController', () => {
  let controller: CommandeItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommandeItemController],
      providers: [CommandeItemService],
    }).compile();

    controller = module.get<CommandeItemController>(CommandeItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
