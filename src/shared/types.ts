export interface City {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: number;
}

export interface NewCity extends Omit<City, 'id' | 'date'> {
  id?: number;
  date: Date;
}

export interface Country {
  country: string;
  emoji: string;
}
