import mongoose from 'mongoose';
const { Schema } = mongoose;

const objectSchema = new Schema({
  name: String,
  des: String,
  lat: String,
  long: String,
  icon: String,
  createdDate: { type: Date, default: Date.now },
  active: {type: Boolean, default: true},
});

export const MyObject = mongoose.model('Object', objectSchema);