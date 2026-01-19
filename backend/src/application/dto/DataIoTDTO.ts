export class CreateDataIoTDTO {
  temperature: {
    value: number;
    unit: string;
  };
  humidity: {
    value: number;
    unit: string;
  };

  constructor(
    temperatureValue: number,
    temperatureUnit: string,
    humidityValue: number,
    humidityUnit: string
  ) {
    this.temperature = {
      value: temperatureValue,
      unit: temperatureUnit
    };
    this.humidity = {
      value: humidityValue,
      unit: humidityUnit
    };
  }
}

export class DataIoTResponseDTO {
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

  constructor(
    id: string,
    temperature: { value: number; unit: string },
    humidity: { value: number; unit: string },
    timestamp: Date
  ) {
    this.id = id;
    this.temperature = temperature;
    this.humidity = humidity;
    this.timestamp = timestamp;
  }
}
