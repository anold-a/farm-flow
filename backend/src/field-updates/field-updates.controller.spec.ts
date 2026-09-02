import { Test, TestingModule } from '@nestjs/testing';
import { FieldUpdatesController } from './field-updates.controller';

describe('FieldUpdatesController', () => {
  let controller: FieldUpdatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FieldUpdatesController],
    }).compile();

    controller = module.get<FieldUpdatesController>(FieldUpdatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
