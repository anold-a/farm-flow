import { Test, TestingModule } from '@nestjs/testing';
import { FieldUpdatesService } from './field-updates.service';

describe('FieldUpdatesService', () => {
  let service: FieldUpdatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FieldUpdatesService],
    }).compile();

    service = module.get<FieldUpdatesService>(FieldUpdatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
