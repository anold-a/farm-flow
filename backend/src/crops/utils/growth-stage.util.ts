import {GrowthStage} from '@prisma/client';

export function calculateExpectedStage(plantingDate: Date): GrowthStage {
  
  const currentDate = Date.now();


  const difference = currentDate - Number(plantingDate);

  const days = difference /(1000 * 60 * 60 * 24) ;

  if (days < 0) {
    throw new Error('Invalid Days');
  } else if (days >= 0 && days < 7) {
    return GrowthStage.PLANTED;
  } else if (days >= 7 && days < 21) {
    return GrowthStage.GERMINATION;
  } else if (days >= 21 && days < 45) {
    return GrowthStage.VEGETATIVE;
  } else if (days >= 45 && days < 70) {
    return GrowthStage.FLOWERING;
  } else if (days >= 70 && days < 100) {
    return GrowthStage.FRUITING;
  } else if (days >= 100) {
    return GrowthStage.HARVEST_READY;
  } else {
    return GrowthStage.PLANTED;
  }

  
}