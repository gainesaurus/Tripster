import mongoose from '../database';
import { IEvent } from '../Types';

const Schema = mongoose.Schema;
const EventSchema = new Schema<IEvent>({

  tripId: {type: String, required: true},
  title: {type: String, required: true},
  startTime: {type: String, required: true},
  endTime: {type: String, required: true},
  eventType: {type: String, required: true},
  info: {type: String, required: true},

});

const Events =
  mongoose.models.Events || mongoose.model<IEvent>('Events', EventSchema);
export default Events;