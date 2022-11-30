import { NextApiRequest, NextApiResponse } from 'next';
import Trip from '../models/Trip';
import { ITripItem } from '../Types';

export async function getInvites(
  req: NextApiRequest,
  res: NextApiResponse<ITripItem[] | { error: unknown }>,
) {
  try {
    const trips = await Trip.find({ invites: req.body.uid }).exec();
    res.status(200).json(trips);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export async function inviteToTrip(
  req: NextApiRequest,
  res: NextApiResponse<ITripItem | { error: unknown }>,
) {
  try {
    const id = req.query.id;
    const invites = req.body.invites;
    if (typeof invites !== 'object' || invites.length <= 0)
      throw "Invites is not a list or it's empty";
    const filter = {
      $and: [{ _id: id }, { attendees: req.body.uid }],
    };
    const trip = await Trip.findOne<ITripItem>(filter).exec();
    if (trip) {
      invites.forEach(
        (invite: string) =>
          !trip.invites?.includes(invite) &&
          !trip.attendees?.includes(invite) &&
          trip.invites?.push(invite),
      );
      await Trip.findByIdAndUpdate(trip?._id, trip).exec();
      res.status(200).json(trip);
    } else
      res.status(401).json({ error: 'Cannot edit trips you are not part of' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export async function resolveInvitation(
  req: NextApiRequest,
  res: NextApiResponse<ITripItem | { error: unknown }>,
) {
  const id = req.query.id;
  const uid = req.body.uid;
  const invites = req.body.invites;
  const filter = {
    $and: [{ _id: id }, { invites: req.body.uid }],
  };
  const trip = await Trip.findOne<ITripItem>(filter).exec();
  if (trip) {
    trip.invites?.splice(trip.invites?.indexOf(uid), 1);
    if (req.body.accepted) {
      trip.attendees?.push(uid);
    }
    await Trip.findByIdAndUpdate(trip._id, trip);
    res.status(200).json(trip);
  } else
    res.status(401).json({ error: 'Cannot edit trips you are not part of' });
}
