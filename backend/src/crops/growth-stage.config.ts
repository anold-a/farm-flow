import { GrowthStage } from '@prisma/client';

export interface GrowthStageDuration {
  stage: GrowthStage;
  days: number;
}

export const CROP_GROWTH_STAGES: Record<
  string,
  GrowthStageDuration[]
> = {
  maize: [
    { stage: 'PLANTED', days: 7 },
    { stage: 'GERMINATION', days: 7 },
    { stage: 'VEGETATIVE', days: 30 },
    { stage: 'FLOWERING', days: 15 },
    { stage: 'FRUITING', days: 30 },
    { stage: 'HARVEST_READY', days: 1 },
  ],

  coffee: [
    { stage: 'PLANTED', days: 30 },
    { stage: 'GERMINATION', days: 30 },
    { stage: 'VEGETATIVE', days: 180 },
    { stage: 'FLOWERING', days: 60 },
    { stage: 'FRUITING', days: 240 },
    { stage: 'HARVEST_READY', days: 1 },
  ],
};


export const DEFAULT_GROWTH_STAGES: GrowthStageDuration[] = [
  { stage: 'PLANTED', days: 7 },
  { stage: 'GERMINATION', days: 7 },
  { stage: 'VEGETATIVE', days: 30 },
  { stage: 'FLOWERING', days: 15 },
  { stage: 'FRUITING', days: 30 },
  { stage: 'HARVEST_READY', days: 1 },
];