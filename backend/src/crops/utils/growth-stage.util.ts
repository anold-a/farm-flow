import { GrowthStage } from '@prisma/client';

import {
  CROP_GROWTH_STAGES,
  DEFAULT_GROWTH_STAGES,
} from '../growth-stage.config';

export function calculateExpectedStage(cropName: string, plantingDate: Date) {

  const stages =
    CROP_GROWTH_STAGES[cropName.toLowerCase()] ?? DEFAULT_GROWTH_STAGES;

  const today = new Date();

  const differenceInMilliseconds = today.getTime() - plantingDate.getTime();

  const daysSincePlanting = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24),
  );

  let accumulatedDays = 0;

  for (const stage of stages) {
    accumulatedDays += stage.days;

    if (daysSincePlanting < accumulatedDays) {
      return stage.stage;
    }
  }

  return 'HARVEST_READY';
}


export function compareGrowthStages(
  expectedStage: GrowthStage,
  actualStage: GrowthStage,
) {
  const stageOrder: GrowthStage[] = [
    'PLANTED',
    'GERMINATION',
    'VEGETATIVE',
    'FLOWERING',
    'FRUITING',
    'HARVEST_READY',
    'HARVESTED',
  ];

  const expectedIndex = stageOrder.indexOf(expectedStage);
  const actualIndex = stageOrder.indexOf(actualStage);

  if (actualIndex < expectedIndex) {
    return 'BEHIND';
  }

  if (actualIndex > expectedIndex) {
    return 'AHEAD';
  }

  return 'ON_TRACK';
}
