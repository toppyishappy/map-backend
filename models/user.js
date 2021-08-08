import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    username: { type: String, unique: true },
    password: { type: String },
    token: { type: String, default: null },
  });

export const User = mongoose.model('user', userSchema);