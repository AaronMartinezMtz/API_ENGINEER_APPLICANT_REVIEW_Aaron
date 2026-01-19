import mongoose, { Schema, Document } from 'mongoose';

export interface IDataIoTDocument extends Document {
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

const dataIoTSchema = new Schema<IDataIoTDocument>(
  {
    temperature: {
      value: {
        type: Number,
        required: true
      },
      unit: {
        type: String,
        required: true,
        default: 'C'
      }
    },
    humidity: {
      value: {
        type: Number,
        required: true
      },
      unit: {
        type: String,
        required: true,
        default: '%'
      }
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

export const DataIoTModel = mongoose.model<IDataIoTDocument>('DataIoT', dataIoTSchema);
