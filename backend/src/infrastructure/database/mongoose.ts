import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI ;

export async function connectDatabase() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log('✅ Conectado a MongoDB exitosamente');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  }
}

export async function disconnectDatabase() {
  try {
    await mongoose.disconnect();
    console.log('✅ Desconectado de MongoDB');
  } catch (error) {
    console.error('❌ Error desconectando de MongoDB:', error);
  }
}

export default mongoose;
