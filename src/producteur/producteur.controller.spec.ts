import { Test, TestingModule } from '@nestjs/testing';
import { ProducteurController } from './producteur.controller';
import { ProducteurService } from './producteur.service';

describe('ProducteurController', () => {
  let controller: ProducteurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducteurController],
      providers: [ProducteurService],
    }).compile();

    controller = module.get<ProducteurController>(ProducteurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
