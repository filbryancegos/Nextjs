import mongoose from 'mongoose';

let isConnected = false; // Track the connection

export async function connectToDB() {
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect('mongodb+srv://dbBrutos:dbQwer1234@egoscluster.1xvk3.mongodb.net/?retryWrites=true&w=majority&dbname=next', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}
