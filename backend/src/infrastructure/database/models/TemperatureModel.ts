import mongoose, { Schema, Document } from 'mongoose';

export interface ITemperatureDocument extends Document {
  value: number;
  unit: string;
  timestamp: Date;
}

const temperatureSchema = new Schema<ITemperatureDocument>(
  {
    
    value: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true,
      default: 'C'
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

export const TemperatureModel = mongoose.model<ITemperatureDocument>(
  'Temperature',
  temperatureSchema
);
