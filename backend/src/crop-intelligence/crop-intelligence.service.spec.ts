import { Test, TestingModule } from '@nestjs/testing';
import { CropIntelligenceService } from './crop-intelligence.service';

describe('CropIntelligenceService', () => {
  let service: CropIntelligenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CropIntelligenceService],
    }).compile();

    service = module.get<CropIntelligenceService>(CropIntelligenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
