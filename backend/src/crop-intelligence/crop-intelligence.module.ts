import { Module } from '@nestjs/common';
import { CropIntelligenceController } from './crop-intelligence.controller';

@Module({
  controllers: [CropIntelligenceController]
})
export class CropIntelligenceModule {}
