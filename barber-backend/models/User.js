import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthDate: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  whatsapp: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'barber', 'client'], default: 'client' },
  photoUrl: { type: String },
  gender: { type: String, enum: ['masculino', 'feminino', 'outro'], required: true }
});

export default mongoose.model('User', userSchema);
