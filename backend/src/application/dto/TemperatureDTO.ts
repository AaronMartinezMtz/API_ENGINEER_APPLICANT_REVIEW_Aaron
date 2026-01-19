export class CreateTemperatureDTO {
  constructor(
    public value: number,
    public unit: string = 'C'
  ) {}
}

export class UpdateTemperatureDTO {
  constructor(public value: number) {}
}

export class TemperatureResponseDTO {
  constructor(
    public id: string,
    public value: number,
    public unit: string,
    public timestamp: Date,
  ) {}
}
