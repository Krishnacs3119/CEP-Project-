export type OxygenLevel = 'High' | 'Medium' | 'Low';

export type PlantType =
  | 'Tree'
  | 'Shrub'
  | 'Climber'
  | 'Herb'
  | 'Succulent'
  | 'Fern'
  | 'Aquatic'
  | 'Perennial'
  | 'Annual'
  | 'Palm'
  | (string & {});

export interface Plant {
  id: string;
  slug: string;
  common_name: string;
  scientific_name: string;
  type: PlantType;
  category: string;
  height: string;
  lifespan: string;
  oxygen_level: OxygenLevel;
  region: string;
  description: string;
  care_instructions?: string;
  sunlight?: string;
  watering?: string;
  toxicity_info?: string;
  image_url: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface PlantContextData {
  name: string;
  scientific_name: string;
  type: string;
  region: string;
  oxygen_level: string;
  height: string;
  lifespan: string;
  description: string;
}
