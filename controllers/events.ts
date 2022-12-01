import { NextApiRequest, NextApiResponse } from 'next';
import Events from '../models/Events';
import { IEvent } from '../Types';

export async function getAllEvents(
  req: NextApiRequest,
  res: NextApiResponse<IEvent[]>,
) {
  const events = await Events.find<IEvent>({
    attendees: req.body.uid,
  }).exec();
  res.status(200).json(events);
}

export async function addNewEvent(
  req: NextApiRequest,
  res: NextApiResponse<IEvent | { error: unknown }>,
) {
  try {
    if (!req.body.attendees) req.body.attendees = [];
    if (!req.body.attendees.includes(req.body.uid))
      req.body.attendees.push(req.body.uid);
    const event = new Events({
      tripId: req.body.tripId,
      title: req.body.title,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      eventType: req.body.eventType,
      info: req.body.info,
    });
    await event.save();
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
