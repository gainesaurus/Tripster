import mongoose from '../database';
import { ILocation } from '../Types';

const Schema = mongoose.Schema;
const LocationSchema = new Schema<ILocation>({

  tripId: {type: String, required: true},
  info: {type: String, required: true},
  latLng: {
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
  },
  uid: {type: String},

});

const Location =
  mongoose.models.Location || mongoose.model<ILocation>('Location', LocationSchema);
export default Location;