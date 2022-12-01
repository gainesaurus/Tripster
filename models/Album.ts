import mongoose from '../database';
import { IPhoto } from '../Types';

const Schema = mongoose.Schema;
const PhotoSchema = new Schema<IPhoto | IPhoto[]>({

  tripId: {type: String, required: true},
  src: {type: String, required: true},
  height: {type: Number, required: true},
  width: {type: Number, required: true},

});

const Photos =
  mongoose.models.Photos || mongoose.model<IPhoto | IPhoto[]>('Lodging', PhotoSchema);
export default Photos;