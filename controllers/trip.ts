import { NextApiRequest, NextApiResponse } from 'next';
import Trip from '../models/Trip';
import { ITripItem } from '../Types';

export async function getAllTrips(
  req: NextApiRequest,
  res: NextApiResponse<ITripItem[]>,
) {
  const trips = await Trip.find<ITripItem>({
    attendees: req.body.uid,
  }).exec();
  res.status(200).json(trips);
}

export async function getTrip(
  req: NextApiRequest,
  res: NextApiResponse<ITripItem | null>,
) {
  const id = req.query.id;
  const trip = await Trip.findOne<ITripItem>({
    $and: [{ _id: id }, { attendees: req.body.uid }],
  }).exec();
  res.status(200).json(trip);
}

export async function addNewTrip(
  req: NextApiRequest,
  res: NextApiResponse<ITripItem | { error: unknown }>,
) {
  try {
    if (!req.body.attendees) req.body.attendees = [];
    if (!req.body.attendees.includes(req.body.uid))
      req.body.attendees.push(req.body.uid);
    const trip = new Trip({
      title: req.body.title,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      picUrl: req.body.picUrl,
      createdBy: req.body.uid,
      attendees: req.body.attendees,
    });
    await trip.save();
    res.status(200).json(trip);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

// export async function updateTrip(
//   req: NextApiRequest,
//   res: NextApiResponse<ITripItem | { error: unknown }>,
// ) {
//   try {
//     const id = req.query.id;
//     const uid = req.body.uid;
//     const filter = {
//       $and: [
//         {
//           attendees: { uid: req.body.uid, accepted: true },
//         },
//         {
//           _id: id,
//         },
//       ],
//     };
//     const trip = await Trip.findOneAndUpdate<ITripItem>(filter, req.body, {
//       new: true,
//     }).exec();
//     if (trip) res.status(201).json(trip);
//     else new Error('Trip not found');
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Missing required fields in body' });
//   }
// }
