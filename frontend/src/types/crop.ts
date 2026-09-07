
export type GrowthStage = 
  | 'PLANTED' 
  | 'GERMINATION' 
  | 'VEGETATIVE' 
  | 'FLOWERING' 
  | 'FRUITING' 
  | 'HARVEST_READY' 
  | 'HARVESTED';



export interface Crop {
  name:string;
  variety:string;
  plantingDate:Date;
  expectedHarvestDate:Date;
  growthStage:GrowthStage;
  fieldId:string;
  createdAt:string;
  updatedAt:string;
}


export interface CreateCropDto {
  name: string;
  variety: string;
  plantingDate:Date;
  expectedHarvestDate:Date;
  growthStage:GrowthStage;
  
}