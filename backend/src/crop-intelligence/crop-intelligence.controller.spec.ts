import { Test, TestingModule } from '@nestjs/testing';
import { CropIntelligenceController } from './crop-intelligence.controller';

describe('CropIntelligenceController', () => {
  let controller: CropIntelligenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropIntelligenceController],
    }).compile();

    controller = module.get<CropIntelligenceController>(CropIntelligenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
