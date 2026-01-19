export interface DataIoT {
  id: string;
  temperature: {
    value: number;
    unit: string;
  };
  humidity: {
    value: number;
    unit: string;
  };
  timestamp: Date;
}

export class DataIoTEntity implements DataIoT {
  id: string;
  temperature: {
    value: number;
    unit: string;
  };
  humidity: {
    value: number;
    unit: string;
  };
  timestamp: Date;

  constructor(data: DataIoT) {
    this.id = data.id;
    this.temperature = data.temperature;
    this.humidity = data.humidity;
    this.timestamp = data.timestamp;
  }
}
