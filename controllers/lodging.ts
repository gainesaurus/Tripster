import { NextApiRequest, NextApiResponse } from 'next';
import Lodging from '../models/Lodging';
import Trip from '../models/Trip';
import { ILodge } from '../Types';
import { ITripItem } from '../Types';

export async function getAllLodging(
  req: NextApiRequest,
  res: NextApiResponse<ILodge[]>,
) {
  const lodging = await Lodging.find<ILodge>({
    tripId: req.query.tripId,
  }).exec();
  res.status(200).json(lodging);
};

export async function createLodging(
  req: NextApiRequest,
  res: NextApiResponse<ILodge | { error: unknown }>,
) {
  try {
    const trip = await Trip.findOne<ITripItem>({
      $and: [{ _id: req.body.tripId }, { attendees: req.body.uid }],
    }).exec();
    console.log(trip)
    if(trip) {
        const lodge = await Lodging.create({
        tripId: req.body.tripId,
        title: req.body.title,
        address: req.body.address,
        latLng: {
          lat: req.body.latLng.lat,
          lng: req.body.latLng.lng,
        }
      });
      trip!.lodging?.push(lodge._id);
      await Trip.findByIdAndUpdate(req.body.tripId, trip).exec();
      res.status(200).json(lodge);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
