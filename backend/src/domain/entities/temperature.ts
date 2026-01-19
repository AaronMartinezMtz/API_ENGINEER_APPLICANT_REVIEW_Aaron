export interface Temperature {
  id: string;
  value: number; // En Celsius
  unit: string;
  timestamp: Date;
}

export class TemperatureEntity implements Temperature {
  id: string;
  value: number;
  unit: string;
  timestamp: Date;

  constructor(data: Temperature) {
    this.id = data.id;
    this.value = data.value;
    this.unit = data.unit;
    this.timestamp = data.timestamp;
  }
}
