export interface Humidity {
  id: string;
  value: number; // Porcentaje 0-100
  unit: string;
  timestamp: Date;
}

export class HumidityEntity implements Humidity {
  id: string;
  value: number;
  unit: string;
  timestamp: Date;

  constructor(data: Humidity) {
    this.id = data.id;
    this.value = data.value;
    this.unit = data.unit;
    this.timestamp = data.timestamp;
  }
}
