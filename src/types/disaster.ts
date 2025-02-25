// disaster.ts
export type DisasterType = 
  | 'earthquake'
  | 'flood'
  | 'tsunami'
  | 'landslide'
  | 'extreme-weather'
  | 'fire'
  | 'drought'
  | 'typhoon'
  | 'other';

export interface Disaster {
  title:string;
  id: string;
  type: DisasterType;
  province: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  date: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  affected: {
    casualties: number;
    displaced: number;
    injured: number;
    publicFacilitiesDamaged: number;
    missing: number;
    housesDamaged: number;
    housesFlooded: number;
  };
}