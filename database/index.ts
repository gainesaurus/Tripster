'use-strict';
import mongoose from 'mongoose';

const uri =
  process.env.CONNECTION_DB !== undefined
    ? process.env.CONNECTION_DB
    : 'mongodb://127.0.0.1:27017/tripsterdatabase';

mongoose.connect(uri).catch((error) => console.log(error));

export default mongoose;
