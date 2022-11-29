import { NextApiRequest, NextApiResponse } from 'next';
import Trip from '../models/Trip';
import { ITripItem } from '../Types';

export async function getAllTrips(
  req: NextApiRequest,
  res: NextApiResponse<ITripItem[]>,
) {
  const trips = await Trip.find<ITripItem>({
    $or: [
      { createdBy: req.body.uid },
      { attendees: { uid: req.body.uid, accepted: true } },
    ],
  });
  res.status(200).json(trips);
}

export async function getTrip(
  req: NextApiRequest,
  res: NextApiResponse<ITripItem | null>,
) {
  const id = req.query.id;
  const trip = await Trip.findById<ITripItem>(id);
  res.status(200).json(trip);
}

export async function addNewTrip(
  req: NextApiRequest,
  res: NextApiResponse<ITripItem | { error: unknown }>,
) {
  try {
    // if (!req.body.attendees.includes(req.body.uid)) req.body.attendees.push(req.body.uid)
    const trip = new Trip({
      title: req.body.title,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      picUrl: req.body.picUrl,
      createdBy: req.body.createdBy,
      attendees: req.body.attendees,
    });
    await trip.save();
    res.status(200).json(trip);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
