
import { NextApiRequest, NextApiResponse } from 'next';
import Location from '../models/Locations';
import Trip from '../models/Trip'
import User from '../models/User';
import { ILocation, ITripItem, IUser } from '../Types';

export async function getAllLocations(
  req: NextApiRequest,
  res: NextApiResponse<ILocation[]>,
) {
  const locations = await Location.find<ILocation>({
    tripId: req.query.tripId,
  }).exec();
  console.log(locations);
  res.status(200).json(locations);
};

export async function createLocation(
  req: NextApiRequest,
  res: NextApiResponse<ILocation | { error: unknown }>,
){
  try {
    const trip = await Trip.findOne<ITripItem>({
      $and: [{ _id: req.body.tripId }, { attendees: req.body.uid }],
    }).exec();
    console.log(trip)
    if(trip) {
        const location = await Location.create({
        tripId: req.body.tripId,
        info: req.body.info,
        latLng: {
          lat: req.body.latLng.lat,
          lng: req.body.latLng.lng,
        },
        uid: req.body.uid,
      });
      trip!.locations?.push(location._id);
      await Trip.findByIdAndUpdate(req.body.tripId, trip).exec();
      res.status(200).json(location);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}