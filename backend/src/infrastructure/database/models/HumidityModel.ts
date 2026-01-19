import mongoose, { Schema, Document } from 'mongoose';

export interface IHumidityDocument extends Document {
  value: number;
  unit: string;
  timestamp: Date;
}

const humiditySchema = new Schema<IHumidityDocument>(
  {
    
    value: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true,
      default: '%'
    },
    timestamp: {
      type: Date,
      required: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

export const HumidityModel = mongoose.model<IHumidityDocument>(
  'Humidity',
  humiditySchema
);
