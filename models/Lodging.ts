import mongoose from '../database';
import { ILodge } from '../Types';

const Schema = mongoose.Schema;
const LodgingSchema = new Schema<ILodge>({

  tripId: {type: String, required: true},
  title: {type: String, required: true},
  address: {type: String, required: true},
  picUrl: {type: String, required: true},
  latLng: {type: String, required: true},

});

const Lodging =
  mongoose.models.Lodging || mongoose.model<ILodge>('Lodging', LodgingSchema);
export default Lodging;