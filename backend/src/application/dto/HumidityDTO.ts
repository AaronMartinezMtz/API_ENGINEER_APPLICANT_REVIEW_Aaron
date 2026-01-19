export class CreateHumidityDTO {
  constructor(
    public value: number,
    public unit: string = '%'
  ) {}
}

export class UpdateHumidityDTO {
  constructor(public value: number) {}
}

export class HumidityResponseDTO {
  constructor(
    public id: string,
    public value: number,
    public unit: string,
    public timestamp: Date,
  ) {}
}
