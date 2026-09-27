import {
  CROP_GROWTH_STAGES,
  DEFAULT_GROWTH_STAGES,
} from '../growth-stage.config';

export function calculateExpectedStage(cropName: string, plantingDate: Date) {
  const currentDate = Date.now();

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
