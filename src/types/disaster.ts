export type DisasterType = 
  | 'earthquake'
  | 'flood'
  | 'tsunami'
  | 'landslide'
  | 'volcano'
  | 'fire'
  | 'drought'
  | 'cyclone'
  | 'epidemic'
  | 'other';

export interface Disaster {
  id: string;
  type: DisasterType;
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
  };
}