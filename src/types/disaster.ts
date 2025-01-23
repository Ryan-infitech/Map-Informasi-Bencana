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