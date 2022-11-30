import mongoose from '../database';
import { ITripItem } from '../Types';

const Schema = mongoose.Schema;
const tripSchema = new Schema<ITripItem>({
  title: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  picUrl: { type: String, required: true },
  createdBy: { type: String, required: true }, // userUid
  attendees: [String], // userUid
  events: [String], // eventId
  albums: [String], // AlbumId
  polls: [String], // PollId
  locations: [String], // LocationsId
  lodging: [String], // LodgingId
  invites: [String], // userUid
});

const Trip =
  mongoose.models.Trip || mongoose.model<ITripItem>('Trip', tripSchema);
export default Trip;
